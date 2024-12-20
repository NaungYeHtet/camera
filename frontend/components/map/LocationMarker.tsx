import { useState } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import { iconCamera } from "@/utils/icons";

export default function LocationMarker() {
  const [position, setPosition] = useState(null);
  const map = useMapEvents({
    click(e: any) {
      console.log(e.latlng.lat, e.latlng.lng);
      setPosition(e.latlng);
    },
  });

  return position === null ? null : <Marker position={position}></Marker>;
}
