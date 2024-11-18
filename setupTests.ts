import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/preact';
import '@testing-library/jest-dom/vitest';
import '@testing-library/jest-dom';
// import { useForm } from 'react-hook-form';

vi.mock('react-hook-form');

// import { h } from 'preact';

// runs a clean after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});

beforeEach(() => {
  // const mockUseForm = useForm as vi.mock;

  // mockUseForm.mockImplementation(() => ({
  //   handleSubmit: vi.fn(),
  //   formState: {
  //     errors: {},
  //     isDirty: true,
  //     isSubmitting: false,
  //     isValid: true,
  //   },
  //   register: vi.fn(),
  //   watch: vi.fn(),
  //   // ...rest,
  // }));
  vi.mock('react-hook-form', () => ({
    ...vi.importActual('react-hook-form'),
    useForm: () => ({
      handleSubmit: vi.fn(),
      formState: {
        errors: {},
        isDirty: true,
        isSubmitting: false,
        isValid: true,
      },
      register: vi.fn(),
    }),
  }));
});
