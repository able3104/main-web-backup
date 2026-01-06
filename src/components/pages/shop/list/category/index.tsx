import { cn } from "cn-func";
import CategoryTag from "./tag";

interface CategoryProps {
  distance?: string;
  device?: string;
  switchCarrier?: boolean | null;
}

const Category = ({ distance, device, switchCarrier }: CategoryProps) => {
  return (
    <div
      className={cn(
        "sticky top-20",
        "flex flex-row gap-2",
        "px-4 py-3 bg-white overflow-x-scroll",
        "border-b border-gray-light"
      )}
    >
      {distance && (
        <CategoryTag>
          거리: <span className="font-medium">{distance}km</span>
        </CategoryTag>
      )}
      {device && (
        <CategoryTag>
          기종: <span className="font-medium">{device}</span>
        </CategoryTag>
      )}
      {switchCarrier !== null && (
        <CategoryTag>
          가입유형:{" "}
          <span className="font-medium">
            {switchCarrier ? "번호이동 | 기기변경 | 신규가입" : "기기변경"}
          </span>
        </CategoryTag>
      )}
    </div>
  );
};

export default Category;
