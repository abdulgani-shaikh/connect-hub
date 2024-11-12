import { friendUrls, userUrl } from 'global';
import axiosService from './axiosService';
const pageSize = 10;

const sendFriendRequest = (senderId, receiverId) => {
  return axiosService.post(
    friendUrls.friendUrl,
    { senderId, receiverId },
    { headers: { 'Content-Type': 'application/json' } }
  );
};

const deleteFriendRequest = (requestId) => {
  return axiosService.delete(`${friendUrls.friendRequests}/${requestId}`);
};

const acceptFriendRequest = (requestId) => {
  return axiosService.put(`${friendUrls.friendRequests}/${requestId}/accept`);
};

const rejectFriendRequest = (requestId) => {
  return axiosService.delete(`${friendUrls.friendRequests}/${requestId}/reject`);
};

const unfriend = (asker, friendToUnfriend) => {
  return axiosService.put(
    friendUrls.friendUrl,
    { asker, friendToUnfriend },
    { headers: { 'Content-Type': 'application/json' } }
  );
};

const getFriendRequests = (userId, pageNumber) => {
  return axiosService.get(`${userUrl}/${userId}/friend-requests`, {
    params: { pageNumber, pageSize }
  });
};

const getFriends = (userId, pageNumber, size = pageSize) => {
  return axiosService.get(`${userUrl}/${userId}/friends`, { params: { pageNumber, size } });
};

const friendService = {
  getFriends,
  getFriendRequests,
  sendFriendRequest,
  deleteFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  unfriend
};
export default friendService;
