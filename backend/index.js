const Moralis = require("moralis").default;

const express = require("express");
const cors = require("cors");

const { EvmChain } = require("@moralisweb3/common-evm-utils");

const app = express();
const port = 3000;

// allow access to React app domain
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const MORALIS_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjM4NzFmYTU1LTQ2YzctNGZhMC1hYmM0LTI2MDc0YzNlMTU4ZiIsIm9yZ0lkIjoiMzcyMzgzIiwidXNlcklkIjoiMzgyNjk4IiwidHlwZUlkIjoiMzJhOTVkOTAtM2FkOS00MWE2LWIwMzktZDQ0ZGU3ZmI2M2QxIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MDUzMDkzMzYsImV4cCI6NDg2MTA2OTMzNn0.0kjRIyftwxEbNOap3ULP1YrgryrYEH81f4l8ExvP1u8";
const address = "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d";

app.get("/balances", async (req, res) => {
  try {
    // Promise.all() for receiving data async from two endpoints
    const [nativeBalance, tokenBalances] = await Promise.all([
      Moralis.EvmApi.balance.getNativeBalance({
        chain: EvmChain.ETHEREUM,
        address,
      }),
      Moralis.EvmApi.token.getWalletTokenBalances({
        chain: EvmChain.ETHEREUM,
        address,
      }),
    ]);
    res.status(200).json({
      // formatting the output
      address,
      nativeBalance: nativeBalance.result.balance.ether,
      tokenBalances: tokenBalances.result.map((token) => token.display()),
    });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500);
    res.json({ error: error.message });
  }
});

const startServer = async () => {
  await Moralis.start({
    apiKey: MORALIS_API_KEY,
  });

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};

startServer();