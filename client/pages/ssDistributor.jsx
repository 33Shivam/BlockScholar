import { getSession, signOut } from "next-auth/react";
import connectDB from "../lib/connectDB";
import Users from "../lib/userSchema";
import { useState, useEffect } from "react";
import axios from "axios";
import abi from "../src/contracts/ScholarDetails.json";
import { ethers } from "ethers";
import DisContractAddress from "../../contractAddresses.json";

function Distributor({ user, bio }) {
  const DistributorContractAddress = DisContractAddress.ScholarshipAddress;

  //Student Contract Instance and wallet instamce

  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [account, setAccount] = useState("None");
  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = DistributorContractAddress;
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

  const addSchlRec = async (event) => {
    event.preventDefault();
    const { contract } = state;
    const ID = document.querySelector("#ID").value;
    const ScholarshipName = document.querySelector("#SSName").value;
    const ScholarshipAmount = document.querySelector("#SSAmt").value; //transfer 100000000000000 for a significant change in amount
    const Attendance = document.querySelector("#Atn").value;
    const AvgMarks = document.querySelector("#AvgMarks").value;
    console.log(ID, ScholarshipName, ScholarshipAmount, Attendance, AvgMarks);
    const tx = await contract.addSchlRecords(
      ID,
      ScholarshipName,
      ScholarshipAmount,
      Attendance,
      AvgMarks
    );
    await tx.wait();
    const details = await contract.getSchlDetails(ID);
    console.log(details);
  };
  return (
    <div>
      <h4>User session:</h4>
      <div>bio: {bio}</div>
      <div>Address: {user.address}</div>
      <br />
      <form onSubmit={addSchlRec}>
        <label>Roll No</label>
        <input type="number" id="ID" placeholder="Roll"></input>
        <label>Scholarship Name</label>
        <input type="text" id="SSName" placeholder="Roll"></input>
        <label>Amount</label>
        <input
          type="number"
          id="SSAmt"
          placeholder="Enter Amount to transfer"
        ></input>
        <label>Attendance Required</label>
        <input
          type="number"
          id="Atn"
          placeholder="Attendance Requirement"
        ></input>
        <label>Average Marks</label>
        <input
          type="number"
          id="AvgMarks"
          placeholder="Marks Requirement"
        ></input>
        <button type="submit">Add Scholarship Record</button>
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

export default Distributor;
