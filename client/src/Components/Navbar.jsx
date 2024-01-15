import React, { useState } from "react";
import { Section, Container, Flex, Box, Button } from "@radix-ui/themes";
import { ethers } from "ethers";

function Navbar() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [account, setAccount] = useState("");

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        // Request account access
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
        setWalletConnected(true);
      } catch (error) {
        console.error("Failed to connect to MetaMask");
      }
    } else {
      console.log("Please install MetaMask!");
    }
  };
  return (
    <Section size="1">
      <Container>
        <Flex justify="between">
          <Flex>
            <Box>Home</Box>
            <Box>Home</Box>
          </Flex>
          <Flex>
            <Box>Home</Box>
            <Box>Home</Box>
            <Box>Home</Box>
            <Box>Home</Box>
          </Flex>
          {!walletConnected ? (
            <Button variant="outline" radius="full" onClick={connectWallet}>
              Connect Wallet
            </Button>
          ) : (
            <Button variant="outline" radius="full" onClick={connectWallet}>
              Connected Account: {account}{" "}
            </Button>
          )}
        </Flex>
      </Container>
    </Section>
  );
}

export default Navbar;
