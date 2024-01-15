import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./Components/Navbar";
import Homepage from "./Components/Homepage";
function App() {
  return (
    <>
      <Navbar />
      <>
        <Homepage />
      </>
    </>
  );
}

export default App;
