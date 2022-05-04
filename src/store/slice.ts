import { createSlice } from '@reduxjs/toolkit';

const initialState: any[] = [];

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    createChatRoom(state, action) {
      state[action.payload.targetUser] = [...action.payload.messages];
      return { ...state };
    },
    sendNewMessage(state, action) {
      state[action.payload.receiver] = [
        ...state[action.payload.receiver],
        action.payload,
      ];
      return { ...state };
    },
    receiveMessage(state, action) {
      if (state[action.payload.sender] === undefined) {
        state[action.payload.sender] = [action.payload];
      } else {
        state[action.payload.sender] = [
          ...state[action.payload.sender],
          action.payload,
        ];
      }
      return { ...state };
    },
  },
});

export default chatSlice.reducer;
export const { createChatRoom, sendNewMessage, receiveMessage } =
  chatSlice.actions;
