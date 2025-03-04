import React from "react";
import './HeroSection.css'; // Create this CSS file for custom styles
// import Image from "../assets/b1.jpg";  //IMAGE 1
// import Image2 from "../assets/bt_2.jpg"
import Image3 from "../../public/assets/hero_croped.JPG"
function HeroSection() {
  return (
    <div className="hero-section">
      <img src={Image3} alt="Hero" className="img-fluid" />
      <div className="overlay">
        <h1>TEATREATS</h1>
        <h2>Brewed Bliss in Every Cup</h2>
      </div>
    </div>
  );
}

export default HeroSection;