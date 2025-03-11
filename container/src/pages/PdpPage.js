import React from 'react'
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
  <Pdp/>
  <Product/>
    <Footer/>
    
    </>
  )
}

export default PdpPage