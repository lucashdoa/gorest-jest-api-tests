require('dotenv').config();
const axios = require('axios');

const BASE_URL = 'https://gorest.co.in/public/v2';
const API_TOKEN = process.env.GOREST_API_TOKEN;

// Check if the API token is set
if (!API_TOKEN || API_TOKEN === 'your_token_here') {
  console.error('ERROR: GOREST_API_TOKEN is not set in .env file');
  console.error('Please visit https://gorest.co.in/ to get your token');
  process.exit(1);
}

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Authorization': `Bearer ${API_TOKEN}`,
    'Content-Type': 'application/json'
  }
});

module.exports = {
  apiClient,
  BASE_URL,
  API_TOKEN
};
