"use client";

import { Icon } from "leaflet";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";
import { CiCamera } from "react-icons/ci";
import { FaFilter } from "react-icons/fa";
import { CircleMarker, Marker, Popup } from "react-leaflet";
import debounce from "lodash.debounce"; // Import debounce utility
import useCameraStatus from "@/hooks/useCameraStatus";
import Modal from "@/components/modal";
import FieldGroup from "@/components/field-wrapper";
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Dropdown from "@/components/dropdown";
import { BsThreeDotsVertical } from "react-icons/bs";
import { toast } from "react-toastify";

const Map = dynamic(() => import("../components/map/Map"), {
  ssr: false,
});

type MapFilterProps = {
  onSearch: (query: string) => void;
};

const MapFilter = ({ onSearch }: MapFilterProps) => {
  const [query, setQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value); // Call parent callback with query
  };

  return (
    <div className="absolute top-5 left-5 z-[1000] w-full gap-2 flex flex-col md:flex-row">
      <input
        className="w-1/3 px-3 text-gray-600"
        type="text"
        placeholder="Search by camera name, department, group name"
        value={query}
        onChange={handleSearchChange}
      />
      <button className="inline-flex items-center gap-3 p-2 bg-gray-600 text-white rounded-md shadow-lg">
        <FaFilter />
        Filters
      </button>
    </div>
  );
};

type MapActionProps = {
  cameraIds: Set<number>;
  cameras: Camera[];
};

type GroupInputs = {
  name: string;
};

const groupSchema = yup
  .object({
    name: yup.string().required("Group name is required"),
  })
  .required();

const groupDefaults = {
  name: "",
};

