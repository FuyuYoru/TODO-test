import { Outlet } from "react-router-dom";
import { Header } from "./Header";

export const MainLayout: React.FC = () => {
  return (
    <div className="grid h-full w-full grid-rows-[auto_1fr_auto]">
      <Header />
      <main className="grid grid-cols-[1fr_4fr_1fr] gap-8 bg-[#181818]">
        <div className="bg-[#1f1f1f]"></div>
        <div className="h-full w-full bg-[#1f1f1f]">      
          <Outlet />
        </div>
        <div className="bg-[#1f1f1f]"></div>
      </main>
    </div>
  );
};
