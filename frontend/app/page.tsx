import MapCard from "./map-card/map-card";

export default function Home() {
  return (
    <div className="flex">
      <div className="flex flex-col bg-gray-600 p-4 rounded-md w-full">
        <MapCard />
      </div>
    </div>
  );
}
