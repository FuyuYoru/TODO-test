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
        `flex w-full flex-row items-center rounded border-[1px] border-[#c8ccd1] bg-white px-4 py-2`,
        classNames
      )}
    >
      <input
        className={
          "w-full border-0 bg-transparent focus:outline-none focus:ring-0"
        }
        {...props}
      />
      <span onClick={iconAction} className="opacity-[50%] hover:opacity-[100%]">
        {icon}
      </span>
    </div>
  );
};
