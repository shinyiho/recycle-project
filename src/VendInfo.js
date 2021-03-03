import React from "react";
import "./VendInfo.css";
import recycleIcon from "./1200px-Recycle001.svg.png";
const VendInfo = ({ address, city, name }) => {
  return (
    <div className="VendInfo">
      <img className="VendImg" src={recycleIcon}></img>
      <div className="Vendesc">
        <h2>Name:{name}</h2>
        <h2>Address:{address}</h2>
        <div>Neighborhood:{city}</div>
        <div>Hours:</div>
        <div>Detail:</div>
        <div>Link:</div>
      </div>
    </div>
  );
};

export default VendInfo;
