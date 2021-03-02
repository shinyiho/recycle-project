import React, { useState, useEffect } from "react";
// import Infobox from "./Infobox";
// import Linegraph from "./Linegraph";
import Map from "./Map";
import Header from "./Header";
import SearchBar from "./SearchBar";
// import Table from "./Table";
import "./App.css";
import "leaflet/dist/leaflet.css";

function App() {
  // let apikey = "76d30b7fd0f748dbabb17f83320b67ca";
  const [rawData, setRawData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("Items to discard, recycle, or .... ");
  const [userGeoLocation, setUserGeoLocation] = useState({});
  const [vendor, setVendor] = useState([
    {
      address: "287 Halleck St",
      bbl: "2027770420.0",
      bin: "2102044",
      boro: "2",
      borocd: "202",
      city: "Bronx",
      c_and_d: false,
      districtcode: "BX02",
      fid: "333",
      globalid: "{6F008530-8E26-4159-9469-B252737277B3}",
      label: "Metropolitan",
      mgp: false,
      name: "Metropolitan Transfer Station",
      organics: true,
      paper: false,
      refuse: false,
      state: "NY",
      zip: "10474",
      point: {
        type: "Point",
        coordinates: [-73.87986700999994, 40.806577968000056],
      },
      ":@computed_region_efsh_h5xi": "12343",
      ":@computed_region_f5dn_yrer": "8",
      ":@computed_region_yeji_bk3q": "5",
      ":@computed_region_92fq_4b7q": "43",
      ":@computed_region_sbqj_enih": "24",
    },
  ]);
  const [mapData, setmapData] = useState([[9, [40.806577968000056, -73.87986700999994]]]);
  let setsearchterm = (term) => {
    setSearchTerm(term);
  };
  useEffect(() => {
    let fetchingDataFromNYOD = () => {
      fetch("https://data.cityofnewyork.us/resource/mf9g-zhbw.json")
        .then((response) => response.json())
        .then((data) => {
          setRawData(data);
        });
    };

    let getUserLocation = () => {
      function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        fetch(
          `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=76d30b7fd0f748dbabb17f83320b67ca`
        )
          .then((response) => response.json())
          .then((data) => {
            setUserGeoLocation({
              latitude,
              longitude,
              address: data.results[0].formatted,
              zipcode: data.results[0].components.postcode,
            });
          });
      }
      function error() {
        console.log("Unable to retrieve your location");
      }

      navigator.geolocation.watchPosition(success, error);
    };
    fetchingDataFromNYOD();
    getUserLocation();
  }, []);

  const onZipCodeChange = (zipcode) => {
    //目前查不到都是回到Metropolitan Transfer Station
    //default的map資訊（default vendor default mapData）還沒決定

    setVendor([
      {
        address: "287 Halleck St",
        bbl: "2027770420.0",
        bin: "2102044",
        boro: "2",
        borocd: "202",
        city: "Bronx",
        c_and_d: false,
        districtcode: "BX02",
        fid: "333",
        globalid: "{6F008530-8E26-4159-9469-B252737277B3}",
        label: "Metropolitan",
        mgp: false,
        name: "Metropolitan Transfer Station",
        organics: true,
        paper: false,
        refuse: false,
        state: "NY",
        zip: "10474",
        point: {
          type: "Point",
          coordinates: [-73.87986700999994, 40.806577968000056],
        },
        ":@computed_region_efsh_h5xi": "12343",
        ":@computed_region_f5dn_yrer": "8",
        ":@computed_region_yeji_bk3q": "5",
        ":@computed_region_92fq_4b7q": "43",
        ":@computed_region_sbqj_enih": "24",
      },
    ]);
    setmapData([[9, [40.806577968000056, -73.87986700999994]]]);
    //default的map資訊（default vendor default mapData）還沒決定
    //find corresponding zipcode first
    let vs = rawData.filter((ob) => ob.zip === zipcode);
    let vendorchosen = [];
    let mapDatachosen = [];
    let zoomsize = 15;
    vs.forEach((v) => {
      //check corresponding searchterm if there is one
      if (v[searchTerm] === true || searchTerm === "Items to discard, recycle, or .... " || searchTerm === "") {
        vendorchosen.push(v);
        mapDatachosen.push([zoomsize - vs.length / 2, [v.point.coordinates[1], v.point.coordinates[0]]]);
      }
      //if nothing found set back to default
      vendorchosen.length === 0
        ? setVendor([
            {
              address: "287 Halleck St",
              bbl: "2027770420.0",
              bin: "2102044",
              boro: "2",
              borocd: "202",
              city: "Bronx",
              c_and_d: false,
              districtcode: "BX02",
              fid: "333",
              globalid: "{6F008530-8E26-4159-9469-B252737277B3}",
              label: "Metropolitan",
              mgp: false,
              name: "Metropolitan Transfer Station",
              organics: true,
              paper: false,
              refuse: false,
              state: "NY",
              zip: "10474",
              point: {
                type: "Point",
                coordinates: [-73.87986700999994, 40.806577968000056],
              },
              ":@computed_region_efsh_h5xi": "12343",
              ":@computed_region_f5dn_yrer": "8",
              ":@computed_region_yeji_bk3q": "5",
              ":@computed_region_92fq_4b7q": "43",
              ":@computed_region_sbqj_enih": "24",
            },
          ])
        : setVendor(vendorchosen);
      //if nothing found set back to default
      mapDatachosen.length === 0
        ? setmapData([[9, [40.806577968000056, -73.87986700999994]]])
        : setmapData(mapDatachosen);
    });
  };

  return (
    <div className="App">
      <Header />
      <h1>Wher to & to Where</h1>
      <SearchBar
        setsearchterm={setsearchterm}
        searchTerm={searchTerm}
        onZipCodeChange={onZipCodeChange}
        userGeoLocation={userGeoLocation}
      />
      <div className="map">
        <div className="map-left">
          <h1>search result</h1>
        </div>
        <div className="map-right">
          <Map vendor={vendor} mapData={mapData} />
        </div>
      </div>
    </div>
  );
}

export default App;
