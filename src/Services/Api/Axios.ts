import axios from 'axios';

export default axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
});

export const axiosPrivate = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});