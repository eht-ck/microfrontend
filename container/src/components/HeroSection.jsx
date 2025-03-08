import React, { useEffect, useState } from "react";
import "./HeroSection.css"; // Custom styles for animation
import Image3 from "../../public/assets/hero_croped.JPG";

function HeroSection() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAnimate(true);
    }, 300);  
  }, []);

  return (
    <div className="position-relative text-center bg-dark min-vh-100 overflow-hidden">
     <div className="position-absolute w-100 h-100 bg-dark opacity-50"></div>
  
     <img
      src={Image3}
      alt="Hero"
      className="img-fluid w-100 h-100 object-fit-cover"
    />
  
     <div className="position-absolute top-50 start-50 translate-middle text-white text-center">
      <h1 className="display-3 fw-bold text-uppercase fade-in">TEATREATS</h1>
      <p className="fs-4 fade-in delay-1">Brewed Bliss in Every Cup</p>
      <a href={`/product`} className="text-decoration-none">

      <button className="btn btn-light btn-lg mt-3 fw-semibold px-4 py-2 fade-in delay-2"  >
        Shop Now
      </button>
      </a>
    </div>
  </div>
  
  );
}

export default HeroSection;
