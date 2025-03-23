import { useAuth } from "@/app/providers/AuthProvider";
import { Button } from "@/shared/ui/Button";
import { Dropdown } from "@/shared/ui/Dropdown";
import { HorizontalSeparator } from "@/shared/ui/HorizontalSeparator";
import clsx from "clsx";
import { ChevronDown } from "lucide-react";

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
  const { user, signOut } = useAuth();

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

  if (!user) return null;

  return (
    <div className="relative px-4">
      <Dropdown
        trigger={(isOpened) => (
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
            classNames="gap-2 text-lg w-full"
            onClick={console.log}
          >
            {user?.firstname + " " + user?.lastname}
          </Button>
        )}
        classNames=""
      >
        <>
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
        </>
      </Dropdown>
    </div>
  );
};
