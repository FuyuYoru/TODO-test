import { ProfileDropdown } from "./ProfileDropdown";

export const Header: React.FC = () => {
  return (
    <div className="w-full flex flex-row py-4 px-4 bg-[#181818] border-b-[1px] border-[#2b2b2b]">
      <div className="flex-1 text-lg">
        <div>Этажи TEST</div>
      </div>
      <div className="flex flex-1 justify-end">
        <ProfileDropdown />
      </div>
    </div>
  );
};