const MapAction = ({ cameraIds, cameras }: MapActionProps) => {
  const [loading, setLoading] = useState(false);
  const [group, setGroup] = useState<CameraGroup | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    reset,
    setError,
    formState: { errors },
  } = useForm<GroupInputs>({
    shouldUseNativeValidation: false,
    resolver: yupResolver(groupSchema),
  });

  const fetchGroup = async () => {
    if (cameraIds.size === 0) {
      setGroup(null);
      return;
    }

    console.log(cameraIds);
    setLoading(true);

    setLoading(true);
    try {
      const response = await fetch(`http://localhost:4000/api/group`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cameraIds: Array.from(cameraIds) }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch group");
      }

      const data = await response.json();
      setGroup(data);
    } catch (error) {
      console.error("Error fetching group:", error);
      setGroup(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGroup();
  }, [cameraIds]);

  const handleCreateGroup: SubmitHandler<GroupInputs> = async (data) => {
    try {
      const response = await fetch(`http://localhost:4000/api/groups`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cameraIds: Array.from(cameraIds), ...data }),
      });

      if (response.status == 422) {
        setError("name", { type: "custom", message: "Group name is required" });
      }

      if (response.status == 201) {
        reset(groupDefaults);
        setIsCreating(false);
        toast.success("Group created");
        fetchGroup();
      }
    } catch (error) {
      console.error("Error fetching group:", error);
    } finally {
    }
    setLoading(false);
  };

  const handleDeleteGroup = () => {
    fetch(`http://localhost:4000/api/groups/${group?.id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete group");
        }
        setGroup(null);
      })
      .catch((error) => {
        console.error("Error deleting group:", error);
      });
  };

  if (!cameraIds.size) {
    return null;
  }

  return (
    <div className="absolute bottom-5 right-5 z-[1000] gap-2 flex flex-col">
      <Modal isOpen={isCreating} onClose={() => setIsCreating(false)}>
        <Modal.Panel title={<Modal.Title>Create Group</Modal.Title>}>
          <form onSubmit={handleSubmit(handleCreateGroup)} className="w-full">
            <FieldGroup>
              <FieldGroup.Label id="groupName">Group name</FieldGroup.Label>
              <FieldGroup.Wrapper errorMsg={errors.name?.message}>
                <input
                  type="text"
                  id="groupName"
                  className="form-control-primary"
                  {...register("name", { required: true })}
                  aria-invalid={errors.name ? "true" : "false"}
                  autoFocus
                />
              </FieldGroup.Wrapper>
              <FieldGroup.ErrorMessage>
                {errors.name?.message}
              </FieldGroup.ErrorMessage>
            </FieldGroup>
            <button
              type="submit"
              className="col-span-1 my-4 inline-flex w-full items-center justify-center gap-1 rounded-md border border-gray-200 bg-purple-500 py-1.5 text-lg font-medium text-white transition-colors hover:bg-purple-800 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 sm:col-span-4 md:col-span-4"
            >
              Submit
            </button>
          </form>
        </Modal.Panel>
      </Modal>
      {cameraIds.size > 1 && !group ? (
        <button
          className="p-2 bg-gray-600 text-white rounded-md shadow-lg"
          onClick={() => setIsCreating(true)}
        >
          Create Group
        </button>
      ) : (
        ""
      )}
      {group ? (
        <div className="inline-flex gap-3 items-center justify-between bg-gray-600 p-2 rounded-md shadow-lg">
          <span className=" text-white ">{group.name}</span>
          <Dropdown>
            <Dropdown.Button className="gap-2 rounded-full border border-gray-500 bg-white dark:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-offset-2 dark:focus:ring-blue-800">
              <BsThreeDotsVertical className="size-7 fill-primary-500" />
            </Dropdown.Button>
            <Dropdown.Items>
              <Dropdown.Item>
                <button
                  className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-gray-600 transition-colors duration-150 data-[focus]:bg-primary-100"
                  onClick={() => handleDeleteGroup()}
                >
                  Delete
                </button>
              </Dropdown.Item>
            </Dropdown.Items>
          </Dropdown>
        </div>
      ) : (
        ""
      )}
      <div className="bg-gray-600 p-3 flex flex-col">
        <p className="text-sm">{cameraIds.size} CAMERA SELECTED</p>
        <ul>
          {Array.from(cameraIds).map((cameraId) => {
            const camera = cameras.find((camera) => camera.id === cameraId);
            return camera ? (
              <li key={cameraId} className="text-white">
                {camera.name}
              </li>
            ) : null;
          })}
        </ul>
        {cameraIds.size > 0 && (
          <div className="mt-2">
            <img
              src={cameras[0].image}
              alt={cameras[0].name}
              className="w-32 h-32 object-cover rounded-md"
            />
          </div>
        )}
      </div>
    </div>
  );
};

const getStatusColor = (status?: CameraStatus) => {
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

type CameraIndicatorProps = {
  camera: Camera;
  selectedCameraIds: Set<number>;
  handleMarkerClick: (cameraId: number) => void;
};

const CameraIndicator = ({
  camera,
  selectedCameraIds,
  handleMarkerClick,
}: CameraIndicatorProps) => {
  const isSelected = selectedCameraIds.has(camera.id);
  const status = useCameraStatus(camera.id);

  return (
    <CircleMarker
      key={`${camera.id}-${isSelected}-${status}`}
      center={[camera.latitude, camera.longitude]}
      opacity={1}
      fillOpacity={1}
      color={isSelected ? "purple" : "gray"} // Set border color
      radius={15}
      fillColor={getStatusColor(status || camera.status)}
    >
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
          click: () => handleMarkerClick(camera.id), // Add click event handler
        }}
      >
        <Popup>
          <b>{camera.name}</b> <br />
          Department: {camera.department} <br />
          Status: {camera.status} <br />
          Remarks: {camera.remarks}
        </Popup>
      </Marker>
    </CircleMarker>
  );
};

export default function MapCard() {
  const [cameras, setCameras] = useState<Camera[]>([]);
  const [position, setPosition] = useState<[number, number]>([0, 0]);
  const [selectedCameraIds, setSelectedCameraIds] = useState(new Set<number>());
  const [loading, setLoading] = useState(false);

  const fetchCameras = async (query: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:4000/api/cameras?search=${query}`
      );
      const data: Camera[] = await response.json();
      setCameras(data);

      if (data.length > 0) {
        setPosition([data[0].latitude, data[0].longitude]);
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
    () => debounce((query: string) => fetchCameras(query), 2000),
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
      <div className="flex flex-col md:flex-row">
        <div className="inline-flex items-center p-2 gap-2 border text-gray-300 border-gray-500 rounded-md">
          <CiCamera size={30} />
          <div className="flex flex-col">
            <span className="text-white font-bold">{cameras.length}</span>
            <p>Cameras</p>
          </div>
        </div>
      </div>
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
        <MapAction cameraIds={selectedCameraIds} cameras={cameras} />
      </div>
    </div>
  );
}
