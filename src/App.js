import React, { useState, useEffect } from "react";
import Infobox from "./Infobox";
// import Linegraph from "./Linegraph";
import Map from "./Map";
// import Table from "./Table";
import "./App.css";
import "leaflet/dist/leaflet.css";
// import { v4 as uuidv4 } from "uuid";
import { Select, MenuItem, FormControl, CardContent, Card } from "@material-ui/core";

function App() {
  const [vendorZC, setVendorZC] = useState("ZipCode");
  const [countryInfo, setcountryInfo] = useState([]);
  const [rawData, setRawData] = useState([]);
  const [zipCodeList, setzipCodeList] = useState([]);
  const [vendor, setVendor] = useState({
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
  });
  // const [tableData, settableData] = useState([]);

  const [mapData, setmapData] = useState([9, [40.806577968000056, -73.87986700999994]]);
  const [casesType, setcasesType] = useState("cases");
  useEffect(() => {
    let fetchingDataFromDiseaseWorldwide = () => {
      fetch("https://disease.sh/v3/covid-19/all")
        .then((response) => response.json())
        .then((data) => setcountryInfo(data));
    };
    fetchingDataFromDiseaseWorldwide();
  }, []);
  useEffect(() => {
    let fetchingDataFromNYOD = () => {
      fetch("https://data.cityofnewyork.us/resource/mf9g-zhbw.json")
        .then((response) => response.json())
        .then((data) => {
          setRawData(data);
          let zipArr = [];
          data.forEach((ob) => zipArr.push(ob.zip));
          setzipCodeList(zipArr);
        });
    };
    fetchingDataFromNYOD();
  }, []);
  // useEffect(() => {
  //   if (rawData) {
  //     console.log(rawData);
  //     let zipArr = [];
  //     rawData.forEach((ob) => zipArr.push(ob.zip));
  //     console.log(zipArr);
  //   }

  //   // setzipCodeList([...zipCodeList, ob.point])
  // }, [rawData]);

  const onZipCodeChange = (e) => {
    let zipCode = e.target.value;
    console.log(zipCode);
    let v = rawData.find((ob) => ob.zip === zipCode);
    console.log(v);
    setVendor(v);
    setVendorZC(zipCode);
    console.log(vendor);
    setmapData([15, [v.point.coordinates[1], v.point.coordinates[0]]]);
    console.log(mapData);
  };

  return (
    <div className="App">
      {/* {console.log(vendor, mapData)} */}
      <div className="app__left">
        <div className="app__header">
          <h1>Recycle</h1>
          <FormControl>
            <Select variant="outlined" onChange={onZipCodeChange} value={vendorZC}>
              {zipCodeList.map((zc, i) => (
                <MenuItem key={i} value={zc}>
                  {zc}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app__stats">
          {/* <Infobox
            isRed
            active={casesType === "cases"}
            onClick={(e) => setcasesType("cases")}
            title="Caronavirus Cases"
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
          />
          <Infobox
            active={casesType === "recovered"}
            onClick={(e) => setcasesType("recovered")}
            title="Recovered"
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
          />
          <Infobox
            isRed
            active={casesType === "deaths"}
            onClick={(e) => setcasesType("deaths")}
            title="Death"
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
          /> */}
        </div>
        <Map casesType={casesType} vendor={vendor} mapData={mapData} />
      </div>
      {/* <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          <Table countries={tableData} />
          <h3>Worldwide New Cases</h3>
          <Linegraph casesType={casesType} />
        </CardContent>
      </Card> */}
    </div>
  );
}

export default App;
