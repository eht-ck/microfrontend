import React from "react";
import ReactDOM from "react-dom/client";

// import './index.scss'
import Header  from "./components/Header";
import Footer  from "./components/Footer";
import AnnouncementBanner from "./components/AnnouncementBanner";
import 'bootstrap/dist/css/bootstrap.min.css';


import Product from "mf_product/Product"
import HeroSection from "./components/HeroSection";
import About from "./components/About";
const App = () => (
 <>
    <AnnouncementBanner/>
   <Header/>
  <HeroSection/>
<About/>
   {/* <div>
  <Product/>
   </div> */}
   <Footer/>

   </>
 );
const rootElement = document.getElementById("app")
if (!rootElement) throw new Error("Failed to find the root element")

const root = ReactDOM.createRoot(rootElement)

root.render(<App />)