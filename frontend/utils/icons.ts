import L from "leaflet";

export const iconCamera = new L.Icon({
  iconUrl: require("../public/icons/camera.svg"),
  iconRetinaUrl: require("../public/icons/camera.svg"),
  iconSize: new L.Point(30, 30),
  className: "leaflet-div-icon",
});
