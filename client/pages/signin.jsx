import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { signIn } from "next-auth/react";
import { useAccount, useConnect, useSignMessage, useDisconnect } from "wagmi";
import { useRouter } from "next/router";
import { useAuthRequestChallengeEvm } from "@moralisweb3/next";
import {
  Card,
  Flex,
  Button,
  Section,
  Container,
  Heading,
  Text,
  Avatar,
  AspectRatio,
  Link,
} from "@radix-ui/themes";
import styles from "./css/index.module.css";
import NavigationMenuDemo from "../components/nav";
import Image from "next/image";
import MetamaskImg from "../public/Metamask.svg";
import SigninImg from "../public/Signin.png";

function SignIn() {
  const { connectAsync } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const { isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { requestChallengeAsync } = useAuthRequestChallengeEvm();
  const { push } = useRouter();

  const handleAuthStudent = async () => {
    if (isConnected) {
      await disconnectAsync();
    }

    const { account, chain } = await connectAsync({
      connector: new MetaMaskConnector(),
    });

    const { message } = await requestChallengeAsync({
      address: account,
      chainId: chain.id,
    });

    const signature = await signMessageAsync({ message });

    // redirect user after success authentication to '/user' page
    const { url } = await signIn("moralis-auth", {
      message,
      signature,
      redirect: false,
      callbackUrl: "/student",
    });
    /**
     * instead of using signIn(..., redirect: "/student")
     * we get the url from callback and push it to the router to avoid page refreshing
     */
    push(url);
  };

  const handleAuthStaff = async () => {
    if (isConnected) {
      await disconnectAsync();
    }

    const { account, chain } = await connectAsync({
      connector: new MetaMaskConnector(),
    });

    const { message } = await requestChallengeAsync({
      address: account,
      chainId: chain.id,
    });

    const signature = await signMessageAsync({ message });

    // redirect user after success authentication to '/user' page
    const { url } = await signIn("moralis-auth", {
      message,
      signature,
      redirect: false,
      callbackUrl: "/staff",
    });
    /**
     * instead of using signIn(..., redirect: "/staff")
     * we get the url from callback and push it to the router to avoid page refreshing
     */
    push(url);
  };
  const handleAuthDistributor = async () => {
    if (isConnected) {
      await disconnectAsync();
    }

    const { account, chain } = await connectAsync({
      connector: new MetaMaskConnector(),
    });

    const { message } = await requestChallengeAsync({
      address: account,
      chainId: chain.id,
    });

    const signature = await signMessageAsync({ message });

    // redirect user after success authentication to '/user' page
    const { url } = await signIn("moralis-auth", {
      message,
      signature,
      redirect: false,
      callbackUrl: "/ssDistributor",
    });
    /**
     * instead of using signIn(..., redirect: "/ssDistributor")
     * we get the url from callback and push it to the router to avoid page refreshing
     */
    push(url);
  };

  return (
    <div className={styles.main}>
      <NavigationMenuDemo></NavigationMenuDemo>
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
      <Section size="3" className={styles.section}>
        <Container size="4" className={styles.container}>
          <Flex
            display="flex"
            align="center"
            justify="between"
            className={styles.flex1}
          >
            <Card size="5">
              <Flex display="flex" direction="column" gap="8">
                <Flex gap="2" direction="column">
                  <Flex gap="1" direction="row" align="center">
                    <Heading size="8" align="center">
                      Authenticate
                    </Heading>{" "}
                    <Image
                      src={MetamaskImg}
                      alt="Met Logo"
                      style={{
                        objectFit: "cover",
                        width: "15%",
                        height: "15%",
                        borderRadius: "var(--radius-2)",
                      }}
                    />
                  </Flex>
                  <Text>Aunthenticate yourself using Metamask</Text>
                </Flex>
                <Flex gap="4" direction="column">
                  <Button
                    size="3"
                    style={{ maxWidth: "360px" }}
                    variant="outline"
                    onClick={handleAuthStudent}
                  >
                    I am a Student{" "}
                  </Button>
                  <Button
                    size="3"
                    style={{ maxWidth: "360px" }}
                    variant="outline"
                    onClick={handleAuthStaff}
                  >
                    I am a Record Verifier{" "}
                  </Button>
                  <Button
                    size="3"
                    style={{ maxWidth: "360px" }}
                    variant="outline"
                    onClick={handleAuthDistributor}
                  >
                    I am a Distributor{" "}
                  </Button>
                </Flex>
                <Link
                  color="gray"
                  size="2"
                  href="https://metamask.io/download/"
                >
                  No Metamask Wallet?
                </Link>
              </Flex>
            </Card>
            <Flex display="flex" direction="column" gap="8">
              <Image src={SigninImg} alt="Image"></Image>
            </Flex>
          </Flex>
        </Container>
      </Section>
    </div>
  );
}

export default SignIn;
