import { test, expect } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/preact';

// Components
import Form, { ADDRESS_PLACEHOLDER } from './form';

const FAKE_ADDRESS = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045';

const mockSubmit = vi.fn(({ address }) => {
  return Promise.resolve('');
});

const setup = () => {
  const utils = render(<Form onSubmit={mockSubmit} />);

  const formAddressField = screen.getByPlaceholderText(
    ADDRESS_PLACEHOLDER,
  ) as HTMLInputElement;

  const formSubmitButton = screen.getByRole('button', {
    name: 'Click Me',
  });

  const form = screen.getByRole('form', { name: 'address-form' });

  return {
    formAddressField,
    formSubmitButton,
    form,
    ...utils,
  };
};

describe('Form component', () => {
  test('the "address" field is rendered and works correctly', () => {
    const { formAddressField } = setup();

    expect(formAddressField).toBeInTheDocument();
    fireEvent.change(formAddressField, { target: { value: FAKE_ADDRESS } });
    expect(formAddressField.value).toBe(FAKE_ADDRESS);
  });

  test('should not display error when value is valid', async () => {
    const { formAddressField, form } = setup();

    fireEvent.change(formAddressField, { target: { value: FAKE_ADDRESS } });
    fireEvent.submit(form);
    expect(mockSubmit).toHaveBeenCalled();
  });
});
