import React, { useState, useEffect } from "react";
import "./SearchBar.css";
import SearchIcon from "@material-ui/icons/Search";
import ImageAI from "./ImageAI";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import Button from "@material-ui/core/Button";

const SearchBar = ({ onZipCodeChange, userGeoLocation, setsearchterm, searchTerm }) => {
  const [zipcode, setZipcode] = useState("zipcode");
  const [openImageAI, setopenImageAI] = useState(false);

  // const [searchTerm, setSearchTerm] = useState("");
  // const [image, setImage] = useState(null);
  // const handleChange = (e) => {
  //   if (e.target.files[0]) {
  //     setImage(e.target.files[0]);
  //   }
  // };

  useEffect(() => {
    if (zipcode === "zipcode" || zipcode === undefined) {
      setZipcode(userGeoLocation.zipcode);
    }
  }, [userGeoLocation]);

  return (
    <div className="SearchBar">
      <SearchIcon />
      <input type="text" onChange={(e) => setsearchterm(e.target.value)} placeholder={searchTerm}></input>
      <CameraAltIcon
        onClick={() => {
          setopenImageAI(true);
        }}
      />
      {openImageAI ? <ImageAI setsearchterm={setsearchterm} /> : <div></div>}

      <input type="text" onChange={(e) => setZipcode(e.target.value)} placeholder={zipcode}></input>
      {/* <input type="file" placeholder="File chosen" onChange={handleChange}></input> */}
      <Button
        variant="contained"
        onClick={() => {
          setopenImageAI(false);
          onZipCodeChange(zipcode);

          // class="leaflet-popup  leaflet-zoom-animated"
          // style="opacity:0"
        }}
      >
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
