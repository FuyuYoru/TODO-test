import { useState, useCallback } from "react";
import { UserSummary } from "../model/user";
import { useAuth } from "@/app/providers/AuthProvider";
import { Dropdown } from "@/shared/ui/Dropdown";
import { Button } from "@/shared/ui/Button";
import clsx from "clsx";

interface ISubordinatesSelector {
  onChange: (subordinate: number[]) => void;
  multiple?: boolean;
  title?: string;
}

export const SubordinatesSelector: React.FC<ISubordinatesSelector> = ({
  onChange,
  multiple = true,
  title = "Выбрать менеджеров",
}) => {
  const { user } = useAuth();
  const [selectedUsers, setSelectedUsers] = useState<UserSummary[]>([]);

  const handleSelect = useCallback(
    (subordinate: UserSummary) => {
      if (multiple) {
        const newState = selectedUsers.find(
          (item) => item.id === subordinate.id
        )
          ? selectedUsers.filter((item) => item.id !== subordinate.id)
          : [...selectedUsers, subordinate];
        setSelectedUsers(newState);
        onChange(newState.map((item) => item.id));
      } else {
        setSelectedUsers([subordinate]);
        onChange([subordinate.id]);
      }
    },
    [multiple, selectedUsers, onChange]
  );

  if (!user) return null;

  return (
    <div className="w-full sm:w-[250px] bg-[#181818] rounded-lg p-2 flex items-center justify-center">
      <div className="relative w-full">
        <Dropdown
          trigger={() => (
            <Button onClick={console.log} classNames="justify-center">
              {selectedUsers.length === 0
                ? title
                : multiple
                ? `Менеджеры- ${selectedUsers.length}`
                : `${Array.from(selectedUsers)[0]?.firstname} ${
                    Array.from(selectedUsers)[0]?.lastname
                  }`}
            </Button>
          )}
        >
          {user.managedUsers.map((item) => {
            const isSelected = selectedUsers.find(
              (user) => user.id === item.id
            );
            return (
              <div
                key={item.login}
                className={clsx(
                  "px-4 py-1",
                  isSelected ? "border-[1px] border-[#940740]" : ""
                )}
                onClick={() => handleSelect(item)}
              >
                {`${item.firstname} ${item.lastname}`}
              </div>
            );
          })}
        </Dropdown>
      </div>
    </div>
  );
};
