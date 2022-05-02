import { NEW_CHAT, RECEIVE_MESSAGE, SEND_MESSAGE } from './types';

const initialState: any[] = [];

export default function chatReducer(state = initialState, action: any) {
  switch (action.type) {
    case NEW_CHAT:
      state[action.payload.targetUser] = [...action.payload.messages];
      return { ...state };
    case SEND_MESSAGE:
      state[action.payload.receiver] = [
        ...state[action.payload.receiver],
        action.payload,
      ];
      return { ...state };
    case RECEIVE_MESSAGE:
      if (state[action.payload.sender] === undefined) {
        state[action.payload.sender] = [action.payload];
      } else {
        state[action.payload.sender] = [
          ...state[action.payload.sender],
          action.payload,
        ];
      }
      return { ...state };
    default:
      return state;
  }
}
