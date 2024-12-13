import { CiCamera } from "react-icons/ci";
import { GoAlert } from "react-icons/go";

type MapStatsProps = {
  cameras: Camera[];
  totalAlerts: number;
};

export default function MapStat({ cameras, totalAlerts }: MapStatsProps) {
  return (
    <div className="flex flex-col md:flex-row gap-3">
      <div className="inline-flex items-center p-2 gap-2 border text-gray-300 border-gray-500 rounded-md">
        <CiCamera size={30} />
        <div className="flex flex-col">
          <span className="text-white font-bold">{cameras.length}</span>
          <p>Cameras</p>
        </div>
      </div>
      <div className="inline-flex items-center p-2 gap-2 border text-gray-300 border-gray-500 rounded-md">
        <GoAlert size={30} className="text-red-500" />
        <div className="flex flex-col">
          <span className="text-red-500 font-bold">{totalAlerts}</span>
          <p>Active Alert</p>
        </div>
      </div>
    </div>
  );
}
