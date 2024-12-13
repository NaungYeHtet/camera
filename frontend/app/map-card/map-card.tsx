"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import debounce from "lodash.debounce";
import MapStat from "./map-stat";
import MapFilter from "./map-filter";
import MapAction from "./map-action";
import CameraIndicator from "./camera-indicator";

const Map = dynamic(() => import("../../components/map/Map"), {
  ssr: false,
});

export default function MapCard() {
  const [cameras, setCameras] = useState<Camera[]>([]);
  const [position, setPosition] = useState<[number, number]>([0, 0]);
  const [selectedCameraIds, setSelectedCameraIds] = useState(new Set<number>());
  const [loading, setLoading] = useState(false);
  const [totalAlerts, setTotalAlerats] = useState(0);

  const handleSelectedCameraIds = (cameraIds: Set<number>) => {
    setSelectedCameraIds(cameraIds);
  };

  const fetchCameras = async (query: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:4000/api/cameras?search=${query}`
      );
      const {
        cameras,
        totalAlerts,
      }: { cameras: Camera[]; totalAlerts: number } = await response.json();

      setCameras(cameras);
      setTotalAlerats(totalAlerts);

      if (cameras.length > 0) {
        setPosition([cameras[0].latitude, cameras[0].longitude]);
      }
    } catch (error) {
      console.error("Error fetching camera data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkerClick = (cameraId: number) => {
    console.log(cameraId);
    setSelectedCameraIds((prev) => {
      const newSelectedIds = new Set(prev);
      if (newSelectedIds.has(cameraId)) {
        newSelectedIds.delete(cameraId); // Deselect if already selected
      } else {
        newSelectedIds.add(cameraId); // Add to selection if not already selected
      }
      return newSelectedIds;
    });
  };

  const debouncedSearch = useMemo(
    () => debounce((query: string) => fetchCameras(query), 1000),
    []
  );

  useEffect(() => {
    fetchCameras("");
  }, []);

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return (
    <div className="flex flex-col gap-3">
      <MapStat cameras={cameras} totalAlerts={totalAlerts} />
      <div className="relative">
        <MapFilter onSearch={debouncedSearch} />
        {loading && (
          <div className="absolute top-10 left-10 text-white">Loading...</div>
        )}
        <Map position={position} zoom={13}>
          {cameras.map((camera) => (
            <CameraIndicator
              key={camera.id}
              camera={camera}
              selectedCameraIds={selectedCameraIds}
              handleMarkerClick={handleMarkerClick}
            />
          ))}
        </Map>
        <MapAction
          cameraIds={selectedCameraIds}
          cameras={cameras}
          handleCameraIds={handleSelectedCameraIds}
        />
      </div>
    </div>
  );
}
