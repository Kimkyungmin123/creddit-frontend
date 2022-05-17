import { configureStore, Store } from '@reduxjs/toolkit';
import {
  nextReduxCookieMiddleware,
  wrapMakeStore,
} from 'next-redux-cookie-wrapper';
import { createWrapper } from 'next-redux-wrapper';
import userSlice, { UserState } from 'slices/userSlice';

export interface State {
  user: UserState;
}

const makeStore = wrapMakeStore(() =>
  configureStore({
    reducer: {
      [userSlice.name]: userSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().prepend(
        nextReduxCookieMiddleware({
          subtrees: [userSlice.name],
        })
      ),
  })
);

export const wrapper = createWrapper<Store<State>>(makeStore);
