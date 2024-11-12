const getUserId = () => {
  return localStorage.getItem('userId');
};

const setUserId = (userId) => {
  return localStorage.setItem('userId', userId);
};

const getRefreshToken = () => {
  return localStorage.getItem('refresh-token');
};

const setRefreshToken = (refreshToken) => {
  return localStorage.setItem('refresh-token', refreshToken);
};

const getAccessToken = () => {
  return localStorage.getItem('access-token');
};

const setAccessToken = (accessToken) => {
  return localStorage.setItem('access-token', accessToken);
};

const clear = () => {
  localStorage.clear();
};

const storageService = {
  setUserId,
  getUserId,
  getRefreshToken,
  setRefreshToken,
  getAccessToken,
  setAccessToken,
  clear
};
export default storageService;
