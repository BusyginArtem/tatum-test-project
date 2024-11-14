// React
import React, { useState } from "react";
// Hooks
import useTatumSDK from "../../hooks/useTatumSDK";

function Form() {
  const [inputValue, setInputValue] = useState(""); // State to hold the input value
  const [labelText, setLabelText] = useState(""); // State to hold the label text

  const tatumSDK = useTatumSDK();

  const handleGetBalance = async () => {
    const balance = await tatumSDK.address.getBalance({
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
