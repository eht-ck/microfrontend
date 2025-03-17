import React, { Suspense, lazy } from "react";
import ErrorBoundary from "../components/ErrorBoundary";

const Cart = lazy(() => import("mf_purchase/Cart"));

import Header from "../components/Header";
import Footer from "../components/Footer";
const CartPage = () => {
  return (
    <>
      <Header />
      <ErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
          <Cart />
        </Suspense>
      </ErrorBoundary>
      <Footer />
    </>
  );
};

export default CartPage;
