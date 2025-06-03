export const login = (token) => {
  localStorage.setItem('auth_token', token);
};
