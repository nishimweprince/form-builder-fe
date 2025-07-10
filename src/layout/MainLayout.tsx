import { Outlet } from "react-router-dom";
import SideBar from "../components/Sidebar/SideBar";

const MainLayout = () => {
  return (
    <div className="flex min-h-screen">
      <SideBar />
      <main className="flex-1 p-4 bg-gray-100">
        <Outlet /> {/* 👈 This renders child pages */}
      </main>
    </div>
  );
};

export default MainLayout;
