import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type' : 'application/json',
    }
});

export const signup = (userData) => {
    return api.post('/auth/register', userData,{
    headers: { 'Content-Type': 'application/json' },
  }); 
};

export const signin = (credential) => api.post('/auth/login', credential)

export default api;
