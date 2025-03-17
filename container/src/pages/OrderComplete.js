import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import OrderPlaced from "../components/OrderPlaced";

const OrderComplete = () => {
  return (
    <>
      <Header />
      <OrderPlaced />
      <Footer />
    </>
  );
};

export default OrderComplete;
