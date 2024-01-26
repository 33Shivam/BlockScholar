import { getSession, signOut } from "next-auth/react";
import connectDB from "../lib/connectDB";
import Users from "../lib/userSchema";
import axios from "axios";
import { useState, useEffect } from "react";
import SimpleStorage from "../src/contracts/SampleContract.json";
import Web3 from "web3";

function User({ user, bio }) {
  //web3JS
  const [state, setState] = useState({
    web3: null,
    contract: null,
  });
  const [data, setData] = useState("0");
  useEffect(() => {
    const provider = new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545");

    async function template() {
      const web3 = new Web3(provider);
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorage.networks[networkId];
      const contract = new web3.eth.Contract(
        SimpleStorage.abi,
        deployedNetwork.address
      );
      console.log(contract);
      setState({ web3: web3, contract: contract });
    }
    provider && template();
  }, []);
  useEffect(() => {
    const { contract } = state;
    async function readData() {
      const data = await contract.methods.getter().call();
      setData(data);
    }
    contract && readData();
  }, [state]);
  async function writeData() {
    const { contract } = state;
    // const data = document.querySelector("#value").value;
    await contract.methods
      .setter(100000000000)
      .send({ from: "0x487D6C2069A63FCf4e435613CB3ee63219d189b5" });
    window.location.reload();
  }

  //web3JS ends

  //   console.log(user);

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
  return (
    <div>
      <h4>User session:</h4>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <div>bio: {bio}</div>
      <div>Address: {user.address}</div>
      <p>Contract Data : {data}</p>
      <div>
        <input type="text" id="value" required="required"></input>
      </div>

      <button onClick={writeData} className="button button2">
        Change Data
      </button>

      <br />
      <input
        onChange={(e) => changeValue(e.target.value)}
        value={value}
      ></input>
      <button onClick={() => updateBio()}>Update Bio</button>
      {/* <button onClick={writeData}>writedata</button> */}
      <button onClick={() => signOut({ redirect: "/signin" })}>Sign out</button>
    </div>
  );
}

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

export default User;
