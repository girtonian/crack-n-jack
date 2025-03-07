import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [projectName, setProjectName] = useState('');
  const [contractAddress, setContractAddress] = useState('');
  const [rating, setRating] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sampleProjects, setSampleProjects] = useState([]);
  const [selectedSample, setSelectedSample] = useState('');

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

  // Fetch sample projects on component mount
  useEffect(() => {
    fetchSampleProjects();
  }, []);

  // Fetch sample projects from the backend
  const fetchSampleProjects = async () => {
    try {
      const response = await axios.get(`${API_URL}/projects`);
      setSampleProjects(response.data);
    } catch (err) {
      console.error('Error fetching sample projects:', err);
      setError('Failed to fetch sample projects. Server might be down.');
    }
  };

  // Handle sample project selection
  const handleSampleSelect = (e) => {
    const selected = e.target.value;
    setSelectedSample(selected);
    if (selected) {
      setProjectName(selected);
      // For demo purposes, set a dummy contract address
      setContractAddress('0x123456789012345678901234567890123456789a');
    }
  };

  // Handle project evaluation
  const handleEvaluate = async () => {
    if (!projectName) {
      setError('Project name is required');
      return;
    }

    setLoading(true);
    setError('');
    setRating(null);

    try {
      const response = await axios.get(`${API_URL}/evaluate/${projectName}`, {
        params: { contractAddress }
      });
      setRating(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error evaluating project:', err);
      setError('Failed to evaluate project. Please try again.');
      setLoading(false);
    }
  };

  // Get badge color based on rating
  const getBadgeColor = (ratingText) => {
    if (ratingText === "Cracked n' Jacked") return "success";
    if (ratingText === "Smacked") return "danger";
    return "warning";
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="card shadow">
            <div className="card-header bg-dark text-white">
              <h1 className="text-center mb-0">RAA-BP: Blockchain Project Rating</h1>
              <p className="text-center mb-0">Rating AI Agent for Blockchain Projects</p>
            </div>
            <div className="card-body">
              <div className="mb-4">
                <h4>Select a Sample Project</h4>
                <select 
                  className="form-select mb-3" 
                  value={selectedSample} 
                  onChange={handleSampleSelect}
                >
                  <option value="">-- Select a sample project --</option>
                  {sampleProjects.map((project) => (
                    <option key={project.name} value={project.name}>
                      {project.name} - {project.description}
                    </option>
                  ))}
                </select>
                <p className="text-muted">Or enter your own project details below:</p>
              </div>

              <div className="mb-3">
                <label htmlFor="projectName" className="form-label">Project Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="projectName"
                  placeholder="Enter project name"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                />
              </div>
              
              <div className="mb-3">
                <label htmlFor="contractAddress" className="form-label">Contract Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="contractAddress"
                  placeholder="Enter contract address (e.g., 0x123...)"
                  value={contractAddress}
                  onChange={(e) => setContractAddress(e.target.value)}
                />
                <div className="form-text">Enter a valid Mantle contract address to check deployment status.</div>
              </div>
              
              {error && <div className="alert alert-danger">{error}</div>}
              
              <button 
                className="btn btn-primary w-100" 
                onClick={handleEvaluate}
                disabled={loading}
              >
                {loading ? 'Evaluating...' : 'Evaluate Project'}
              </button>
              
              {rating && (
                <div className="mt-4">
                  <div className="card">
                    <div className="card-header">
                      <h3>Rating Results</h3>
                    </div>
                    <div className="card-body">
                      <h4>{rating.projectName}</h4>
                      <p className="text-muted">{rating.description}</p>
                      
                      <div className="mb-3">
                        <h5>
                          Rating: <span className={`badge bg-${getBadgeColor(rating.rating)}`}>{rating.rating}</span>
                        </h5>
                        <h6>Overall Score: {rating.score}%</h6>
                      </div>
                      
                      <h5>Metrics Breakdown:</h5>
                      <div className="row">
                        <div className="col-md-4">
                          <div className="card mb-2">
                            <div className="card-body text-center">
                              <h6>Code Quality</h6>
                              <div className="display-4">{rating.metrics.codeQuality}</div>
                              <div className="text-muted">Weight: 40%</div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="card mb-2">
                            <div className="card-body text-center">
                              <h6>Team Credibility</h6>
                              <div className="display-4">{rating.metrics.teamCredibility}</div>
                              <div className="text-muted">Weight: 30%</div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="card mb-2">
                            <div className="card-body text-center">
                              <h6>Tokenomics</h6>
                              <div className="display-4">{rating.metrics.tokenomics}</div>
                              <div className="text-muted">Weight: 30%</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="card-footer text-center text-muted">
              <p>Hackathon POC - Rating AI Agent for Blockchain Projects</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
