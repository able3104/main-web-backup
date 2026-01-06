import { cn } from "cn-func";
import { useSelectionContext } from "./context";

interface SelectionItemProps {
  id: string;
  children: React.ReactNode;
}

const SelectionItem = ({ id, children }: SelectionItemProps) => {
  const { selectedId, onChange } = useSelectionContext();
  const isSelected = selectedId === id;

  const handleClick = () => {
    onChange(id);
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        "h-22 px-5 py-3 bg-white overflow-hidden cursor-pointer",
        "border border-gray-light rounded-2xl outline-blue-primary",
        isSelected && "outline-2 -outline-offset-1 text-blue-primary"
      )}
    >
      {children}
    </div>
  );
};

export default SelectionItem;
