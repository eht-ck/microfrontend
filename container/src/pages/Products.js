import React, { Suspense, lazy } from "react";
import ErrorBoundary from "../components/ErrorBoundary";

import Header from "../components/Header"
import Footer from "../components/Footer"
import AnnouncementBanner from '../components/AnnouncementBanner';
const ProductComp = React.lazy(() => import("mf_product/ProductComp"));
const Products = () => {
  return (
    <>
    <AnnouncementBanner/>
    <Header/>
    <ErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
         
    <ProductComp/>
    
      </Suspense>
    </ErrorBoundary>
    <Footer/>
</>
  )
}

export default Products