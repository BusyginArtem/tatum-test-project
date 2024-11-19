// Preact
import { useState } from 'preact/hooks';

// Form
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

// Constants
export const ADDRESS_PLACEHOLDER = 'Enter ETH wallet address to get balance';
const ADDRESS_INPUT_NAME = 'address';

export type FormValues = {
  [ADDRESS_INPUT_NAME]: string;
  test: string;
};

type Props = {
  onSubmit: (address: string) => Promise<string>;
};

const formSchema = yup.object().shape({
  [ADDRESS_INPUT_NAME]: yup.string().required(),
});

function Form({ onSubmit }: Props) {
  const [labelText, setLabelText] = useState(''); // State to hold the label text

  const methods = useForm({
    resolver: yupResolver<FormValues>(formSchema),
    defaultValues: {
      [ADDRESS_INPUT_NAME]: '',
    },
  });

  const {
    register,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const handleFormSubmit = async ({ address }: FormValues) => {
    try {
      setLabelText('');

      const balance = await onSubmit(address);

      setLabelText(`Balance: ${balance}`);
    } catch (error) {
      setError(ADDRESS_INPUT_NAME, {
        type: 'bad_response',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} aria-label="address-form">
      <section>
        <input
          type="text"
          {...register(ADDRESS_INPUT_NAME)}
          placeholder={ADDRESS_PLACEHOLDER}
          style={{ padding: '5px', width: '320px', height: 'fit-content' }}
        />

        {errors[ADDRESS_INPUT_NAME] && (
          <span
            style={{
              color: 'red',
              fontSize: '16px',
              display: 'block',
              minHeight: 24,
            }}
            role="alert"
          >
            {errors[ADDRESS_INPUT_NAME].type === 'required' &&
              "The field 'address' is required."}

            {errors[ADDRESS_INPUT_NAME].type === 'bad_response' &&
              'Something went wrong! Try again.'}
          </span>
        )}
      </section>

      <button type="submit" style={{ padding: '5px' }} disabled={isSubmitting}>
        Click Me
      </button>

      <p style={{ padding: '5px', fontSize: '16px', fontWeight: 'bold' }}>
        {labelText}
      </p>
    </form>
  );
}

export default Form;
