import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";

import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
 
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
 import SignUp from "./pages/SignUp";

import UserModule from "./pages/UserModule";
import { Admin } from "./pages/Admin";
import Products from "./pages/Products";
import PdpPage from "./pages/PdpPage";
import CartPage from "./pages/CartPage"
import OrderComplete from "./pages/OrderComplete";
import ContactUs from "./pages/ContactUs";
import AboutUs from "./pages/AboutUs";
const App = () => (
  <>
       <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="login" element={<SignIn />} />
          <Route path="signup" element={<SignUp/>} />
          <Route path="user"  element={<UserModule/>} />
          <Route path="admin" element= {<Admin/>} />
          <Route path="product" element = {<Products/>} />
          <Route path="cart" element ={<CartPage/>}/>
          <Route path="product/:id" element ={<PdpPage/>}/>
          <Route path="orderplaced" element ={<OrderComplete/>}/>
          <Route path="contact" element ={<ContactUs/>}/>
          <Route path= "aboutus" element = {<AboutUs/>}/>
        </Routes>
      </BrowserRouter>
   </>
);
const rootElement = document.getElementById("app");
if (!rootElement) throw new Error("Failed to find the root element");

const root = ReactDOM.createRoot(rootElement);

root.render(<App />);
