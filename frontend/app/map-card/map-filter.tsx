import { useState } from "react";
import { CiCamera } from "react-icons/ci";
import { FaFilter } from "react-icons/fa";

type MapFilterProps = {
  onSearch: (query: string) => void;
};

export default function MapFilter({ onSearch }: MapFilterProps) {
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
}
