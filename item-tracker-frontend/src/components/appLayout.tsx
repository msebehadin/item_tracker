import { Outlet } from "react-router-dom";
import Sidebar from "./sideBar";

const AppLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      
      <Sidebar />

      
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
