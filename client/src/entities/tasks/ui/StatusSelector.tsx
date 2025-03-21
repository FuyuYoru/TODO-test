import { columnStatuses, TaskStatus } from "@/entities/tasks/model/task";
import { useOutsideClick } from "@/shared/hooks/useOutsideClick";
import { Button } from "@/shared/ui/Button";
import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import { useMemo, useRef, useState } from "react";

interface StatusSelectorProps {
  selectedStatus: TaskStatus | null;
  onChange: (status: TaskStatus) => void;
}

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

export const StatusSelector: React.FC<StatusSelectorProps> = ({
  selectedStatus,
  onChange,
}) => {
  const [isOpened, setIsOpened] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useOutsideClick((event) => {
    if (buttonRef.current && buttonRef.current.contains(event.target as Node)) {
      return;
    }
    setIsOpened(false);
  });
  const [localValue, setLocalValue] = useState(selectedStatus);

  const handleOpen = () => setIsOpened((prev) => !prev);

  const changeState = (state: TaskStatus) => {
    onChange(state);
    setIsOpened(false);
    setLocalValue(state);
  };

  const statusTitle = useMemo(() => {
    if (localValue === null) return "Не выбран";
    const status = columnStatuses.find((item) => item.value === localValue);
    return status ? status.title : "Неизвестный статус";
  }, [localValue]);

  return (
    <div className="relative px-4">
      <div className="flex flex-row">
        <span className="text-lg">Статус: </span>
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
          {statusTitle}
        </Button>
      </div>

      <div
        ref={dropdownRef}
        className={clsx(
          "absolute left-0 top-full mt-1 w-full transform rounded-md border border-[#2b2b2b] bg-[#181818] p-[1px] shadow-lg transition-all duration-300",
          isOpened
            ? "scale-100 opacity-100"
            : "pointer-events-none scale-95 opacity-0"
        )}
      >
        {columnStatuses.map((item) => (
          <DropdownItem
            title={item.title}
            onClick={() => changeState(item.value)}
            key={item.value}
          />
        ))}
      </div>
    </div>
  );
};
