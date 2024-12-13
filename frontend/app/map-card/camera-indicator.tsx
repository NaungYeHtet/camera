import useCameraStatus from "@/hooks/useCameraStatus";
import { Icon } from "leaflet";
import { CircleMarker, Marker, Popup } from "react-leaflet";

const getCameraStatusColor = (status?: CameraStatus) => {
  switch (status) {
    case "Active":
      return "green";
    case "Under Deployment":
      return "orange";
    case "Lost Connection":
      return "red";
    default:
      return "blue";
  }
};

const getCameraBorderColor = (isSelected: boolean, hasAlerts: boolean) => {
  if (isSelected) {
    return "purple";
  }

  if (hasAlerts) {
    return "red";
  }

  return "gray";
};

type CameraIndicatorProps = {
  camera: Camera;
  selectedCameraIds: Set<number>;
  handleMarkerClick: (cameraId: number) => void;
};

export default function CameraIndicator({
  camera,
  selectedCameraIds,
  handleMarkerClick,
}: CameraIndicatorProps) {
  const isSelected = selectedCameraIds.has(camera.id);
  const status = useCameraStatus(camera.id);

  return (
    <>
      <CircleMarker
        key={`${camera.id}-${isSelected}-${status}`}
        center={[camera.latitude, camera.longitude]}
        opacity={1}
        fillOpacity={1}
        color={getCameraBorderColor(isSelected, camera.hasAlerts)}
        radius={15}
        fillColor={getCameraStatusColor(status || camera.status)}
      >
        <Popup>
          <b>{camera.name}</b> <br />
          Department: {camera.department} <br />
          Status: {camera.status} <br />
          Remarks: {camera.remarks}
        </Popup>
      </CircleMarker>

      <Marker
        position={[camera.latitude, camera.longitude]}
        icon={
          new Icon({
            iconUrl: "/icons/camera.svg",
            iconSize: [17, 17],
            popupAnchor: [0, -32],
          })
        }
        eventHandlers={{
          click: () => handleMarkerClick(camera.id),
        }}
      />
    </>
  );
}
