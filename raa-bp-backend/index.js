const express = require('express');
const { ethers } = require('ethers');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Hardcoded project data for POC
const projectData = {
  "SampleProject1": { 
    teamCredibility: 8, 
    tokenomics: 7,
    description: "A decentralized exchange on Mantle"
  },
  "SampleProject2": { 
    teamCredibility: 4, 
    tokenomics: 3,
    description: "NFT marketplace with questionable tokenomics"
  },
  "SampleProject3": { 
    teamCredibility: 6, 
    tokenomics: 6,
    description: "DeFi lending protocol with solid fundamentals"
  }
};

// Connect to Mantle via provider
// For POC, we'll use Mantle testnet
// In production, you would use Alchemy or another provider with your API key
const provider = new ethers.providers.JsonRpcProvider("https://rpc.testnet.mantle.xyz");

// Check if contract is deployed on Mantle
const checkCodeQuality = async (contractAddress) => {
  try {
    if (!ethers.utils.isAddress(contractAddress)) {
      return 3; // Invalid address
    }
    
    const code = await provider.getCode(contractAddress);
    // If code exists (not 0x), the contract is deployed
    return code !== "0x" ? 8 : 4;
  } catch (error) {
    console.error("Error checking code quality:", error);
    return 3; // Default low score on error
  }
};

// Get team credibility score (hardcoded for POC)
const getTeamCredibility = (projectName) => {
  return projectData[projectName]?.teamCredibility || 5;
};

// Get tokenomics score (hardcoded for POC)
const getTokenomics = (projectName) => {
  return projectData[projectName]?.tokenomics || 5;
};

// Calculate final score and rating
const calculateScore = (codeQuality, teamCredibility, tokenomics) => {
  // Convert scores to percentages (assuming scores are 1-10)
  const codeQualityPercent = (codeQuality / 10) * 100;
  const teamCredibilityPercent = (teamCredibility / 10) * 100;
  const tokenomicsPercent = (tokenomics / 10) * 100;
  
  // Apply weights
  const weightedScore = (
    (0.40 * codeQualityPercent) + 
    (0.30 * teamCredibilityPercent) + 
    (0.30 * tokenomicsPercent)
  );
  
  // Determine rating
  let rating;
  if (weightedScore >= 80) {
    rating = "Cracked n' Jacked";
  } else if (weightedScore < 50) {
    rating = "Smacked";
  } else {
    rating = "Mid";
  }
  
  return {
    score: weightedScore.toFixed(2),
    rating
  };
};

// API endpoint to evaluate a project
app.get('/evaluate/:projectName', async (req, res) => {
  try {
    const { projectName } = req.params;
    const contractAddress = req.query.contractAddress;
    
    if (!projectName) {
      return res.status(400).json({ error: "Project name is required" });
    }
    
    // Get scores
    const codeQuality = await checkCodeQuality(contractAddress);
    const teamCredibility = getTeamCredibility(projectName);
    const tokenomics = getTokenomics(projectName);
    
    // Calculate final score and rating
    const result = calculateScore(codeQuality, teamCredibility, tokenomics);
    
    // Return response
    res.json({
      projectName,
      description: projectData[projectName]?.description || "No description available",
      rating: result.rating,
      score: result.score,
      metrics: {
        codeQuality,
        teamCredibility,
        tokenomics
      }
    });
  } catch (error) {
    console.error("Error evaluating project:", error);
    res.status(500).json({ error: "Failed to evaluate project" });
  }
});

// Get all sample projects
app.get('/projects', (req, res) => {
  const projects = Object.keys(projectData).map(name => ({
    name,
    description: projectData[name].description
  }));
  
  res.json(projects);
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 