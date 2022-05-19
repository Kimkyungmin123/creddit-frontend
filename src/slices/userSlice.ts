import { AnyAction, createSlice, PayloadAction, Store } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { GetServerSidePropsContext } from 'next';
import { HYDRATE } from 'next-redux-wrapper';
import { useSelector } from 'react-redux';
import { State } from 'slices/store';
import { User } from 'types';
import getCurrentUser from 'utils/getCurrentUser';

export type UserState = User | null;

const userSlice = createSlice({
  name: 'user',
  initialState: null as UserState,
  reducers: {
    setUser: (_, action: PayloadAction<User | null>) => action.payload,
    logout() {
      Cookies.remove('access_token');
      Cookies.remove('refresh_token');
      Cookies.remove('auth_exp_date');
      return null;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return state || action.payload.user;
    },
  },
});

export const { setUser, logout } = userSlice.actions;

export const useUser = () =>
  useSelector<State, UserState>((state) => state.user);

export async function initUser(
  store: Store<State, AnyAction>,
  context: GetServerSidePropsContext
) {
  let { user } = store.getState();
  if (!user) {
    user = await getCurrentUser(context);
    store.dispatch(setUser(user));
  }
  return { user };
}

export default userSlice;
