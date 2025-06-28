import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

export default function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-white ">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex flex-col flex-1 overflow-hidden ">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />

        <main className="flex flex-col flex-1 overflow-hidden px-4 md:px-8 py-4 bg-white">
          <div className="flex-1 h-full">{children || <Outlet />}</div>
        </main>
      </div>
    </div>
  );
}
