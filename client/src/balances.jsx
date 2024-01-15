import { useEffect, useState } from "react";

import axios from "axios";

export default function Balances() {
  const [balances, setBalances] = useState({});

  useEffect(() => {
    axios("http://localhost:3000/balances").then(({ data }) => {
      setBalances(data);
    });
  }, []);

  return (
    <div>
      <h3>Wallet: {balances.address}</h3>
      <h3>Native Balance: {balances.nativeBalance} ETH</h3>
      <h3>Token Balances: {balances.tokenBalances}</h3>
    </div>
  );
}
