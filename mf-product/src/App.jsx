import React from "react";
import ReactDOM from "react-dom/client";
import 'bootstrap/dist/css/bootstrap.min.css';

import "./index.css";
import Product from "./component/Product";
import Products from "./component/ProductComp";
import ProductUpdate from "./component/ProductUpdate";
// import Header  from "container/Header";
// import Footer  from "container/Footer";
const App = () => (
  // <Products/>
  <ProductUpdate/>
  
);
const rootElement = document.getElementById("app")
if (!rootElement) throw new Error("Failed to find the root element")

const root = ReactDOM.createRoot(rootElement)

root.render(<App />)