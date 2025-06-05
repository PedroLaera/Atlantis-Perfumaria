import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App";

import axios from "axios";

const token = localStorage.getItem("token");
axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

export default createRoot;
