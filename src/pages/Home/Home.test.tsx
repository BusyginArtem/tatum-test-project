import { test, expect } from 'vitest';
import {
  fireEvent,
  render,
  renderHook,
  screen,
  waitFor,
} from '@testing-library/preact';

// Components
import Home from '.';
// Constants
import { ADDRESS_PLACEHOLDER } from './form';
// Hooks
import useTatumSDK from '../../hooks/useTatumSDK';

const setup = () => {
  const utils = render(<Home />);

  const formAddressField = screen.getByPlaceholderText(
    ADDRESS_PLACEHOLDER,
  ) as HTMLInputElement;

  const formSubmitButton = screen.getByRole('button', {
    name: 'Click Me',
  });

  return {
    formAddressField,
    formSubmitButton,
    ...utils,
  };
};

describe('Home page', () => {
  test('render the page title', () => {
    setup();

    const pageTitle = screen.getByText(/Tatum Hello/i);
    expect(pageTitle).toBeInTheDocument();
  });
});

describe('Form component', () => {
  test('initialize the Tatum SDK correctly', async () => {
    const { result } = renderHook(() => useTatumSDK());

    await waitFor(() => {
      expect(result.current).not.toBeNull();
      expect(result.current.token).not.toBeNull();
    });
  });

  test('the "address" field is rendered and works correctly', async () => {
    const { formAddressField } = setup();

    expect(formAddressField).toBeInTheDocument();
    fireEvent.change(formAddressField, { target: { value: 'test' } });
    expect(formAddressField.value).toBe('test');
  });

  test('display the "address" field required error', async () => {
    const { formSubmitButton } = setup();

    screen.debug(formSubmitButton);
    // screen.debug(formAddressField);
  });
});
