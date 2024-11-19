import { test, expect } from 'vitest';
import { render, screen, renderHook, waitFor } from '@testing-library/preact';
// Hooks
import useTatumSDK from '../../hooks/useTatumSDK';
// Components
import Home from '.';

const setup = () => {
  const utils = render(<Home />);

  return utils;
};

describe('Home page', () => {
  test('initialize the Tatum SDK correctly', async () => {
    const { result } = renderHook(() => useTatumSDK());

    await waitFor(() => {
      expect(result.current).not.toBeNull();
      expect(result.current.token).not.toBeNull();
    });
  });

  test('render the page title', () => {
    setup();

    const pageTitle = screen.getByText(/Tatum Hello/i);
    expect(pageTitle).toBeInTheDocument();
  });
});
