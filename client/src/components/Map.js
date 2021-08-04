import { useEffect, useState } from "react";
import React from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L, { map } from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import shadow from "leaflet/dist/images/marker-shadow.png";
import { set } from "mongoose";

const leafIcon = L.icon({
  iconUrl: icon,
  iconSize: [10, 15],
  shadowUrl: shadow,
  shadowSize: [10, 15]
});

const Map = () => {
  const [lat, setLat] = useState([]);

  useEffect(() => {
    if (lat.length === 0) {
      fetch("/lat")
        .then((res) => res.json())
        .then((result) => {
          setLat(result);
        });
    }
  });

  const [lng, setLng] = useState([]);

  useEffect(() => {
    if (lng.length === 0) {
      fetch("/lng")
        .then((res) => res.json())
        .then((result) => {
          setLng(result);
        });
    }
  });

  //have two arrays lat and lng 
  const lnglats = []
  for(let i = 0; i < lng.length; i++){
    lnglats.push(<Marker icon={leafIcon} position={[lat[i], lng[i]]} />)
  }

  return (
    <MapContainer
      style={{ height: "100%" }}
      zoom={5}
      scrollWheelZoom={false}
      center={[44.149398498395676, -72.83771521960242]}
    >
      {lng.length > 0 && lnglats}

      <TileLayer
        attribution=""
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
};

export default Map;
