import { AnyAction, createSlice, PayloadAction, Store } from '@reduxjs/toolkit';
import axios from 'axios';
import { GetServerSidePropsContext } from 'next';
import { HYDRATE } from 'next-redux-wrapper';
import loadConfig from 'next/dist/server/config';
import { useSelector } from 'react-redux';
import { State } from 'slices/store';
import { User } from 'types';

export type ProfileState = User | null;

const profileSlice = createSlice({
  name: 'profile',
  initialState: null as ProfileState,
  reducers: {
    setProfile: (_, action: PayloadAction<User | null>) => action.payload,
    changeProfile: (state, action: PayloadAction<Partial<User>>) =>
      state && state.nickname === action.payload.nickname
        ? { ...state, ...action.payload }
        : state,
  },
  extraReducers: {
    [HYDRATE]: (_, action) => action.payload.profile,
  },
});

export const { setProfile, changeProfile } = profileSlice.actions;

export const useProfile = () =>
  useSelector<State, ProfileState>((state) => state.profile);

export async function initProfile(
  store: Store<State, AnyAction>,
  context: GetServerSidePropsContext
) {
  try {
    const { nickname } = context.query;
    const url = encodeURI(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/profile/show/${nickname}`
    );
    const { data: user } = await axios.get<User>(url);
    store.dispatch(setProfile(user));
  } catch (err) {
    console.error(err);
  }
}

export default profileSlice;
