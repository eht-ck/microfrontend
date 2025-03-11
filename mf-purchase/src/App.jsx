import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import Cart from "./components/Cart";
import UserOrderHistory from "./components/UserOrderHistory";
import 'bootstrap/dist/css/bootstrap.min.css';
import AllOrderHistory from "./components/AllOrderHistory";
 
const App = () => (
  <div className="container">
     <AllOrderHistory/>
  </div>
);
const rootElement = document.getElementById("app")
if (!rootElement) throw new Error("Failed to find the root element")

const root = ReactDOM.createRoot(rootElement)

root.render(<App />)