import { chatUrl, inboxUrl } from 'global';
import axiosService from './axiosService';

const fetchMessages = (userId, id, page) => {
  return axiosService.get(`${chatUrl}/${userId}/${id}`, {
    params: { pageNumber: page, pageSize: 15 }
  });
};

const fetchInbox = (userId, page) => {
  return axiosService.get(`${inboxUrl}/${userId}`, { params: { pageNumber: page } });
};

const fetchTotalUnreadConvo = (userId) => {
  return axiosService.get(`${inboxUrl}/${userId}/count`);
};

const chatService = { fetchMessages, fetchInbox, fetchTotalUnreadConvo };
export default chatService;
