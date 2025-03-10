import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import Cart from "./components/Cart";
import UserOrderHistory from "./components/UserOrderHistory";
import 'bootstrap/dist/css/bootstrap.min.css';
 
const App = () => (
  <div className="container">
     hii
  </div>
);
const rootElement = document.getElementById("app")
if (!rootElement) throw new Error("Failed to find the root element")

const root = ReactDOM.createRoot(rootElement)

root.render(<App />)