import dynamic from "next/dynamic";

const Map = dynamic(() => import("../components/map/Map"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <h3>Map</h3>
      <Map position={[51.505, -0.09]} zoom={13} />
    </>
  );
}
