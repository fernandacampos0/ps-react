import axios from "axios";

const BaseApi = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api`,
})

BaseApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('ACCESS_TOKEN')
  config.headers.Authorization = `Bearer ${token}`;
  return config;
})

BaseApi.interceptors.response.use((response) => {
  return response;
}, (error) => {
  const {response} = error;
  try {
    if (response.status === 401) {
      localStorage.removeItem('ACCESS_TOKEN');
    }
  } catch(e) {
    console.error(e);
  }
  throw error;
});

export default BaseApi;