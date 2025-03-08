import React from 'react'
import Header from "../components/Header"
import Footer from "../components/Footer"
import AnnouncementBanner from '../components/AnnouncementBanner';
const ProductComp = React.lazy(() => import("mf_product/ProductComp"));
const Products = () => {
  return (
    <>
    <AnnouncementBanner/>
    <Header/>
    <ProductComp/>
    <Footer/>
</>
  )
}

export default Products