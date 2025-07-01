// import { RecoilRoot } from "recoil";

import React from "react";

import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RecoilRoot } from "recoil";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <RecoilRoot>
    <ToastContainer />

    <App />
  </RecoilRoot>
);
