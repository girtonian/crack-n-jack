/**
 * Test script for RAA-BP application
 * 
 * This script tests the backend API endpoints to ensure they're working correctly.
 * Run this script with Node.js after starting the backend server.
 */

const axios = require('axios');

const API_URL = 'http://localhost:3001';

// Test sample projects endpoint
async function testSampleProjects() {
  try {
    console.log('Testing /projects endpoint...');
    const response = await axios.get(`${API_URL}/projects`);
    console.log('Sample projects:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error testing sample projects:', error.message);
    return [];
  }
}

// Test project evaluation endpoint
async function testProjectEvaluation(projectName, contractAddress) {
  try {
    console.log(`Testing /evaluate/${projectName} endpoint...`);
    const response = await axios.get(`${API_URL}/evaluate/${projectName}`, {
      params: { contractAddress }
    });
    console.log('Evaluation result:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error testing project evaluation:', error.message);
    return null;
  }
}

// Run all tests
async function runTests() {
  console.log('Starting RAA-BP API tests...');
  
  // Test health endpoint
  try {
    const healthResponse = await axios.get(`${API_URL}/health`);
    console.log('Health check:', healthResponse.data);
  } catch (error) {
    console.error('Health check failed:', error.message);
    console.log('Make sure the backend server is running on port 3001');
    return;
  }
  
  // Test sample projects
  const projects = await testSampleProjects();
  
  if (projects.length > 0) {
    // Test project evaluation for each sample project
    for (const project of projects) {
      await testProjectEvaluation(
        project.name, 
        '0x123456789012345678901234567890123456789a' // Dummy contract address
      );
    }
  }
  
  console.log('All tests completed!');
}

// Run the tests
runTests(); 