import api from "../axios";

export const loginUser = async (email, password) => {
  const response = await api.post(`/login`, {
    email,
    password,
  });
  return response.data;
};

export const forgotPassword = async (email) => {
  const response = await api.post(`/forgot-password`, {
    email
  });
  return response.data;
};

export const resettPassword = async (email, password, token) => {
  const response = await api.post(`/reset-password`, {
    email, password, token
  });
  return response.data;
};

export const logoutUser = async () => {
    localStorage.removeItem('auth_token');
    return 'Logout succesfull';
};