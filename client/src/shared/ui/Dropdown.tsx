import { useState, useRef, ReactNode } from "react";
import { useOutsideClick } from "@/shared/hooks/useOutsideClick";
import clsx from "clsx";

interface DropdownProps {
  trigger: ReactNode | ((isOpened: boolean) => ReactNode);
  children: ReactNode | ((isOpened: boolean) => ReactNode);
  classNames?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  children,
  classNames,
}) => {
  const [isOpened, setIsOpened] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useOutsideClick((event) => {
    if (buttonRef.current?.contains(event.target as Node)) return;
    setIsOpened(false);
  });

  const render = (value: ReactNode | ((isOpened: boolean) => ReactNode)) => {
    return typeof value === "function" ? value(isOpened) : value;
  };

  return (
    <div className="w-full">
      <div
        ref={buttonRef}
        onClick={() => setIsOpened((prev) => !prev)}
        className="w-full"
      >
        {render(trigger)}
      </div>

      <div
        ref={dropdownRef}
        className={clsx(
          "absolute left-0 top-full mt-1 w-full rounded-md border border-[#2b2b2b] bg-[#181818] p-[1px] shadow-lg transition-all duration-300",
          isOpened
            ? "scale-100 opacity-100"
            : "pointer-events-none scale-95 opacity-0",
          classNames
        )}
      >
        {render(children)}
      </div>
    </div>
  );
};
