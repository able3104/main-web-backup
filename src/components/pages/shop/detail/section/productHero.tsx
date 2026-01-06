import { cn } from "cn-func";
import { IPhone17ProMaxImage } from "../../../../../assets/images/device";

interface ProductHeroProps {
  imageUrl: string;
  phoneName: string;
  phonePrice: number;
  phoneOriginalPrice: number;
}

const ProductHero = ({
  imageUrl,
  phoneName,
  phonePrice,
  phoneOriginalPrice,
}: ProductHeroProps) => {
  return (
    <div className="p-4 flex flex-col items-center gap-3">
      <div className="relative">
        <img
          src={imageUrl || IPhone17ProMaxImage}
          alt="phone"
          width={200}
          height={200}
        />
        <span
          className={cn(
            "absolute bottom-4 right-2",
            "px-3 py-1 bg-blue-secondary rounded-full",
            "text-blue-primary text-[13px] font-medium"
          )}
        >
          {(phoneOriginalPrice - phonePrice).toLocaleString("ko-KR")}원 할인
        </span>
      </div>
      <p className="text-[22px] font-semibold">{phoneName}</p>
      <div className="flex flex-col items-center gap-1 pt-1">
        <p className="text-gray-normal text-base font-light line-through">
          {phoneOriginalPrice.toLocaleString("ko-KR")}원
        </p>
        <p className="text-2xl font-semibold">
          {phonePrice.toLocaleString("ko-KR")}원
        </p>
      </div>
    </div>
  );
};

export default ProductHero;
