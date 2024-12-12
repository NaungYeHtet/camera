"use client";

import { MapContainer, ZoomControl, TileLayer } from "react-leaflet";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import { ReactNode } from "react";
import LocationMarker from "./LocationMarker";

type MapProps = {
  zoom: number;
  position: [number, number];
  children: ReactNode;
};

export default function Map({ zoom, position, children }: MapProps) {
  return (
    <MapContainer
      center={position}
      zoom={zoom}
      scrollWheelZoom={false}
      style={{
        width: "100%", // Use 100% of the container's width
        height: "60vh", // Use 60% of the viewport height (adjust this value to suit your design)
      }}
      zoomControl={false}
    >
      <ZoomControl position="bottomleft" />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {children}
      <LocationMarker />
    </MapContainer>
  );
}
