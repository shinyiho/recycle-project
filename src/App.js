import React, { useState, useEffect } from "react";
// import Infobox from "./Infobox";
// import Linegraph from "./Linegraph";
import Map from "./Map";
import Header from "./Header";
import SearchBar from "./SearchBar";
import VendInfo from "./VendInfo";
// import Table from "./Table";
import "./App.css";
import "leaflet/dist/leaflet.css";

function App() {
  // let apikey = "76d30b7fd0f748dbabb17f83320b67ca";
  const [rawData, setRawData] = useState([]);

  const [userGeoLocation, setUserGeoLocation] = useState({});
  const [vWithItem, setVWithItem] = useState([]);
  const [vendor, setVendor] = useState([
    {
      address: "",
      point: {
        type: "Point",
        coordinates: [-73.87986700999994, 40.806577968000056],
      },
    },
  ]);
  const [mapData, setmapData] = useState([[9, [40.806577968000056, -73.87986700999994]]]);

  useEffect(() => {
    let fetchingDataFromNYOD = () => {
      fetch("https://data.cityofnewyork.us/resource/mf9g-zhbw.json")
        .then((response) => response.json())
        .then((data) => {
          setRawData(data);
          setVWithItem(data);
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
  // let getzipcodedistance = (fromzip, tozip) => {
  //   fetch(
  //     `https://www.zipcodeapi.com/rest/5iWGPCYrB2Aa1WJ0p8YlQST7ASttgI5xmLbQjtly2FalSfuwvJjKPAjMKtQBugRl/distance.json/${fromzip}/${tozip}/km`
  //   )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data.distance);
  //     });
  // };

  const searchBtn = (zipcode, searchTerm) => {
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

    let vs, vz;
    if (searchTerm && searchTerm !== "Items to discard, recycle, or .... ") {
      vs = rawData.filter((ob) => ob[searchTerm] === true);
    } else {
      vs = rawData;
    }

    if (zipcode) {
      vz = vs.filter((ob) => ob.zip === zipcode);
    } else {
      vz = vs;
    }

    setVWithItem(vs);
    let vzmapdata = vz.map((ob) => [10, [ob.point.coordinates[1], ob.point.coordinates[0]]]);

    //if nothing found set back to default
    vz.length === 0
      ? setVendor([
          {
            address: "",
            point: {
              type: "Point",
              coordinates: [-73.87986700999994, 40.806577968000056],
            },
          },
        ])
      : setVendor(vz);
    //if nothing found set back to default
    vz.length === 0 ? setmapData([[9, [40.806577968000056, -73.87986700999994]]]) : setmapData(vzmapdata);
  };

  return (
    <div className="App">
      <Header />
      <h1>Wher to & to Where</h1>
      <SearchBar
        // setsearchterm={setsearchterm}
        // searchTerm={searchTerm}
        searchBtn={searchBtn}
        userGeoLocation={userGeoLocation}
      />
      <div className="map">
        <div className="map-left">
          {vWithItem.map((v, i) => (
            <VendInfo key={i} address={v.address} city={v.city} name={v.name} />
          ))}
        </div>
        <div className="map-right">
          <Map vendor={vendor} mapData={mapData} />
        </div>
      </div>
    </div>
  );
}

export default App;
