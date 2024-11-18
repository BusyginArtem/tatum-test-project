// React
import { useState } from 'react';
// Hooks
import useTatumSDK from '../../hooks/useTatumSDK';
// Form
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

// Constants
export const ADDRESS_PLACEHOLDER = 'Enter ETH wallet address to get balance';
const ADDRESS_INPUT_NAME = 'address';

type FormValues = {
  [ADDRESS_INPUT_NAME]: string;
};

const formSchema = yup.object().shape({
  [ADDRESS_INPUT_NAME]: yup.string().required(),
});

function Form() {
  const [labelText, setLabelText] = useState(''); // State to hold the label text

  const tatumSDK = useTatumSDK();

  const {
    register,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver<FormValues>(formSchema),
    defaultValues: {
      [ADDRESS_INPUT_NAME]: '',
    },
  });

  const handleGetBalance = async ({ address }: FormValues) => {
    if (!address || !tatumSDK) {
      return;
    }

    try {
      const balance = await tatumSDK.address.getBalance({
        addresses: [address],
      });
      const balanceData = balance.data.filter(
        (asset) => asset.asset === 'ETH',
      )[0];

      setLabelText(`Balance: ${balanceData.balance}`);
    } catch (error) {
      setError(ADDRESS_INPUT_NAME, {
        type: 'bad_response',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(handleGetBalance)}>
      <p>
        <input
          type="text"
          {...register(ADDRESS_INPUT_NAME)}
          placeholder={ADDRESS_PLACEHOLDER}
          style={{ padding: '5px', width: '320px' }}
        />

        <span
          style={{
            color: 'red',
            fontSize: '16px',
            fontWeight: 'bold',
            display: 'block',
            minHeight: 24,
          }}
          name="error-message"
        >
          {errors[ADDRESS_INPUT_NAME] &&
            errors[ADDRESS_INPUT_NAME].type === 'required' &&
            "The field 'address' is required."}

          {errors[ADDRESS_INPUT_NAME] &&
            errors[ADDRESS_INPUT_NAME].type === 'bad_response' &&
            'Something went wrong! Try again.'}
        </span>
      </p>
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
