import React, { useState, useEffect } from "react";
import "./SearchBar.css";
import SearchIcon from "@material-ui/icons/Search";
import ImageAI from "./ImageAI";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import Button from "@material-ui/core/Button";

const SearchBar = ({ searchBtn, userGeoLocation }) => {
  const [zipcode, setZipcode] = useState("zipcode");
  const [searchTerm, setSearchTerm] = useState("Items to discard, recycle, or .... ");
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
  let setsearchterm = (term) => {
    setSearchTerm(term);
  };
  return (
    <div className="SearchBar">
      <SearchIcon />
      <input type="text" onChange={(e) => setSearchTerm(e.target.value)} placeholder={searchTerm}></input>
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
          searchBtn(zipcode, searchTerm);

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
