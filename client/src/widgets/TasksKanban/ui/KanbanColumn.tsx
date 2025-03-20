import clsx from "clsx";
import { ReactNode } from "react";

interface IKanbanColumn {
  title: string;
  titleColor: string;
  children?: ReactNode;
  columnStyles?: string;
}

export const KanbanColumn: React.FC<IKanbanColumn> = ({
  title,
  titleColor,
  children,
  columnStyles = "",
}) => {
  return (
    <div className="flex h-full w-full flex-col">
      <div className="w-full">
        <div
          className="w-full rounded-l-sm rounded-r-xl 
          border-0 p-1 text-center font-normal text-black"
          style={{ backgroundColor: titleColor }}
        >
          {title}
        </div>
      </div>
      <div
        className={clsx(
          "flex h-full w-full flex-col gap-4 overflow-y-auto border-l border-dashed border-[#707070] p-2",
          columnStyles
        )}
      >
        {children}
      </div>
    </div>
  );
};
