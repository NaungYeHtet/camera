"use client";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css"; // Re-uses images from ~leaflet package
import "leaflet-defaulticon-compatibility";
import { useEffect } from "react";
import LocationMarker from "./LocationMarker";

type MapProps = {
  position: [number, number];
  zoom: number;
};

export default function Map({ position, zoom }: MapProps) {
  useEffect(() => {});

  return (
    <MapContainer
      center={position}
      zoom={zoom}
      scrollWheelZoom={false}
      style={{ height: "600px", width: "1200px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      <LocationMarker />
    </MapContainer>
  );
}
