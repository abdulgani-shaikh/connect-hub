const backendUrl = process.env.REACT_APP_BACKEND_URL;
const clientUrl = process.env.REACT_APP_CLIENT_URL;

const imageUrl = `${backendUrl}/api/image`;
const authUrl = '/api/auth/';
const userUrl = '/api/users';
const friendUrl = '/api/friends';
const postUrl = '/api/posts';
const searchUrl = '/api/search';
const serverStatusUrl = '/api/server-status';

const login = authUrl + 'login';
const signUp = authUrl + 'sign-up';
const logout = authUrl + 'logout';
const isUserLoggedIn = userUrl + '/isLoggedIn';

// 4117

const authUrls = {
  login,
  signUp,
  logout,
  isUserLoggedIn
};

const friendUrls = {
  friendUrl: friendUrl,
  friendRequests: friendUrl + '/requests',
  acceptFr: friendUrl + '/requests/accept',
  rejectFr: friendUrl + '/requests/reject'
};

const chatUrl = `${backendUrl}/api/chat`;
const inboxUrl = `${backendUrl}/api/inbox`;

export {
  backendUrl,
  clientUrl,
  inboxUrl,
  chatUrl,
  authUrl,
  authUrls,
  imageUrl,
  userUrl,
  friendUrl,
  postUrl,
  searchUrl,
  friendUrls,
  serverStatusUrl
};
