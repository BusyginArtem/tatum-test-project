import { test, expect } from 'vitest';
import { render, renderHook, screen, waitFor } from '@testing-library/preact';

import Home from '.';
import { ADDRESS_PLACEHOLDER } from './form';
import useTatumSDK from '../../hooks/useTatumSDK';

describe('Home page', () => {
  test('render the page title', () => {
    render(<Home />);

    const pageTitle = screen.getByText(/Tatum Hello/i);
    expect(pageTitle).toBeInTheDocument();
  });

  test('initialize the Tatum SDK correctly', async () => {
    const { result } = renderHook(() => useTatumSDK());

    await waitFor(() => {
      expect(result.current).not.toBeNull();
      expect(result.current.token).not.toBeNull();
    });
  });
});

describe('Form component', () => {
  test("update 'address'", async () => {
    render(<Home />);
    const submitBtn = screen.getByRole('button', {
      name: 'Click Me',
    });

    const addressField = screen.getByPlaceholderText(ADDRESS_PLACEHOLDER);
    expect(addressField).toBeInTheDocument();
  });
});
