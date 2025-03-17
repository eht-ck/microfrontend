import React from "react";
import { Alert } from "react-bootstrap";
import "../index.css";
import "./AnnouncementBanner.css";

const AnnouncementBanner = () => {
  return (
    <Alert
      variant=""
      className="text-center pt-1 pb-1  mb-0 text-white custom-alert "
    >
      🚀🚀 FLAT 10% OFF ON GIFT SETS!!
    </Alert>
  );
};

export default AnnouncementBanner;
