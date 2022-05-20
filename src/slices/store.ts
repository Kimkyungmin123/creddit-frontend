import { configureStore, Store } from '@reduxjs/toolkit';
import {
  nextReduxCookieMiddleware,
  wrapMakeStore,
} from 'next-redux-cookie-wrapper';
import { createWrapper } from 'next-redux-wrapper';
import userSlice, { UserState } from 'slices/userSlice';
import postDetailSlice, { PostDetailState } from './postDetailSlice';
import postsSlice, { PostsState } from './postsSlice';
import profileSlice, { ProfileState } from './profileSlice';

export interface State {
  user: UserState;
  posts: PostsState;
  postDetail: PostDetailState;
  profile: ProfileState;
}

export const reducer = {
  [userSlice.name]: userSlice.reducer,
  [postsSlice.name]: postsSlice.reducer,
  [postDetailSlice.name]: postDetailSlice.reducer,
  [profileSlice.name]: profileSlice.reducer,
};

const makeStore = wrapMakeStore(() =>
  configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().prepend(
        nextReduxCookieMiddleware({
          subtrees: [
            userSlice.name,
            `${postsSlice.name}.blockHydrate`,
            `${postsSlice.name}.scrollY`,
          ],
        })
      ),
  })
);

export const wrapper = createWrapper<Store<State>>(makeStore);
