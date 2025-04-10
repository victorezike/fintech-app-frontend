import React from "react";
import { CiSearch } from "react-icons/ci";
import { HiMenu } from "react-icons/hi";

interface NavbarProps {
  toggleSidebar?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  return (
    <div className="w-full border-b border-[#C8CBD9] py-4 px-4 sm:px-6 md:px-10 flex items-center justify-between">
      <button
        className="md:hidden text-2xl mr-4"
        onClick={toggleSidebar}
        aria-label="Toggle Sidebar"
      >
        <HiMenu />
      </button>

      <div className="flex-1 max-w-xs bg-[#F5F4F2] rounded-3xl relative h-[32px] ml-2">
        <input
          type="text"
          className="w-full pl-4 pr-10 h-full outline-none text-xs bg-transparent"
          placeholder="Search"
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 text-lg text-gray-500">
          <CiSearch />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
