import { getSession, signOut } from "next-auth/react";
import connectDB from "../lib/connectDB";
import Users from "../lib/userSchema";
import { useState, useEffect } from "react";
import axios from "axios";
import abi from "../src/contracts/ScholarDetails.json";
import stuabi from "../src/contracts/StuDetails.json";
import { ethers } from "ethers";
import DisContractAddress from "../../contractAddresses.json";

import {
  Section,
  Container,
  Flex,
  Button,
  Heading,
  Card,
  Text,
} from "@radix-ui/themes";
import * as Form from "@radix-ui/react-form";
import styles from "./css/distributor.module.css";
import NavigationMenuDemo from "../components/nav";
import { Table } from "@radix-ui/themes";
import { get, set } from "mongoose";

function Distributor({ user, bio }) {
  const DistributorContractAddress = DisContractAddress.ScholarshipAddress;
  const StudentContractAddress = DisContractAddress.StudentAddress;
  const [contractBalance, setContractBalance] = useState(0);
  //Student Contract Instance and wallet instamce

  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  // const [table, setTable] = useState({
  //   stuID: null,
  //   stuFirstName: null,
  //   stuLastName: null,
  // });
  const [stustate, setstuState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [account, setAccount] = useState("None");
  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = DistributorContractAddress;
      const studentContractAddress = StudentContractAddress;
      const contractABI = abi.abi;
      const studentABI = stuabi.abi;
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
          const stuContract = new ethers.Contract(
            studentContractAddress,
            studentABI,
            signer
          );
          setAccount(account);
          setState({ provider, signer, contract });
          setstuState({ provider, signer, stuContract });
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

  const getContractBalance = async (event) => {
    // event.preventDefault();
    const { contract } = state;
    const balance = await contract.getSchlRemaining();
    const convert = balance.toString();
    setContractBalance(convert);
    console.log(balance);
  };
  // useEffect(() => {}, [contractBalance]);

  var detailStorage = new Array();
  const [array, setArray] = useState([[0, " ", " "]]);

  const getStuDetails = async (event) => {
    const { stuContract } = stustate;
    for (var i = 1; i < 999; i++) {
      const details = await stuContract.getStuDetails(i);
      const ID = details[0];
      const idConverted = ID.toString();
      const firstName = details[1];
      const lastName = details[2];
      if (details[3] === "0x0000000000000000000000000000000000000000") {
        break;
      }
      const detailsArray = [idConverted, firstName, lastName];
      detailStorage[i] = detailsArray;
      // console.log(details);
    }
    setArray(detailStorage);
    console.log("Use State Array");
    console.log(array);
    console.log("Detail Storage");
    console.log(detailStorage);
    // console.log(detailStorage);
  };

  return (
    <div>
      <div className={styles.outlay1}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="402"
          height="342"
          viewBox="0 0 402 342"
          fill="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M246.183 -104.329C312.639 -116.256 371.52 -62.0773 418.718 -13.7965C465.269 33.8225 509.63 92.4428 503.349 158.738C497.371 221.846 441.486 266.079 388.857 301.412C346.913 329.57 296.568 327.713 246.183 331.386C189.06 335.551 127.863 356.88 81.0708 323.851C29.1946 287.233 -8.32216 221.457 1.5951 158.738C10.9568 99.5328 85.3425 82.6114 126.157 38.7128C170.216 -8.67467 182.496 -92.898 246.183 -104.329Z"
            fill="#EC9455"
          />
        </svg>
      </div>
      <div className={styles.outlay2}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="422"
          height="389"
          viewBox="0 0 422 389"
          fill="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M205.374 8.7358C261.752 10.383 323.63 -4.11215 366.368 32.694C410.935 71.0758 425.47 135.114 420.133 193.688C415.212 247.692 379.683 291.403 339.479 327.793C301.705 361.983 256.206 384.623 205.374 388.072C150.424 391.8 91.4587 385.477 51.7483 347.313C11.4882 308.621 6.04585 249.45 3.1127 193.688C-0.0469032 133.622 -9.70002 63.5939 34.6891 23.0034C78.4897 -17.0489 146.047 7.00245 205.374 8.7358Z"
            fill="#EC9455"
          />
        </svg>
      </div>
      <div className={styles.outlay3}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="763"
          height="616"
          viewBox="0 0 763 616"
          fill="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M467.006 132.596C583.471 80.0015 685.35 -14.6835 812.005 2.3109C960.633 22.2536 1115.18 93.659 1181.01 228.4C1246.57 362.608 1189.14 518.749 1131.66 656.613C1079.22 782.362 998.913 894.871 877.418 956.524C755.024 1018.63 617.337 1011.37 482.441 986.056C317.591 955.124 116.62 945.835 36.1559 798.67C-45.1052 650.048 24.3375 458.696 116.336 316.471C190.857 201.265 341.959 189.067 467.006 132.596Z"
            fill="#EC9455"
          />
        </svg>
      </div>
      <div className={styles.outlay4}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="297"
          height="214"
          viewBox="0 0 297 214"
          fill="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M61.3073 -30.9416C88.2219 -53.5969 123.623 -58.6072 158.797 -59.2766C190.998 -59.8894 224.821 -56.4651 248.377 -34.5015C271.085 -13.3285 270.217 20.1534 276.577 50.5425C284.477 88.2891 308.691 127.757 289.316 161.101C268.574 196.8 223.355 211.04 182.12 213.108C142.251 215.109 106.28 196.102 74.5541 171.875C40.7509 146.062 2.99212 116.646 0.220078 74.2049C-2.5263 32.1562 29.0695 -3.80563 61.3073 -30.9416Z"
            fill="#EC9455"
          />
        </svg>
      </div>
      <NavigationMenuDemo />
      <Section>
        <Container>
          <Flex direction="row" justify="between">
            <Card size="5">
              <Flex direction="column">
                <Heading>Initiate Scholarship</Heading>
                <Form.Root className={styles.FormRoot} onSubmit={addSchlRec}>
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
                  <Form.Field className={styles.FormField} name="SSName">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        justifyContent: "space-between",
                      }}
                    >
                      <Form.Label className={styles.FormLabel}>
                        Scholarship Name
                      </Form.Label>
                      <Form.Message
                        className={styles.FormMessage}
                        match="valueMissing"
                      >
                        Please Enter Scholarship Name
                      </Form.Message>
                    </div>
                    <Form.Control asChild>
                      <input
                        className={styles.Input}
                        type="Text"
                        required
                        id="SSName"
                      />
                    </Form.Control>
                  </Form.Field>
                  <Form.Field className={styles.FormField} name="Amt">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        justifyContent: "space-between",
                      }}
                    >
                      <Form.Label className={styles.FormLabel}>
                        Amount To Send
                      </Form.Label>
                      <Form.Message
                        className={styles.FormMessage}
                        match="valueMissing"
                      >
                        Please Enter Required Amount
                      </Form.Message>
                    </div>
                    <Form.Control asChild>
                      <input
                        className={styles.Input}
                        type="number"
                        required
                        id="SSAmt"
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
                        Required Attendance
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
                        Required CGPA
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
                    <Button> Send For Verification</Button>
                  </Form.Submit>
                </Form.Root>
              </Flex>
            </Card>

            <Flex direction="column" gap="3">
              <Flex direction="row" gap="3">
                <Flex direction="column" gap="3" justify="center">
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
                  <Card>
                    <Text as="div" size="2" weight="bold">
                      Remaining Scholarship
                    </Text>
                    <Text as="div" color="gray" size="2">
                      {contractBalance} Wei
                    </Text>
                  </Card>
                </Flex>
                <Card>
                  <Table.Root>
                    <Table.Header>
                      <Table.Row>
                        <Table.ColumnHeaderCell>
                          Student ID
                        </Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>
                          First Name
                        </Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>
                          Last Name
                        </Table.ColumnHeaderCell>
                      </Table.Row>
                    </Table.Header>

                    <Table.Body>
                      {/* Mapping each student detail to a table row */}
                      {array.map((stuDetail, index) => (
                        <Table.Row key={index}>
                          <Table.RowHeaderCell>
                            {stuDetail[0]}
                          </Table.RowHeaderCell>
                          <Table.Cell>{stuDetail[1]}</Table.Cell>
                          <Table.Cell>{stuDetail[2]}</Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table.Root>
                </Card>
              </Flex>
              <Button
                onClick={() => {
                  getContractBalance();
                  getStuDetails();
                }}
              >
                Get Info
              </Button>
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

      <button onClick={() => signOut({ redirect: "/signin" })}>Sign out</button> */}
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
