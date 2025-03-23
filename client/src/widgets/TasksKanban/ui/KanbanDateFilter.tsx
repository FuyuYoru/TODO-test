import { useEffect, useState } from "react";
import { DateFilter, IKanbanDateFilter } from "../model";
import clsx from "clsx";

const defaultVariables: DateFilter[] = [
  {
    id: "today",
    title: "Сегодня",
    value: new Date(Date.now()),
  },
  {
    id: "week",
    title: "Неделя",
    value: (() => {
      const now = new Date();
      now.setDate(now.getDate() + 7);
      return now;
    })(),
  },
  {
    id: "weekOver",
    title: "Свыше недели",
    value: null,
  },
];

export const KanbanDateFilter: React.FC<IKanbanDateFilter> = ({
  variables = defaultVariables,
  onChange,
}) => {
  const [selected, setSelected] = useState<string>(variables[0].id);

  const handleChange = (value: DateFilter) => {
    setSelected(value.id);
    const stringValue = value.value?.toISOString().split("T")[0] || null;
    onChange(stringValue);
  };

  useEffect(() => {
    if (variables.length) {
      const initialValue = variables[0].value
        ? variables[0].value.toISOString().split("T")[0]
        : null;
      onChange(initialValue);
    }
  }, []);

  if (variables.length === 0) return null;

  return (
    <div className="flex flex-row gap-2 bg-[#181818] rounded-lg p-2">
      {variables.map((item) => (
        <div
          key={item.id}
          onClick={() => handleChange(item)}
          className={clsx(
            "px-4 py-1 rounded-full bg-[#1f1f1f] hover:bg-[#444343] select-none cursor-pointer",
            item.id === selected ? "border-[1px] border-[#940740]" : ""
          )}
        >
          {item.title}
        </div>
      ))}
    </div>
  );
};
