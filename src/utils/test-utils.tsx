import { configureStore } from '@reduxjs/toolkit';
import { render, RenderOptions } from '@testing-library/react';
import postDummy from 'data/post.json';
import userDummy from 'data/user.json';
import React, { FC, ReactElement, useEffect } from 'react';
import { Provider } from 'react-redux';
import { setPostDetail } from 'slices/postDetailSlice';
import { reducer } from 'slices/store';
import { setUser } from 'slices/userSlice';
import { SWRConfig } from 'swr';

const store = configureStore({
  reducer,
});

const AllTheProviders: FC = ({ children }) => {
  useEffect(() => {
    store.dispatch(setUser(userDummy));
    store.dispatch(setPostDetail(postDummy));
  }, []);

  return (
    <Provider store={store}>
      <SWRConfig value={{ provider: () => new Map() }}>{children}</SWRConfig>
    </Provider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
export { store };
