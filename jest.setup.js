import '@testing-library/jest-dom/extend-expect';
import { server } from './src/mocks/server';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
    };
  },
}));

window.matchMedia = () => ({ matches: false });
document.cookie = 'access_token=123';
window.IntersectionObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

process.env.NEXT_PUBLIC_API_ENDPOINT = 'http://localhost:8080';

// Establish API mocking before all tests.
beforeAll(() => server.listen());
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());
// Clean up after the tests are finished.
afterAll(() => server.close());
