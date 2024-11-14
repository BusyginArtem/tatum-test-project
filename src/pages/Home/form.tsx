// App.js
import { Network, TatumSDK, Ethereum } from "@tatumio/tatum";
import React, { useEffect, useRef, useState } from "react";

function Form() {
  const [inputValue, setInputValue] = useState(""); // State to hold the input value
  const [labelText, setLabelText] = useState(""); // State to hold the label text

  const tatum = useRef<Ethereum>(null);

  useEffect(() => () => tatum.current.destroy(), []);

  const handleGetBalance = async () => {
    tatum.current = await TatumSDK.init<Ethereum>({
      network: Network.ETHEREUM,
      apiKey: { v4: "" },
      verbose: true,
    });

    const balance = await tatum.current.address.getBalance({
      addresses: [inputValue],
    });
    const balanceData = balance.data.filter(
      (asset) => asset.asset === "ETH"
    )[0];

    setLabelText(`Balance: ${balanceData.balance}`);
  };

  const handleChangeWalletAddress = (
    e: React.JSX.TargetedEvent<HTMLInputElement>
  ) => {
    if (e.target instanceof HTMLInputElement) {
      setInputValue(e.target.value);
    }
  };

  return (
    <div>
      <p>
        <input
          type="text"
          value={inputValue}
          onChange={handleChangeWalletAddress}
          placeholder="Enter ETH wallet address to get balance"
          style={{ padding: "5px", width: "320px" }}
        />
      </p>
      <button onClick={handleGetBalance} style={{ padding: "5px" }}>
        Click Me
      </button>
      <p style={{ padding: "5px", fontSize: "16px", fontWeight: "bold" }}>
        {labelText}
      </p>
    </div>
  );
}

export default Form;
