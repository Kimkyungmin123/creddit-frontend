import { NEW_CHAT, RECEIVE_MESSAGE, SEND_MESSAGE } from './types';

export const createChatRoom = (targetUserInfo: any) => ({
  type: NEW_CHAT,
  payload: targetUserInfo,
});

export const sendNewMessage = (message: any) => ({
  type: SEND_MESSAGE,
  payload: message,
});

export const receiveMessage = (message: any) => ({
  type: RECEIVE_MESSAGE,
  payload: message,
});
