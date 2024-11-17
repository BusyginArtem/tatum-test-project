import { Network, TatumSDK, Ethereum } from "@tatumio/tatum";
import { useEffect, useRef } from "preact/hooks";

function useTatumSDK() {
  const tatum = useRef<Ethereum>(null);

  useEffect(() => () => tatum.current.destroy(), []);

  TatumSDK.init<Ethereum>({
    network: Network.ETHEREUM,
    apiKey: { v4: process.env.REACT_APP_TATUM_API_KEY },
    verbose: true,
  }).then((tatumSDK) => (tatum.current = tatumSDK));

  return tatum.current;
}

export default useTatumSDK;
