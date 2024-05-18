import { memo } from "react";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="w-[430px] p-8 shadow-none sm:shadow-2xl rounded-lg">
        <Outlet />
      </div>
    </div>
  );
}

export default memo(Layout);
