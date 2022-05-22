import { AnyAction, createSlice, PayloadAction, Store } from '@reduxjs/toolkit';
import { GetServerSidePropsContext } from 'next';
import { HYDRATE } from 'next-redux-wrapper';
import { useSelector } from 'react-redux';
import { State } from 'slices/store';
import { Theme } from 'types';

export type ThemeState = Theme | null;

const themeSlice = createSlice({
  name: 'theme',
  initialState: null as ThemeState,
  reducers: {
    setTheme: (_, action: PayloadAction<Theme>) => action.payload,
  },
  extraReducers: {
    [HYDRATE]: (_, action) => action.payload.theme,
  },
});

export const { setTheme } = themeSlice.actions;

export const useTheme = () =>
  useSelector<State, ThemeState>((state) => state.theme);

export function initTheme(
  store: Store<State, AnyAction>,
  context: GetServerSidePropsContext
) {
  const { theme } = context.req.cookies;
  if (theme === 'dark' || theme === 'light') {
    store.dispatch(setTheme(theme));
  }
}

export default themeSlice;
