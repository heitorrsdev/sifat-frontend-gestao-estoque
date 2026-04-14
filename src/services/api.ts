import axios from 'axios';

const API_URL = 'https://my-json-server.typicode.com/Sifat-devs/db-desafio-frontend';
const isProduction = import.meta.env.PROD;

export const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (!isProduction) {
      console.error('API Error:', error);
    }

    if (axios.isAxiosError(error)) {
      return Promise.reject(error);
    }

    return Promise.reject(
      error instanceof Error ? error : new Error(String(error))
    );
  }
);
