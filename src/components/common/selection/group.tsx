import { cn } from "cn-func";
import { SelectionContext } from "./context";

interface SelectionGroupProps {
  selectedId: string | null;
  onChange: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

const SelectionGroup = ({
  children,
  selectedId,
  onChange,
  className,
}: SelectionGroupProps) => {
  return (
    <SelectionContext.Provider value={{ selectedId, onChange }}>
      <div className={cn("flex flex-col gap-3", className)}>{children}</div>
    </SelectionContext.Provider>
  );
};

export default SelectionGroup;
