import { useEffect, useState } from 'react'
import React from 'react'
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import L, { map } from 'leaflet'
import icon from 'leaflet/dist/images/marker-icon.png'
import shadow from 'leaflet/dist/images/marker-shadow.png'
import { CircularProgress } from '@material-ui/core'

const leafIcon = L.icon({
  iconUrl: icon,
  iconSize: [10, 15],
  shadowUrl: shadow,
  shadowSize: [10, 15],
})



const greenIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  iconSize: [10, 15],
  shadowUrl: shadow,
  shadowSize: [10, 15],
  
})

const Map = () => {
  // stores location objects - Obj :
  // {Address: {City,State}, latlong: [45.027, -72.234], _id}
  const [alumniLocations, setAlumniLocations] = useState([])

  // fetch alumni locations
  useEffect(() => {
    if (alumniLocations.length === 0) {
      fetch('/alumni-latlong')
        .then((res) => res.json())
        .then((result) => {
          setAlumniLocations(result)
        })
    }
  })

  // create markers using alumniLocation latlong pairs.
  const lnglats = []
  for (let i = 0; i < alumniLocations.length; i++) {
    lnglats.push(
      <Marker key={i} icon={leafIcon} position={alumniLocations[i].latlong} />
    )
  }

  return (
    
    
    <MapContainer
      style={{ height: '100%', width: '50vw' }}
      zoom={7}
      scrollWheelZoom={false}
      center={[44.149398498395676, -72.83771521960242]}
    >
      {/* Insert map markers: */}
      {lnglats.length ? (
        <>
        
         
      <TileLayer
        attribution=''
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {lnglats}
      <Marker  icon={greenIcon} position={[44.148985984799275, -72.83788414870979]} />
        </>
      ) : (
       <CircularProgress style={{zIndex: "5000"}} color="secondary" />
      )}
      
      {/* <TileLayer
        attribution=''
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      /> */}
     
    </MapContainer>
  )
}

export default Map
