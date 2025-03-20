import clsx from "clsx";
import { ButtonHTMLAttributes, forwardRef } from "react";

// Интерфейс для пропсов компонента
interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  iconSide?: "start" | "end";
  classNames?: string;
}

// Компонент Button с использованием forwardRef
export const Button = forwardRef<HTMLDivElement, Props>(
  (
    { icon = null, iconSide = "end", classNames = "", children, ...props },
    ref
  ) => {
    return (
      <div
        className={clsx(
          "flex flex-row items-center",
          classNames,
          iconSide === "end" ? "flex-row" : "flex-row-reverse"
        )}
        ref={ref}
      >
        <button
          {...props}
          className="border-0 bg-transparent focus:outline-none focus:ring-0"
        >
          {children}
        </button>
        {icon && <span>{icon}</span>}
      </div>
    );
  }
);
