import { render, RenderOptions } from '@testing-library/react';
import React, { FC, ReactElement } from 'react';
import { SWRConfig } from 'swr';

const AllTheProviders: FC = ({ children }) => {
  return (
    <SWRConfig value={{ provider: () => new Map() }}>{children}</SWRConfig>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
