import clsx from "clsx";
import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  iconAction?: () => void;
  classNames?: string;
  width?: string;
}

export const Input: React.FC<Props> = ({
  icon = null,
  iconAction = () => console.log("clicked"),
  classNames = "",
  ...props
}) => {
  return (
    <div
      className={clsx(
        `flex flex-row w-full items-center bg-white py-2 px-4 rounded border-[1px] border-[#c8ccd1]`,
        classNames
      )}
    >
      <input
        className={
          "bg-transparent focus:outline-none focus:ring-0 border-0 w-full"
        }
        {...props}
      />
      <span onClick={iconAction} className="opacity-[50%] hover:opacity-[100%]">
        {icon}
      </span>
    </div>
  );
};
