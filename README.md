# Web3 Voting DApp

<div align="center">
  <img src="https://img.shields.io/badge/Blockchain-0G%20Newton-blue" alt="0G Newton">
  <img src="https://img.shields.io/badge/React-18.x-61dafb" alt="React">
  <img src="https://img.shields.io/badge/Smart%20Contract-Solidity-363636" alt="Solidity">
  <img src="https://img.shields.io/badge/License-MIT-green" alt="License">
</div>

<p align="center">
  <img src="https://i.imgur.com/YourLogoHere.png" alt="Web3 Voting DApp Logo" width="300">
</p>

## 📝 About

**Web3 Voting DApp** adalah aplikasi voting terdesentralisasi yang dibangun di atas blockchain 0G-Newton-Testnet. Aplikasi ini memungkinkan pengguna untuk berpartisipasi dalam voting secara transparan dan aman menggunakan teknologi blockchain.

### ✨ Key Features

<table>
  <tr>
    <td>
      <h3>🔒 Keamanan</h3>
      <p>Setiap vote tercatat secara permanen di blockchain, menjamin transparansi dan keamanan data voting.</p>
    </td>
    <td>
      <h3>👁️ Transparansi</h3>
      <p>Hasil voting dapat diverifikasi oleh siapa saja melalui blockchain explorer.</p>
    </td>
  </tr>
  <tr>
    <td>
      <h3>👛 Web3 Wallet</h3>
      <p>Mendukung berbagai web3 wallet seperti MetaMask dan OKX untuk kemudahan akses.</p>
    </td>
    <td>
      <h3>📜 Smart Contract</h3>
      <p>Dibangun dengan smart contract yang telah diaudit untuk menjamin keamanan transaksi.</p>
    </td>
  </tr>
</table>

## 🚀 Getting Started

### Prerequisites

- Node.js (v16+)
- npm atau yarn
- MetaMask atau OKX Wallet
- Akses ke 0G-Newton-Testnet 

### Installation

1. Clone repository
   ```bash
   git clone https://github.com/sinugrepo/web3-voting-dapp.git
   cd web3-voting-dapp
   ```

2. Install dependencies
   ```bash
   npm install
   # atau
   yarn install
   ```

3. Run development server
   ```bash
   npm start
   # atau
   yarn start
   ```

4. Buka browser dan akses `http://localhost:3000`

## 📱 Usage

<div align="center">
  <img src="https://i.imgur.com/YourScreenshotHere.png" alt="App Screenshot" width="600">
</div>

### Connecting Your Wallet

1. Click "Connect MetaMask" atau "Connect OKX Wallet" button
2. Approve connection request in wallet
3. Ensure you're connected to 0G-Newton-Testnet

### Voting

1. Browse available candidates
2. Click "Vote" button next to your preferred candidate
3. Confirm the transaction in your wallet
4. Wait for transaction confirmation
5. View updated results

## 🔧 Technical Details

| Component | Details |
|-----------|---------|
| Network | 0G-Newton-Testnet |
| Smart Contract | 0x9e858F018b818CFbf62B255aa546fFF0141CB918 |
| Chain ID | 16600 |
| Token | A0GI |

## 🔍 Smart Contract

```solidity
// Example snippet
function vote(uint256 candidateIndex) public {
    // Voting logic implementation
    // ...
}

function getCandidates() public view returns (tuple(string name, uint256 voteCount)[]) {
    // Return candidates data
    // ...
}
```

## 🗺️ Roadmap

- [x] Basic voting functionality
- [x] Multiple wallet support
- [x] Mobile-responsive design optimization
- [ ] Multiple voting categories
- [ ] Advanced analytics dashboard

## 👨‍💻 Contact Developer

<table>
  <tr>
    <th>Developer</th>
    <td>Rizki Nugroho</td>
  </tr>
  <tr>
    <th>Wallet Address</th>
    <td><code>0xfa3ae2ad13f97d253452d9cbcb353dc8d0891e2d</code></td>
  </tr>
  <tr>
    <th>Discord</th>
    <td>@sinugsss</td>
  </tr>
  <tr>
    <th>Github</th>
    <td><a href="https://github.com/sinugrepo">sinugrepo</a></td>
  </tr>
  <tr>
    <th>Twitter</th>
    <td><a href="https://twitter.com/rizki_nugr">@rizki_nugr</a></td>
  </tr>
</table>

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <sub>Built with ❤️ by <a href="https://github.com/sinugrepo">Rizki Nugroho</a></sub>
</div>