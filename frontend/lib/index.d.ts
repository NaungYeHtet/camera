type CameraStatus = "Active" | "Under Deployment" | "Lost Connection";

type Camera = {
  id: number;
  name: string;
  department: string;
  status: CameraStatus;
  longitude: number;
  latitude: number;
  image: string;
  remarks: string;
};

type CameraGroup = {
  id: number;
  name: string;
};
