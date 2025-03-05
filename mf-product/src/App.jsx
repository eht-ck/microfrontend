import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import Product from "./component/Product";
// import Header  from "container/Header";
// import Footer  from "container/Footer";
const App = () => (
  
  <Product/>
  
);
const rootElement = document.getElementById("app")
if (!rootElement) throw new Error("Failed to find the root element")

const root = ReactDOM.createRoot(rootElement)

root.render(<App />)