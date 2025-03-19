import { useAuth } from "@/app/providers/AuthProvider";
import { useOutsideClick } from "@/shared/hooks/useOutsideClick";
import { Button } from "@/shared/ui/Button";
import { HorizontalSeparator } from "@/shared/ui/HorizontalSeparator";
import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import { useRef, useState } from "react";

// Компонент элемента списка
const DropdownItem = ({
  title,
  onClick,
}: {
  title: string;
  onClick: () => void;
}) => (
  <div
    className="text-white text-sm w-full text-center transition-all duration-300 
      hover:bg-[#1f1f1f] cursor-pointer p-2"
    onClick={onClick}
  >
    {title}
  </div>
);

export const ProfileDropdown: React.FC = () => {
  const [isOpened, setIsOpened] = useState(false);
  const { user, signOut } = useAuth();
  const buttonRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useOutsideClick((event) => {
    if (buttonRef.current && buttonRef.current.contains(event.target as Node)) {
      return;
    }
    setIsOpened(false);
  });

  const handleOpen = () => setIsOpened((prev) => !prev);

  const userActions = [
    {
      id: "profile",
      title: "Профиль",
      action: () => console.log("profile navigation"),
    },
  ];

  const adminActions = [
    {
      id: "admin",
      title: "Администрирование",
      action: () => console.log("admin page navigation"),
    },
  ];

  return (
    <div className="relative px-4">
      <Button
        icon={
          <div
            className={clsx(
              "transition-transform duration-300",
              isOpened && "rotate-180"
            )}
          >
            <ChevronDown strokeWidth={1} />
          </div>
        }
        onClick={handleOpen}
        classNames="gap-2"
        ref={buttonRef}
      >
        {user?.firstname + " " + user?.lastname}
      </Button>

      <div
        ref={dropdownRef}
        className={clsx(
          "absolute top-full left-0 mt-1 w-full bg-[#181818] border border-[#2b2b2b] rounded-md p-[1px] shadow-lg transform transition-all duration-300",
          isOpened
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        )}
      >
        {userActions.map((item) => (
          <DropdownItem
            key={item.id}
            title={item.title}
            onClick={item.action}
          />
        ))}

        {user?.role === "ADMIN" && (
          <>
            <HorizontalSeparator />
            {adminActions.map((item) => (
              <DropdownItem
                key={item.id}
                title={item.title}
                onClick={item.action}
              />
            ))}
          </>
        )}

        <HorizontalSeparator />
        <DropdownItem title="Выйти" onClick={signOut} />
      </div>
    </div>
  );
};
