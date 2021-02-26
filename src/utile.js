import React from "react";
import { Circle, Popup } from "react-leaflet";
// import { v4 as uuidv4 } from "uuid";

const casesTypeColors = {
  cases: {
    hex: "#CC1034",
    rgb: "rgb(204, 16, 52)",
    half_op: "rgba(204, 16, 52, 0.5)",
    multiplier: 800,
  },
  recovered: {
    hex: "#7dd71d",
    rgb: "rgb(125, 215, 29)",
    half_op: "rgba(125, 215, 29, 0.5)",
    multiplier: 1200,
  },
  deaths: {
    hex: "#fb4443",
    rgb: "rgb(251, 68, 67)",
    half_op: "rgba(251, 68, 67, 0.5)",
    multiplier: 2000,
  },
};
// const vendorNameStr = (str) => {
//   let strArr = str.split(" ");
//   let formatStr = strArr.reduce((a, b) => {
//     return a + "+" + b;
//   });
//   window.open("https://www.google.com/maps/place/?q=" + formatStr);
//   console.log(formatStr);
// };

export const showDataOnMap = (vendor, casesType = "cases") => (
  <Circle
    // key={i}
    center={[vendor.point.coordinates[1], vendor.point.coordinates[0]]}
    color={casesTypeColors[casesType].hex}
    fillColor={casesTypeColors[casesType].hex}
    fillOpacity={0.4}
    radius={30}
  >
    <Popup>
      <div className="info-container">
        {/* <div className="info-flag" style={{ backgroundImage: `url(${vendor.name})` }}></div> */}
        <div className="info-name">{vendor.name}</div>
        <div className="info-name">Organics:{vendor.organics ? "yes" : "no"}</div>
        <div className="info-name">Paper:{vendor.paper ? "yes" : "no"}</div>
        <div className="info-name">Refuse:{vendor.refuse ? "yes" : "no"}</div>
        <button
          className="info-name"
          onClick={() =>
            window.open("https://maps.google.com?q=" + vendor.point.coordinates[1] + "," + vendor.point.coordinates[0])
          }
        >
          Go
        </button>

        {/* <div className="info-confirmed">Cases: {numeral(country.cases).format("0,0")}</div>
          <div className="info-recovered">Recovered: {numeral(country.recovered).format("0,0")}</div>
          <div className="info-deaths">Deaths: {numeral(country.deaths).format("0,0")}</div> */}
      </div>
    </Popup>
  </Circle>
);
// ));
