import { test, expect } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/preact';
// import { FormProvider, useForm } from 'react-hook-form';
// import { ReactNode, ReactElement } from 'react';

// Components
import Form, { ADDRESS_PLACEHOLDER } from './form';

const FAKE_ADDRESS = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045';

const mockSubmit = vi.fn(({ address }) => {
  return Promise.resolve('');
});

// const renderWithHookForm = (ui: ReactElement, { defaultValues = {} } = {}) => {
//   const Wrapper = ({ children }: { children: ReactElement }) => {
//     const methods = useForm({ defaultValues });
//     return <FormProvider {...methods}>{children}</FormProvider>;
//   };

//   return { ...render(ui, { wrapper: Wrapper }) };
// };

const setup = () => {
  // const { result } = renderHook(() => useForm({
  //   defaultValues: {
  //     address: ''
  //   },
  // }));

  // const utils = render(
  //   <FormProvider {...result.current}>
  //     <Form onSubmit={mockSubmit} />
  //   </FormProvider>,
  // );

  // const utils = renderWithHookForm(<Form onSubmit={mockSubmit} />, {
  //   defaultValues: {
  //     address: '',
  //   },
  // });
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

  // test('should display required error when value is invalid', async () => {
  //   const { form } = setup();

  //   fireEvent.submit(form);
  //   expect(await screen.findAllByRole('alert')).toHaveLength(1);
  //   expect(mockSubmit).not.toBeCalled();
  // });

  test('should not display error when value is valid', async () => {
    const { formAddressField, form } = setup();

    fireEvent.change(formAddressField, { target: { value: FAKE_ADDRESS } });
    fireEvent.submit(form);
    expect(mockSubmit).toHaveBeenCalled();
  });
});
