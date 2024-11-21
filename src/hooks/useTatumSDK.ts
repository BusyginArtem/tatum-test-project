import { Network, TatumSDK, Ethereum } from '@tatumio/tatum';
// Preact
import { useEffect, useState } from 'preact/hooks';

function useTatumSDK() {
  const [tatumSDK, setTatumSDK] = useState<Ethereum | null>(null);

  useEffect(() => () => tatumSDK && tatumSDK?.destroy(), [tatumSDK]);

  useEffect(() => {
    TatumSDK.init<Ethereum>({
      network: Network.ETHEREUM,
      apiKey: { v4: import.meta.env.VITE_APP_TATUM_API_KEY },
      verbose: true,
    }).then((tatumSDK) => tatumSDK && setTatumSDK(tatumSDK));
  }, []);

  return tatumSDK;
}

export default useTatumSDK;
