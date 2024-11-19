import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/preact';
import '@testing-library/jest-dom/vitest';
import '@testing-library/jest-dom';

// runs a clean after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});

beforeEach(() => {
  vi.mock('react-hook-form', async () => {
    return {
      ...vi.importActual('react-hook-form'),
      useForm: () => ({
        handleSubmit: (fn: (args: any) => {}) => (e: any) => {
          e.preventDefault();
          fn({});
        },
        formState: {
          errors: {},
          isSubmitting: false,
        },
        register: vi.fn(),
        setError: vi.fn(),
      }),
    };
  });
});
