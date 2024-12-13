import { CiCamera } from "react-icons/ci";

type MapStatsProps = {
  cameras: Camera[];
};

export default function MapStat({ cameras }: MapStatsProps) {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="inline-flex items-center p-2 gap-2 border text-gray-300 border-gray-500 rounded-md">
        <CiCamera size={30} />
        <div className="flex flex-col">
          <span className="text-white font-bold">{cameras.length}</span>
          <p>Cameras</p>
        </div>
      </div>
    </div>
  );
}
