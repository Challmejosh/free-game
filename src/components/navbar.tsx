import type React from "react";
import { useStore } from "../utility/store";



const Navbar = () => {
    const {platforms,platform,setPlatform,search,setSearch,} = useStore()
  return (
    <nav className="w-full bg-white/80 backdrop-blur-md shadow-sm py-4 px-4 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8 sticky top-0 z-20">
      <div className="flex-1 w-full max-w-md">
        <input
          type="text"
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
          placeholder="Search games by name..."
          className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
        />
      </div>
      <div className="w-full max-w-xs">
        <select
          title="platform"
          value={platform}
          onChange={(e:React.ChangeEvent<HTMLSelectElement>) => setPlatform(e.target.value)}
          className="w-full cursor-pointer rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
        >
          <option value="">All Platforms</option>
          {platforms?.map((plat) => (
            <option key={plat} className="cursor-pointer" value={plat}>
              {plat}
            </option>
          ))}
        </select>
      </div>
    </nav>
  );
};

export default Navbar;
