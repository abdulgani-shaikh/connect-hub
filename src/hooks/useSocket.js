import { useDispatch } from 'react-redux';
import { addMessage, increaseCount, newMessage } from '../redux/slices/messageSlice';
import SockJS from 'sockjs-client';
import { over } from 'stompjs';
import { backendUrl } from 'global';
import { useState } from 'react';
import { storageService } from 'service';

var stompClient = null;
var senderId = null;

const useSocket = (userId) => {
  const dispatch = useDispatch();
  const [isConnected, setConnected] = useState(false);

  const onMessageRecieved = (payload) => {
    var path = window.location.pathname;
    const body = JSON.parse(payload.body);
    dispatch(addMessage(body));

    if (path !== `/inbox/${body.senderId}` && body.senderId !== senderId) {
      dispatch(newMessage({ body, userId: senderId }));
    }
  };

  const onNotificationRecieved = (payload) => {};

  const connect = (userId) => {
    console.log('trying to connect');
    if (stompClient && stompClient.connected) {
      console.log('cannot connect');
      return;
    }
    let Sock = new SockJS(`${backendUrl}/ws`);
    stompClient = over(Sock);
    senderId = userId;
    stompClient.connect({ Authorization: `Bearer ${storageService.getAccessToken()}` }, onConnected, onError);
  };

  const onError = (error) => {
    console.log(`${error} while connecting`);
    setConnected(false);
  };

  const onConnected = () => {
    setConnected(true);
    stompClient.subscribe('/user/' + senderId + '/private', onMessageRecieved);
    stompClient.subscribe('/user/' + senderId + '/notification', onNotificationRecieved);
  };

  const publishMessage = (receiverId, message, isPost = false) => {
    if (!isConnected) {
      connect(userId);
    }
    if (!stompClient || !senderId) {
      return;
    }

    const chatMessage = {
      receiverId,
      senderId,
      message,
      post: isPost,
      date: new Date()
    };

    stompClient.send('/app/private-message', {}, JSON.stringify(chatMessage));
  };

  const disconnect = () => {
    if (stompClient && stompClient.connected)
      stompClient.disconnect(() => {
        setConnected(false);
        console.log('disconnecting');
      });
  };

  return [publishMessage, connect, disconnect];
};

export default useSocket;
