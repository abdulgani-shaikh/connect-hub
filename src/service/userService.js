import { searchUrl, serverStatusUrl, userUrl } from 'global';
import axiosService from './axiosService';
const pageSize = 10;

const getUser = (userId) => {
  return axiosService.get(`${userUrl}/${userId}`);
};
const fetchLastSeen = (userId) => {
  return axiosService.get(`${userUrl}/${userId}/lastSeen`);
};

const updateProfile = (userId, image) => {
  const formData = new FormData();
  formData.append('file', image);
  return axiosService.put(`${userUrl}/${userId}/updateProfile`, formData, {
    headers: { 'content-type': 'multipart/form-data' }
  });
};

const updateCover = (userId, image) => {
  const formData = new FormData();
  formData.append('file', image);
  return axiosService.put(`${userUrl}/${userId}/updateCover`, formData, {
    headers: { 'content-type': 'multipart/form-data' }
  });
};

const updateDesp = (userId, description) => {
  return axiosService.put(
    `${userUrl}/${userId}/updateDescription`,
    { description },
    {
      headers: { 'content-type': 'application/json' }
    }
  );
};

const search = (q, pageNumber) => {
  return axiosService.get(searchUrl, { params: { q, pageNumber, pageSize: 15 } });
};

const getMyRelation = (userId, otherUserId) => {
  return axiosService.get(`${userUrl}/relation/${userId}`, { params: { otherUserId } });
};

const getSavedPosts = (userId, pageNumber) => {
  return axiosService.get(`${userUrl}/${userId}/bookmarks`, {
    params: { pageNumber, pageSize }
  });
};

const changePassword = (userId, oldPassword, newPassword) => {
  return axiosService.put(`${userUrl}/${userId}/change-password`, { oldPassword, newPassword });
};

const fetchServerStatus = () => {
  return axiosService.get(serverStatusUrl);
};

const userService = {
  getUser,
  fetchLastSeen,
  updateDesp,
  updateProfile,
  updateCover,
  search,
  getMyRelation,
  getSavedPosts,
  changePassword,
  fetchServerStatus
};

export default userService;
