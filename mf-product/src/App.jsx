import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
// import Header  from "container/Header";
// import Footer  from "container/Footer";
const App = () => (
  <div className="container">
   {/* <Header/> */}
   <div>
    THIS IS THE PRODUCT BODY
   </div>
   {/* <Footer/> */}
  </div>
);
const rootElement = document.getElementById("app")
if (!rootElement) throw new Error("Failed to find the root element")

const root = ReactDOM.createRoot(rootElement)

root.render(<App />)