import React, {Suspense} from "react";
import ErrorBoundary from "../components/ErrorBoundary"; 

import Header from "../components/Header";
import Footer from "../components/Footer";
import AnnouncementBanner from "../components/AnnouncementBanner";
import "bootstrap/dist/css/bootstrap.min.css";

const Product = React.lazy(() => import("mf_product/Product"));
import HeroSection from "../components/HeroSection";
import About from "../components/About";
const Home = () => {
  return (
    <>
      <AnnouncementBanner />
      <Header />
      <HeroSection />
      <ErrorBoundary>
        <Suspense fallback={<div>Loading Products .....</div>}>
          <Product />
        </Suspense>
      </ErrorBoundary>
      <About />
      <Footer />
    </>
  );
};

export default Home;
