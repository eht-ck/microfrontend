import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";

import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
const Product = React.lazy(() => import("mf_product/Product"));

import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import AuthProvider from "./context/AuthContext";
import SignUp from "./pages/SignUp";

import UserModule from "./pages/UserModule";
import { Admin } from "./pages/Admin";
import Products from "./pages/Products";
import PdpPage from "./pages/PdpPage";
import CartPage from "./pages/CartPage"
import OrderComplete from "./pages/OrderComplete";
const App = () => (
  <>
    <AuthProvider>
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
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </>
);
const rootElement = document.getElementById("app");
if (!rootElement) throw new Error("Failed to find the root element");

const root = ReactDOM.createRoot(rootElement);

root.render(<App />);
