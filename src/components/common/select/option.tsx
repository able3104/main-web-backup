import { cn } from "cn-func";
import { useSelectContext } from "./selectContext";

interface SelectOptionProps {
  name: string;
  price: number;
  description?: string;
}

const Option = ({ name, price, description }: SelectOptionProps) => {
  const { selectedOption, onChange } = useSelectContext();
  const isSelected = selectedOption?.name === name;

  return (
    <label
      className={cn(
        "flex flex-row justify-between items-center gap-2",
        "h-20 px-4 py-3 cursor-pointer",
        isSelected ? "bg-gray-background" : "bg-white hover:bg-gray-background"
      )}
      onClick={() => onChange({ name, price, description })}
    >
      <div className="flex flex-col">
        <p className="text-base ">{name}</p>
        {description && (
          <p className="text-[13px]/3 text-gray-dark whitespace-pre-wrap">
            {description}
          </p>
        )}
      </div>
      <div className="text-base text-nowrap">
        <span className="text-[13px] text-gray-dark">월 </span>
        {price.toLocaleString("ko-KR")}원
      </div>
    </label>
  );
};

export default Option;
