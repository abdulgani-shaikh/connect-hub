import { postUrl, userUrl } from 'global';
import axiosService from './axiosService';

const uploadNewPost = (userId, image, text) => {
  const formData = new FormData();
  formData.append('userId', userId);
  formData.append('text', text);
  formData.append('image', image);
  return axiosService.post(postUrl, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};

const pageSize = 10;

const getPost = (postId) => {
  return axiosService.get(postUrl + '/' + postId);
};

const getPostsOfUser = (userId, pageNumber) => {
  return axiosService.get(`${userUrl}/${userId}/posts`, { params: { pageNumber, pageSize } });
};

const getFeed = (userId, pageNumber) => {
  return axiosService.get(`${userUrl}/${userId}/feed`, { params: { pageNumber, pageSize } });
};

const postComment = (postId, comment, userId) => {
  return axiosService.post(`${postUrl}/${postId}/comments`, { userId, comment });
};

const getComments = (postId, pageNumber) => {
  return axiosService.get(`${postUrl}/${postId}/comments`, { params: { pageNumber } });
};

const isLikedAndSaved = (postId, userId) => {
  return axiosService.get(`${postUrl}/${postId}/isLikedAndBookmarked/${userId}`);
};
const likePost = (postId, userId) => {
  return axiosService.post(`${postUrl}/${postId}/likes/${userId}`);
};
const unlikePost = (postId, userId) => {
  return axiosService.delete(`${postUrl}/${postId}/unlikes/${userId}`);
};

const savePost = (postId, userId) => {
  return axiosService.post(`${postUrl}/${postId}/bookmark/${userId}`);
};
const unsavePost = (postId, userId) => {
  return axiosService.delete(`${postUrl}/${postId}/removeBookmark/${userId}`);
};

const postService = {
  uploadNewPost,
  getPost,
  getPostsOfUser,
  getFeed,
  postComment,
  getComments,
  isLikedAndSaved,
  likePost,
  unlikePost,
  savePost,
  unsavePost
};
export default postService;
