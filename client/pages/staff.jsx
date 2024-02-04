import { getSession, signOut } from "next-auth/react";
import connectDB from "../lib/connectDB";
import Users from "../lib/userSchema";
import { useState, useEffect } from "react";
import axios from "axios";
import abi from "../src/contracts/Staff.json";
import { ethers } from "ethers";
import { useConnect } from "wagmi";
import StaffContractAddress from "../../contractAddresses.json";
import {
  Section,
  Container,
  Grid,
  Box,
  Heading,
  Flex,
  Text,
  Button,
  Card,
} from "@radix-ui/themes";
import * as Form from "@radix-ui/react-form";
import styles from "./css/staff.module.css";
import NavigationMenuDemo from "../components/nav";

function Staff({ user, bio }) {
  //Student Contract Instance and wallet instamce

  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [account, setAccount] = useState("None");
  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = StaffContractAddress.StaffAddress;
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

  const confirmSchlorsip = async (event) => {
    event.preventDefault();
    const { contract } = state;
    const ID = document.querySelector("#ID").value;
    const Attendance = document.querySelector("#Atn").value;
    const AvgMarks = document.querySelector("#AvgMarks").value;
    console.log(ID, Attendance, AvgMarks);
    const tx = await contract.resultNpay(ID, Attendance, AvgMarks);
    await tx.wait();
  };

  return (
    <div>
      <NavigationMenuDemo />
      <Section>
        <Container>
          <Flex direction="row" justify="between">
            <Flex>
              <Card size="5">
                <Flex direction="column">
                  <Heading>Initiate Scholarship</Heading>
                  <Form.Root
                    className={styles.FormRoot}
                    onSubmit={confirmSchlorsip}
                  >
                    <Form.Field className={styles.FormField} name="Roll Number">
                      <div
                        style={{
                          display: "flex",
                          alignItems: "baseline",
                          justifyContent: "space-between",
                        }}
                      >
                        <Form.Label className={styles.FormLabel}>
                          Student Roll Number
                        </Form.Label>
                        <Form.Message
                          className={styles.FormMessage}
                          match="valueMissing"
                        >
                          Please Enter Roll Number
                        </Form.Message>
                      </div>
                      <Form.Control asChild>
                        <input
                          className={styles.Input}
                          type="number"
                          required
                          id="ID"
                        />
                      </Form.Control>
                    </Form.Field>

                    <Form.Field className={styles.FormField} name="Attendance">
                      <div
                        style={{
                          display: "flex",
                          alignItems: "baseline",
                          justifyContent: "space-between",
                        }}
                      >
                        <Form.Label className={styles.FormLabel}>
                          Student's Attendance
                        </Form.Label>
                        <Form.Message
                          className={styles.FormMessage}
                          match="valueMissing"
                        >
                          Please Enter Required Attendance
                        </Form.Message>
                      </div>
                      <Form.Control asChild>
                        <input
                          className={styles.Input}
                          type="Number"
                          required
                          id="Atn"
                        />
                      </Form.Control>
                    </Form.Field>
                    <Form.Field className={styles.FormField} name="CGPA">
                      <div
                        style={{
                          display: "flex",
                          alignItems: "baseline",
                          justifyContent: "space-between",
                        }}
                      >
                        <Form.Label className={styles.FormLabel}>
                          Student's CGPA
                        </Form.Label>
                        <Form.Message
                          className={styles.FormMessage}
                          match="valueMissing"
                        >
                          Please Enter a Value
                        </Form.Message>
                      </div>
                      <Form.Control asChild>
                        <input
                          className={styles.Input}
                          type="number"
                          required
                          id="AvgMarks"
                        />
                      </Form.Control>
                    </Form.Field>
                    <Form.Submit asChild>
                      <Button> Verify And Send</Button>
                    </Form.Submit>
                  </Form.Root>
                </Flex>
              </Card>
            </Flex>
            <Flex direction="column" gap="3">
              <Card>
                <Text as="div" size="2" weight="bold">
                  Your Wallet Address
                </Text>
                <Text as="div" color="gray" size="2">
                  {user.address}
                </Text>
              </Card>
              <Card>
                <Text as="div" size="2" weight="bold">
                  Your Information
                </Text>
                <Text as="div" color="gray" size="2">
                  {bio}
                </Text>
              </Card>

              <Button onClick={() => signOut({ redirect: "/signin" })}>
                Logout
              </Button>
            </Flex>
          </Flex>
        </Container>
      </Section>
      {/* <h4>User session:</h4>
      <div>bio: {bio}</div>
      <div>Address: {user.address}</div>
      <br />
      <form onSubmit={confirmSchlorsip}>
        <label>Roll No</label>
        <input type="number" id="ID" placeholder="Roll"></input>
        <label>Attendance</label>
        <input type="number" id="Atn" placeholder="Attendance"></input>
        <label>Average marks</label>
        <input type="number" id="AvgMarks" placeholder="Average Marks"></input>
        <button type="submit">Confirm Scholarship</button>
      </form> */}
      {/* <input
        onChange={(e) => changeValue(e.target.value)}
        value={value}
      ></input>
      <button onClick={() => updateBio()}>Update Bio</button> */}
      {/* <button onClick={() => signOut({ redirect: "/signin" })}>Sign out</button> */}
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

export default Staff;
