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
    className="w-full cursor-pointer p-2 text-center text-sm text-white 
      transition-all duration-300 hover:bg-[#1f1f1f]"
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
        classNames="gap-2 text-lg"
        ref={buttonRef}
      >
        {user?.firstname + " " + user?.lastname}
      </Button>

      <div
        ref={dropdownRef}
        className={clsx(
          "absolute left-0 top-full mt-1 w-full transform rounded-md border border-[#2b2b2b] bg-[#181818] p-[1px] shadow-lg transition-all duration-300",
          isOpened
            ? "scale-100 opacity-100"
            : "pointer-events-none scale-95 opacity-0"
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
