import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import Cart from "./components/Cart";

const App = () => (
  <div className="container">
    <Cart/>
    hii
  </div>
);
const rootElement = document.getElementById("app")
if (!rootElement) throw new Error("Failed to find the root element")

const root = ReactDOM.createRoot(rootElement)

root.render(<App />)