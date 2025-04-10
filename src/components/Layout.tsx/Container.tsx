// src/components/Layout.tsx/Container.tsx
import React, { useState } from "react";
import SideBar from "./SideBar";
import Navbar from "./Navbar";

const Container = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const routes = window.location.pathname.split("/");

  return (
    <main className="w-screen h-screen flex flex-col md:flex-row relative">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-md transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative md:flex`}
      >
        <SideBar />
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col bg-white h-full overflow-auto">
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <section className="px-4 sm:px-6 md:px-10 h-full">
          <h1 className="w-full text-[#0C110D] capitalize py-6 text-xl sm:text-2xl font-bold border-b border-[#C8CBD9]">
            {routes[routes.length - 1]}
          </h1>
          {children}
        </section>
      </div>
    </main>
  );
};

export default Container;
