import React, { useState, useEffect } from "react";
import "./SearchBar.css";
import SearchIcon from "@material-ui/icons/Search";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import Button from "@material-ui/core/Button";

const SearchBar = ({ onZipCodeChange, userGeoLocation }) => {
  const [zipcode, setZipcode] = useState("zipcode");
  const [image, setImage] = useState(null);
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  useEffect(() => {
    setZipcode(userGeoLocation.zipcode);
  }, [userGeoLocation]);

  return (
    <div className="SearchBar">
      <SearchIcon />
      <input type="text" placeholder="Items to discard, recycle, or .... "></input>
      <CameraAltIcon />
      <input type="text" onChange={(e) => setZipcode(e.target.value)} placeholder={zipcode}></input>
      <input type="file" placeholder="File chosen" onChange={handleChange}></input>
      <Button variant="contained" onClick={() => onZipCodeChange(zipcode)}>
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
