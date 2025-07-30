import { Outlet } from "react-router-dom";

import Sidebar from "@/components/sidebar/Sidebar";
import Header from "@/components/header/Header";

const Layout = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto bg-base-200">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
