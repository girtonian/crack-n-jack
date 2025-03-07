# RAA-BP: Rating AI Agent for Blockchain Projects

A Proof of Concept (POC) application for evaluating blockchain projects and assigning ratings based on simplified metrics. This project was built for a hackathon to demonstrate the concept of an AI-powered rating system for blockchain projects.

## 🚀 Features

- **Project Evaluation**: Rate blockchain projects based on key metrics (code quality, team credibility, tokenomics)
- **Rating System**: Projects are rated as "Cracked n' Jacked" (score >80%), "Mid" (score 50-80%), or "Smacked" (score <50%)
- **Blockchain Integration**: Connects to Mantle testnet to verify smart contract deployment
- **User-Friendly Interface**: Simple web app for inputting project details and viewing ratings

## 📋 Tech Stack

- **Frontend**: React.js, Bootstrap, Axios
- **Backend**: Node.js, Express.js
- **Blockchain**: Ethers.js (for Mantle integration)
- **Evaluation Logic**: JavaScript rule-based scoring system

## 🛠️ Project Structure

```
raa-bp/
├── raa-bp-backend/         # Backend Node.js application
│   ├── index.js            # Express server and evaluation logic
│   ├── package.json        # Backend dependencies
│   └── .env                # Environment variables
│
└── raa-bp-frontend/        # Frontend React application
    ├── public/             # Static files
    ├── src/                # React source code
    │   ├── App.js          # Main application component
    │   ├── App.css         # Custom styling
    │   └── ...             # Other React files
    ├── package.json        # Frontend dependencies
    └── .env                # Environment variables
```

## 🏁 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/raa-bp.git
   cd raa-bp
   ```

2. Install backend dependencies:
   ```
   cd raa-bp-backend
   npm install
   ```

3. Install frontend dependencies:
   ```
   cd ../raa-bp-frontend
   npm install
   ```

### Running the Application

1. Start the backend server:
   ```
   cd raa-bp-backend
   npm start
   ```

2. In a new terminal, start the frontend development server:
   ```
   cd raa-bp-frontend
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000`

## 📊 Evaluation Metrics

The RAA-BP uses a simplified rule-based scoring system with the following metrics:

- **Code Quality (40%)**: Checks if the project has a deployed smart contract on Mantle
- **Team Credibility (30%)**: Score based on publicly available team information
- **Tokenomics (30%)**: Score based on token distribution fairness

The final score is calculated as:
```
Score = (0.40 * Code_Quality) + (0.30 * Team_Credibility) + (0.30 * Tokenomics)
```

## 🔮 Future Enhancements

With more time and resources, the RAA-BP could be enhanced with:

1. **Advanced AI Model**: Replace the rule-based system with a trained ML model
2. **Multi-Chain Support**: Integrate with additional blockchains beyond Mantle
3. **Decentralized Storage**: Store ratings and project data on IPFS or similar
4. **Smart Contract Integration**: Create a smart contract for transparent rating verification
5. **User Authentication**: Allow users to create accounts and save favorite projects

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- Mantle Network for blockchain integration
- The hackathon organizers and judges
- All open-source libraries used in this project