import { priorityArray, TaskPriority } from "@/entities/tasks/model/task"
import { Button } from "@/shared/ui/Button";
import { Dropdown } from "@/shared/ui/Dropdown";
import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import { useMemo, useRef, useState } from "react";

interface PrioritySelectorProps {
    selectedPriority: TaskPriority | null,
    onChange: (status: TaskPriority) => void;
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

export const PrioritySelector: React.FC<PrioritySelectorProps> = ({ selectedPriority, onChange }) => {
    const buttonRef = useRef<HTMLDivElement>(null);
    const [localValue, setLocalValue] = useState(selectedPriority);


    const changeState = (state: TaskPriority) => {
        onChange(state)
        setLocalValue(state);
    }

    const priorityTitle = useMemo(() => {
        if (localValue === null) return "Не выбран";
        return priorityArray.find((item) => item.value === localValue)?.title
    }, [localValue])

    return (
        <div className="relative px-4 w-full">
            <Dropdown
                trigger={((isOpened) => (
                    <div className="flex flex-row">
                        <span className="text-lg">Приоритет: </span>
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
                            onClick={() => null}
                            classNames="gap-2 text-lg"
                            ref={buttonRef}
                        >
                            {priorityTitle}
                        </Button>
                    </div>
                ))}
            >
                {priorityArray.map((item) => (
                    <DropdownItem title={item.title} onClick={() => changeState(item.value)} key={item.value} />
                ))}
            </Dropdown>
        </div>
    )
}