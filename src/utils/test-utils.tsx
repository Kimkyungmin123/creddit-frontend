import { render, RenderOptions } from '@testing-library/react';
import { SessionProvider } from 'next-auth/react';
import React, { FC, ReactElement } from 'react';
import { SWRConfig } from 'swr';

const AllTheProviders: FC = ({ children }) => {
  return (
    <SessionProvider session={null}>
      <SWRConfig value={{ provider: () => new Map() }}>{children}</SWRConfig>
    </SessionProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
