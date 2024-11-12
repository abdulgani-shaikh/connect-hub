import { authUrl, authUrls } from 'global';
import axiosService from './axiosService';

const login = (username, password) => {
  if (typeof username !== 'string' && typeof password !== 'string') return;
  if (!username || !password) return;
  return axiosService.post(authUrls.login, { credential: username, password });
};

const sendOtpToResetPassword = (email) => {
  return axiosService.post(`${authUrl}${email}/forgot-password`, null);
};
const resetPassword = (email, password, otp) => {
  return axiosService.put(`${authUrl}${email}/reset-password`, {
    newPassword: password,
    otp
  });
};

const signUp = ({ username, password, email }) => {
  if (typeof username !== 'string' && typeof password !== 'string') return;
  if (!username || !password) return;
  return axiosService.post(authUrls.signUp, { username, password, email });
};

const isUserLoggedIn = () => {
  return axiosService.get(authUrls.isUserLoggedIn);
};

const logout = () => {
  return axiosService.post(authUrls.logout, null);
};

const verifyEmail = (email, token) => {
  return axiosService.get(`${authUrl}verify-account/${email}`, { params: { token } });
};

const resendVerificationLink = (email) => {
  return axiosService.post(`${authUrl}resend-verification-email/${email}`);
};
const consumeRefreshToken = (userId) => {
  return axiosService.post(`${authUrl}${userId}/refresh-token`);
};

const authService = {
  login,
  signUp,
  logout,
  sendOtpToResetPassword,
  resetPassword,
  isUserLoggedIn,
  verifyEmail,
  resendVerificationLink,
  consumeRefreshToken
};

export default authService;
