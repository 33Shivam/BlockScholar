import { getSession, signOut } from "next-auth/react";
import connectDB from "../lib/connectDB";
import Users from "../lib/userSchema";
import { useState, useEffect } from "react";
import axios from "axios";
import abi from "../src/contracts/StuDetails.json";
import { ethers } from "ethers";
import StuContractAddress from "../../contractAddresses.json";
import { Card, Text, Section, Container } from "@radix-ui/themes";

function Student({ user, bio }) {
  const StudentContractAddress = StuContractAddress.StudentAddress;
  //Student Contract Instance and wallet instamce

  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [account, setAccount] = useState("None");
  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = StudentContractAddress;
      console.log(contractAddress);
      const contractABI = abi.abi;
      try {
        const { ethereum } = window;

        if (ethereum) {
          const account = await ethereum.request({
            method: "eth_requestAccounts",
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
  // console.log(state);
  //Student Contract Instance ends here

  const [value, changeValue] = useState("");
  async function updateBio() {
    const { data } = await axios.post(
      "/api/updateBio",
      { profileId: user.profileId, bio: value },
      {
        headers: {
          "content-type": "application/json",
        },
      }
    );

    console.log("Bio Updated to: " + data.bio);

    location.reload();
  }
  const addDetails = async (event) => {
    event.preventDefault();
    const { contract } = state;
    const ID = document.querySelector("#ID").value;
    const firstName = document.querySelector("#firstName").value;
    const lastName = document.querySelector("#lastName").value;
    const tx = await contract.addStuRecords(ID, firstName, lastName);
    await tx.wait();
    console.log("Transaction Mined");
    const details = await contract.getStuDetails(ID);
    console.log(details);
  };
  return (
    <div>
      <Section>
        <Container></Container>
      </Section>
      <div>Your Information: {bio}</div>
      <div>Your Wallet Address: {user.address}</div>
      <br />
      <form onSubmit={addDetails}>
        <label>Roll No</label>
        <input type="number" id="ID" placeholder="Roll"></input>
        <label>First Name</label>
        <input type="text" id="firstName" placeholder="First Name"></input>
        <label>Last Name</label>
        <input type="text" id="lastName" placeholder="Last Name"></input>
        <button type="submit">Add your record</button>
      </form>

      <button onClick={() => signOut({ redirect: "/signin" })}>Sign out</button>
    </div>
  );
}

//server side redirect
export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  await connectDB();

  const userM = await Users.findOne({ address: session?.user.address }).lean();

  if (!userM) {
    userM.bio = userM.bio.toString();
  }
  return {
    props: { user: session.user, bio: userM.bio },
  };
}

export default Student;
