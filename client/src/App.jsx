import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Balances from "./balances";

import "./App.css";
import Navbar from "./Components/Navbar";
import Homepage from "./Components/Homepage";

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
