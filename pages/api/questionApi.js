import axios from "axios";

const API_URL = "http://localhost:8080/api/questions";

export const saveQuestion = (data) =>
  axios.post(`${API_URL}/questions`, data);

export const getAllQuestions = () =>
  axios.get(`${API_URL}/questions`);

export const getByCategory = (category) =>
  axios.get(`${API_URL}/questions/category/${category}`);

// Add this new export
export const submitTestForm = (data) =>
  axios.post(`${API_URL}/v1/tests`, data);