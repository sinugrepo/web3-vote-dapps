import React from 'react';
import { Code2, Vote, Shield, Wallet } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-blue-600 mb-6">About Web3 Voting DApp</h1>
            
            <div className="prose max-w-none">
              <p className="text-gray-600 mb-8">
                Web3 Voting DApp adalah aplikasi voting terdesentralisasi yang dibangun di atas blockchain
                0G-Newton-Testnet. Aplikasi ini memungkinkan pengguna untuk berpartisipasi dalam voting
                secara transparan dan aman menggunakan teknologi blockchain.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <Shield className="w-6 h-6 text-blue-600 mr-3" />
                    <h3 className="text-xl font-semibold text-gray-800">Keamanan</h3>
                  </div>
                  <p className="text-gray-600">
                    Setiap vote tercatat secara permanen di blockchain, menjamin
                    transparansi dan keamanan data voting.
                  </p>
                </div>

                <div className="bg-blue-50 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <Vote className="w-6 h-6 text-blue-600 mr-3" />
                    <h3 className="text-xl font-semibold text-gray-800">Transparansi</h3>
                  </div>
                  <p className="text-gray-600">
                    Hasil voting dapat diverifikasi oleh siapa saja melalui
                    blockchain explorer.
                  </p>
                </div>

                <div className="bg-blue-50 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <Wallet className="w-6 h-6 text-blue-600 mr-3" />
                    <h3 className="text-xl font-semibold text-gray-800">Web3 Wallet</h3>
                  </div>
                  <p className="text-gray-600">
                    Mendukung berbagai web3 wallet seperti MetaMask dan OKX
                    untuk kemudahan akses.
                  </p>
                </div>

                <div className="bg-blue-50 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <Code2 className="w-6 h-6 text-blue-600 mr-3" />
                    <h3 className="text-xl font-semibold text-gray-800">Smart Contract</h3>
                  </div>
                  <p className="text-gray-600">
                    Dibangun dengan smart contract yang telah diaudit untuk
                    menjamin keamanan transaksi.
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Technical Details</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Network: 0G-Newton-Testnet</li>
                  <li>• Smart Contract: {CONTRACT_ADDRESS}</li>
                  <li>• Chain ID: 16600</li>
                  <li>• Token: A0GI</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CONTRACT_ADDRESS = "0x9e858F018b818CFbf62B255aa546fFF0141CB918";

export default About;