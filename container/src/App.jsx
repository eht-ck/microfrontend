import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";

import "bootstrap/dist/css/bootstrap.min.css";
import Home  from "./pages/Home";
const Product = React.lazy(() => import("mf_product/Product"));

import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => (
  <>
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
      </Routes>
    </BrowserRouter>
  </>
);
const rootElement = document.getElementById("app");
if (!rootElement) throw new Error("Failed to find the root element");

const root = ReactDOM.createRoot(rootElement);

root.render(<App />);
