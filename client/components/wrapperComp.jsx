import React from "react";
import abi from "../src/contracts/StuDetails.json";
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import { useConnect } from "wagmi";
import SignIn from "../pages/signin";
import Distributor from "../pages/ssDistributor";
import Student from "../pages/student";
import Staff from "../pages/Staff";

function wrapperComp() {
  const { connectAsync } = useConnect();

  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [account, setAccount] = useState("None");
  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0xBbd3D14d9298F236145bB9B1733837b01871B05E";
      const contractABI = abi.abi;
      try {
        const { ethereum } = window;

        if (ethereum) {
          const { account, chain } = await connectAsync({
            connector: new MetaMaskConnector(),
          });
          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });

          window.ethereum.on("accountsChanged", () => {
            window.location.reload();
          });

          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          );
          setAccount(account);
          setState({ provider, signer, contract });
        } else {
          alert("Please install metamask");
        }
      } catch (error) {
        console.log(error);
      }
    };
    connectWallet();
  }, []);
  console.log(state);

  //Web3 Wallet Connection code ends here
  return (
    <>
      <SignIn />
      <Distributor></Distributor>
      <Student></Student>
      <Staff></Staff>;
    </>
  );
}

export default wrapperComp;
