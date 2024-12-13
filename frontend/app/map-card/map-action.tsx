import { useEffect, useState } from "react";
import Modal from "@/components/modal";
import FieldGroup from "@/components/field-wrapper";
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Dropdown from "@/components/dropdown";
import { BsThreeDotsVertical } from "react-icons/bs";
import { toast } from "react-toastify";
import { LiaTimesSolid } from "react-icons/lia";

type MapActionProps = {
  cameraIds: Set<number>;
  cameras: Camera[];
  handleCameraIds: (cameraIds: Set<number>) => void;
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

export default function MapAction({
  cameraIds,
  cameras,
  handleCameraIds,
}: MapActionProps) {
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

    setLoading(true);

    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_PATH}/group`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cameraIds: Array.from(cameraIds) }),
        }
      );

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
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_PATH}/groups`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cameraIds: Array.from(cameraIds), ...data }),
        }
      );

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
    fetch(`${process.env.NEXT_PUBLIC_API_PATH}/groups/${group?.id}`, {
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
      <div className="bg-gray-600 p-3 flex flex-col gap-2 text-xs md:text-sm rounded-md shadow-lg">
        <div className="inline-flex items-center gap-3">
          <span>{cameraIds.size} CAMERA SELECTED</span>
          <button
            className="dark:text-gray-300"
            onClick={() => handleCameraIds(new Set())}
          >
            <LiaTimesSolid />
          </button>
        </div>
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
              src={
                cameras.filter(
                  (camera) => camera.id == Array.from(cameraIds)[0]
                )[0].image
              }
              alt={
                cameras.filter(
                  (camera) => camera.id == Array.from(cameraIds)[0]
                )[0].name
              }
              className="w-44 h-24 object-cover rounded-md"
            />
          </div>
        )}
      </div>
    </div>
  );
}
