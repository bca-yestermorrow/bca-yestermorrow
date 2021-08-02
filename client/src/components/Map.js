
import React from 'react'
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const Map = () => {
  return (
 
    <MapContainer style={{height: '500px'}} zoom={13} center={[44.149398498395676, -72.83771521960242]}>
    <TileLayer
        attribution=""
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
   
  );
}

export default Map;
