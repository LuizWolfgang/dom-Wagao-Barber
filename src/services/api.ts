import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://api-dom-wagao-barber-production.up.railway.app'
});