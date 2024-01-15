import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Balances from "./balances";
import "./App.css";
import Navbar from "./Components/Navbar";
import Homepage from "./Components/Homepage";
import { initializeApp } from "firebase/app";
import { getMoralisAuth } from "@moralisweb3/client-firebase-auth-utils";
import { signInWithMoralis } from "@moralisweb3/client-firebase-evm-auth";
import { getAuth } from "@firebase/auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/balances",
    element: <Balances />,
  },
]);

function App() {
  return (
    <>
      <Navbar />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
