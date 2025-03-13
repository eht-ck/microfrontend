import React, { Suspense, lazy } from "react";
import ErrorBoundary from "../components/ErrorBoundary";
import Header from '../components/Header'
import Footer from '../components/Footer'
import AnnouncementBanner from '../components/AnnouncementBanner';
import Product from 'mf_product/Product';
const Pdp = React.lazy(() => import("mf_product/PDP"));
const PdpPage = () => {
    
  return (
    <>
    <AnnouncementBanner/>
    <Header/>
  <ErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        
  <Pdp/>
  
      </Suspense>
    </ErrorBoundary>
  <Product/>
    <Footer/>
    
    </>
  )
}

export default PdpPage