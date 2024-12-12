// src/hooks/useCameraStatus.ts
import { useState, useEffect } from "react";
import io from "socket.io-client";

const useCameraStatus = (cameraId: number) => {
  const [status, setStatus] = useState<CameraStatus>();

  useEffect(() => {
    const socket = io("http://localhost:4000");

    socket.on(
      "cameraStatuses",
      (statuses: { id: number; status: CameraStatus }[]) => {
        const camera = statuses.find((cam) => cam.id === cameraId);
        if (camera) {
          setStatus(camera.status);
        }
      }
    );

    return () => {
      socket.disconnect();
    };
  }, [cameraId]);

  return status;
};

export default useCameraStatus;
