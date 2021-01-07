import React from "react";
import "./Map.css";
import { Map as LeafletMap, TileLayer } from "react-leaflet";
import { showDataOnMap } from "./utile";
const Map = ({ vendor, casesType, mapData }) => {
  return (
    <div className="Map">
      <LeafletMap center={mapData[1]} zoom={mapData[0]}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy;<a href="http://osm.org/copyright">OpenStreetMap</a>contributors'
        ></TileLayer>
        {showDataOnMap(vendor, casesType)}
      </LeafletMap>
    </div>
  );
};

export default Map;
