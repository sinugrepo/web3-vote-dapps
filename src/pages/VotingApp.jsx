import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

// Smart contract details and RPC URL
const CONTRACT_ADDRESS = "0x9e858F018b818CFbf62B255aa546fFF0141CB918";
const RPC_URL = "https://smart-fragrant-needle.0g-newton.quiknode.pro/178f4c927816ac89d9e121e377442cce51a22533";
const CHAIN_ID = "0x40d8"; // 16600 in hex for 0G-Newton-Testnet
const CONTRACT_ABI = [
  "function vote(uint256 candidateIndex) public",
  "function getCandidates() public view returns (tuple(string name, uint256 voteCount)[])"
];

function VotingApp() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [txHash, setTxHash] = useState("");
  const [walletType, setWalletType] = useState("");
  const [isTransactionPending, setIsTransactionPending] = useState(false);
  const [isTransactionConfirmed, setIsTransactionConfirmed] = useState(false);
  const [showConfirmationAnimation, setShowConfirmationAnimation] = useState(false);

  // Initialize read-only provider for fetching data before wallet connection
  useEffect(() => {
    const initializeProvider = async () => {
      try {
        const readProvider = new ethers.JsonRpcProvider(RPC_URL);
        const readContract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, readProvider);
        
        // Try to fetch candidates with the read-only provider
        fetchCandidates(readContract);
      } catch (err) {
        console.error("Failed to initialize read provider:", err);
      }
    };
    
    initializeProvider();
  }, []);

  // Disconnect wallet
  const disconnectWallet = () => {
    setAccount("");
    setContract(null);
    setWalletType("");
    setTxHash("");
    setError("");
  };

  // Connect to wallet (MetaMask or OKX)
  const connectWallet = async (walletProvider) => {
    try {
      setError("");
      setIsLoading(true);
      
      let walletInterface;
      let providerInstance;
      
      if (walletProvider === 'metamask') {
        if (!window.ethereum) throw new Error("MetaMask tidak terdeteksi. Silakan install MetaMask");
        walletInterface = window.ethereum;
        setWalletType("MetaMask");
      } else if (walletProvider === 'okx') {
        if (!window.okxwallet) throw new Error("OKX Wallet tidak terdeteksi. Silakan install OKX Wallet");
        walletInterface = window.okxwallet;
        setWalletType("OKX");
      } else {
        throw new Error("Wallet tidak didukung");
      }
      
      // Request the wallet to switch to our network
      try {
        await walletInterface.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: CHAIN_ID }]
        });
      } catch (switchError) {
        // If the chain hasn't been added to the user's wallet yet
        if (switchError.code === 4902) {
          try {
            await walletInterface.request({
              method: 'wallet_addEthereumChain',
              params: [{
                chainId: CHAIN_ID,
                chainName: '0G-Newton-Testnet',
                nativeCurrency: {
                  name: 'A0GI',
                  symbol: 'A0GI',
                  decimals: 18
                },
                rpcUrls: [RPC_URL],
                blockExplorerUrls: ['https://chainscan-newton.0g.ai/']
              }]
            });
          } catch (addError) {
            throw new Error(`Gagal menambahkan jaringan: ${addError.message}`);
          }
        } else {
          console.log("Network switch error:", switchError);
        }
      }

      // Connect to provider after ensuring correct network
      providerInstance = new ethers.BrowserProvider(walletInterface);

      // Request account access
      const accounts = await providerInstance.send("eth_requestAccounts", []);
      const account = accounts[0];
      setAccount(account);
      
      // Get signer and create contract instance
      const signerInstance = await providerInstance.getSigner();
      const contractInstance = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signerInstance);
      
      setContract(contractInstance);
      
      // Fetch candidates after connecting
      fetchCandidates(contractInstance);
    } catch (err) {
      console.error("Connection error:", err);
      setError(`Gagal terhubung ke wallet: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch candidates from the smart contract
  const fetchCandidates = async (contractInstance) => {
    try {
      setIsLoading(true);
      const candidatesData = await contractInstance.getCandidates();
      setCandidates(candidatesData);
    } catch (err) {
      console.error("Error fetching candidates:", err);
      setError(`Gagal mengambil data kandidat: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Close the transaction modal after animation completes
  const closeTransactionModal = () => {
    setIsTransactionPending(false);
    setIsTransactionConfirmed(false);
    setShowConfirmationAnimation(false);
  };

  // Vote for a candidate
  const voteForCandidate = async (candidateIndex) => {
    if (!contract) return;
    
    try {
      setIsLoading(true);
      setIsTransactionPending(true);
      setIsTransactionConfirmed(false);
      setShowConfirmationAnimation(false);
      setTxHash("");
      setError("");
      
      // Base gas settings from your script
      const baseGasPrice = ethers.parseUnits("1", "gwei");
      const gasLimit = 600000;
      
      const tx = await contract.vote(candidateIndex, {
        gasPrice: baseGasPrice,
        gasLimit: gasLimit
      });
      
      setTxHash(tx.hash);
      
      // Wait for transaction to be mined
      await tx.wait();
      
      // Show confirmation animation when transaction is confirmed
      setIsTransactionConfirmed(true);
      setShowConfirmationAnimation(true);
      
      // Auto-close modal after showing the animation for a few seconds
      setTimeout(() => {
        closeTransactionModal();
      }, 3000);
      
      // Refresh candidate list
      await fetchCandidates(contract);
    } catch (err) {
      console.error("Voting error:", err);
      setError(`Gagal melakukan voting: ${err.message}`);
      setIsTransactionPending(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Check if account changed in wallet
  useEffect(() => {
    const checkAccountChange = async () => {
      if (window.ethereum) {
        window.ethereum.on('accountsChanged', (accounts) => {
          if (accounts.length > 0) {
            setAccount(accounts[0]);
          } else {
            disconnectWallet();
          }
        });
      }
      
      if (window.okxwallet) {
        window.okxwallet.on('accountsChanged', (accounts) => {
          if (accounts.length > 0) {
            setAccount(accounts[0]);
          } else {
            disconnectWallet();
          }
        });
      }
    };

    checkAccountChange();
    
    // Cleanup
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', () => {});
      }
      if (window.okxwallet) {
        window.okxwallet.removeListener('accountsChanged', () => {});
      }
    };
  }, []);

  // Format address for display
  const formatAddress = (address) => {
    if (!address) return "";
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <>
      {/* Transaction Pending/Confirmed Modal */}
      {isTransactionPending && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="flex flex-col items-center">
              {showConfirmationAnimation ? (
                <div className="flex flex-col items-center animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                    <svg className="w-10 h-10 text-green-500 animate-checkmark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Transaction Confirmed!</h3>
                  <p className="text-gray-600 text-center">
                    Your vote has been successfully recorded on the blockchain.
                  </p>
                </div>
              ) : (
                <>
                  <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mb-4"></div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Transaction Pending</h3>
                  <p className="text-gray-600 text-center">
                    Please wait while your transaction is being confirmed on the blockchain...
                  </p>
                </>
              )}
              {txHash && (
                <a
                  href={`https://chainscan-newton.0g.ai/tx/${txHash}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:text-blue-800 mt-4 text-sm font-medium"
                >
                  View on Explorer →
                </a>
              )}
              {showConfirmationAnimation && (
                <button
                  onClick={closeTransactionModal}
                  className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Close
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 py-8">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-6 border-b border-gray-200">
          <h1 className="text-3xl font-bold text-blue-600">Web3 Voting DApp</h1>
          
          {account ? (
            <div className="mt-4 md:mt-0 flex items-center gap-4">
              <div className="bg-blue-50 px-4 py-2 rounded-lg">
                <span className="font-semibold text-blue-600 mr-2">{walletType} Connected:</span>
                <span className="font-mono text-gray-700">{formatAddress(account)}</span>
              </div>
              <button
                onClick={disconnectWallet}
                className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Disconnect
              </button>
            </div>
          ) : (
            <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
              <button 
                onClick={() => connectWallet('metamask')} 
                className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Connect MetaMask
              </button>
              <button 
                onClick={() => connectWallet('okx')} 
                className="bg-gray-900 hover:bg-gray-800 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Connect OKX Wallet
              </button>
            </div>
          )}
        </header>

        <main>
          {isLoading && !isTransactionPending && (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
            </div>
          )}
          
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-md">
              <p className="text-red-700">{error}</p>
            </div>
          )}
          
          {txHash && !isTransactionPending && (
            <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded-md">
              <p className="text-green-700">
                Transaction confirmed! View on{' '}
                <a 
                  href={`https://chainscan-newton.0g.ai/tx/${txHash}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="font-medium hover:underline"
                >
                  Explorer
                </a>
              </p>
            </div>
          )}

          {candidates.length > 0 ? (
            <div className="mt-8">
              <h2 className="text-2xl font-semibold text-blue-600 mb-6">Candidate</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {candidates.map((candidate, index) => (
                  <div 
                    key={index} 
                    className="bg-white rounded-lg shadow-md p-6 transition-transform hover:-translate-y-1"
                  >
                    <h3 className="text-xl font-medium text-gray-800">{candidate.name}</h3>
                    <p className="text-lg font-semibold text-blue-600 my-3">
                      Votes: {Number(candidate.voteCount)}
                    </p>
                    <button 
                      onClick={() => voteForCandidate(index)} 
                      disabled={!account || isLoading || isTransactionPending}
                      className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
                        !account || isLoading || isTransactionPending
                        ? 'bg-gray-300 cursor-not-allowed text-gray-500' 
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    {isTransactionPending ? 'Voting...' : 'Vote'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : account ? (
          <div className="text-center py-12 bg-blue-50 rounded-lg">
            <p className="text-lg text-gray-600">Tidak ada kandidat yang tersedia</p>
          </div>
        ) : (
          <div className="text-center py-12 bg-blue-50 rounded-lg">
            <p className="text-lg text-gray-600">Connect your wallet to see candidates and vote</p>
          </div>
        )}
      </main>

      <footer className="mt-12 pt-6 border-t border-gray-200 text-center">
        <p className="text-sm text-gray-500">Smart Contract: {CONTRACT_ADDRESS}</p>
        <p className="text-sm text-gray-500 mt-1">Network: 0G-Newton-Testnet (Chain ID: {parseInt(CHAIN_ID, 16)})</p>
      </footer>
    </div>

    {/* Add these CSS animations to your global CSS or in a style tag */}
    <style jsx>{`
      @keyframes fade-in {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      
      @keyframes checkmark {
        0% {
          stroke-dashoffset: 100;
        }
        100% {
          stroke-dashoffset: 0;
        }
      }
      
      .animate-fade-in {
        animation: fade-in 0.5s ease-in-out;
      }
      
      .animate-checkmark {
        stroke-dasharray: 100;
        stroke-dashoffset: 100;
        animation: checkmark 0.8s ease-in-out forwards;
      }
    `}</style>
  </>
);
}

export default VotingApp;