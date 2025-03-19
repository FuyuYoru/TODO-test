import { Outlet } from "react-router-dom";
import { Header } from "./Header";

export const MainLayout: React.FC = () => {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] w-full h-full">
      <Header />
      <Outlet />
    </div>
  );
};
