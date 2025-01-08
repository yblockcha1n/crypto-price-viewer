import axios from 'axios';
import { ExchangePrices } from '../types/types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchPrices = async (): Promise<ExchangePrices> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/prices`);
    return response.data;
  } catch (error) {
    console.error('Error fetching prices:', error);
    throw error;
  }
};