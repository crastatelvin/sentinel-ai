import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const uploadLog = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await axios.post(`${BASE_URL}/upload`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
};

export const getThreats = async () => {
  const response = await axios.get(`${BASE_URL}/threats`);
  return response.data;
};

export const getSummary = async () => {
  const response = await axios.get(`${BASE_URL}/summary`);
  return response.data;
};

export const getChains = async () => {
  const response = await axios.get(`${BASE_URL}/chains`);
  return response.data;
};

export const getAIAnalysis = async () => {
  const response = await axios.get(`${BASE_URL}/ai-analysis`);
  return response.data;
};

export const getMapData = async () => {
  const response = await axios.get(`${BASE_URL}/map-data`);
  return response.data;
};
