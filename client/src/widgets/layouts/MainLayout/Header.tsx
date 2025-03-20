import { ProfileDropdown } from "./ProfileDropdown";

export const Header: React.FC = () => {
  return (
    <div className="flex w-full flex-row border-b-[1px] border-[#2b2b2b] bg-[#181818] px-4 py-4">
      <div className="flex-1 text-lg">
        <div>Этажи TEST</div>
      </div>
      <div className="flex flex-1 justify-end">
        <ProfileDropdown />
      </div>
    </div>
  );
};
