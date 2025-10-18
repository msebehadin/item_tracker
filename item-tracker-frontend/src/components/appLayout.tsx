import Sidebar from "../components/sideBar";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className='flex min-h-screen'>
      <Sidebar />
      <main className='flex-1 bg-gray-100 p-6'>
        <Outlet /> 
      </main>
    </div>
  );
};

export default AppLayout;
