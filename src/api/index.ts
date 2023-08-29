import axios from 'axios';
import * as https from 'https';

const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
  timeout: 10 * 1000,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Content-Security-Policy': 'upgrade-insecure-requests'
  },
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  })
});

export default api;
