import SectionHeader from "./header";
import { cn } from "cn-func";

const discountOptions = [
  {
    title: "파손 보험가입",
    price: 10000,
  },
];

interface DiscountSelectorProps {
  selectedDiscounts: number[];
  setSelectedDiscounts: (discounts: number[]) => void;
}

const DiscountSelector = ({
  selectedDiscounts,
  setSelectedDiscounts,
}: DiscountSelectorProps) => {
  const handleToggleDiscount = (index: number) => {
    if (selectedDiscounts.includes(index)) {
      // 삭제는 불가능하게(기본 가입으로 지금은 작동함)
      // setSelectedDiscounts(
      //   selectedDiscounts.filter((discountIndex) => discountIndex !== index)
      // );
    } else {
      setSelectedDiscounts([...selectedDiscounts, index]);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <SectionHeader
        title="추가할인 혜택"
        description="선택 옵션으로, 가입 시 기기값이 추가 할인됩니다."
      />
      <div className="flex flex-col gap-2">
        {discountOptions.map((option, index) => (
          <label
            key={index}
            className={cn(
              "flex items-center gap-2",
              "px-5 py-3 bg-blue-tertiary",
              "rounded-lg cursor-pointer text-blue-primary",
              selectedDiscounts.includes(index) &&
                "outline-2 outline-blue-primary"
            )}
            onClick={() => handleToggleDiscount(index)}
          >
            <div className="w-2 h-2 rounded-full bg-blue-primary" />
            <p className="flex-1 font-semibold">{option.title}</p>
            <p>- {option.price.toLocaleString("ko-KR")}원</p>
          </label>
        ))}
      </div>
    </div>
  );
};

export default DiscountSelector;
