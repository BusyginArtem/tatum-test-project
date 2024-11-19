// Components
import preactLogo from '../../assets/tatum.jpeg';
import Form from './form';
// Hooks
import useTatumSDK from '../../hooks/useTatumSDK';
// Styles
import './style.css';

export default function Home() {
  const tatumSDK = useTatumSDK();

  const handleGetBalance = async (address: string) => {
    if (!address || !tatumSDK) {
      return;
    }

    const balance = await tatumSDK.address.getBalance({
      addresses: [address],
    });
    const balanceData = balance.data.filter(
      (asset) => asset.asset === 'ETH',
    )[0];

    return balanceData.balance;
  };

  return (
    <div className="home">
      <a href="https://preactjs.com" target="_blank">
        <img src={preactLogo} alt="Preact logo" height="160" width="160" />
      </a>
      <h1>Tatum Hello</h1>

      <Form onSubmit={handleGetBalance} />
    </div>
  );
}
