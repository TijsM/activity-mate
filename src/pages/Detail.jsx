import React from "react";
import { useLocation } from "react-router-dom";

function Detail() {
  const location = useLocation();
  console.log("locatin", location);
  return <div>detialpage</div>;
}

export default Detail;
