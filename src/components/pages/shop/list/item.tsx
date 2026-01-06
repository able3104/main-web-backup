import { cn } from "cn-func";
import { AgencyInfo } from "../../../../apis";
import { logo } from "../../../../assets/images";
import { Link } from "react-router-dom";
import StarIcon from "../../../icons/star";

const ShopListItem = ({
  agencyId,
  agencyName,
  agencyRating,
  telecom,
  subscriptionType,
  phoneBrand,
  phoneName,
  phonePrice,
  authTag,
}: AgencyInfo) => {
  return (
    <Link
      to={`/shop/detail?agency_id=${agencyId}&phone_brand=${phoneBrand}&phone_name=${phoneName}&telecom=${telecom}&subscription_type=${subscriptionType}`}
      className={cn(
        "flex flex-col gap-6",
        "px-5 py-4 bg-white cursor-pointer",
        "border border-gray-light rounded-2xl"
      )}
    >
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row gap-2 items-center">
          <p className="font-medium text-base">{agencyName}</p>
          {agencyRating && (
            <span className="flex items-center gap-1 text-gray-dark">
              <StarIcon size={12} color="#FFD233" />({agencyRating})
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {authTag && (
            <span
              className={cn(
                "flex items-center gap-1",
                "px-2 py-0.5 bg-blue-tertiary rounded-full",
                "text-[13px] font-medium"
              )}
            >
              <img src={logo} alt="logo" width={16} />
              인증 대리점
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-row items-center justify-between">
        <p className="text-gray-dark text-[13px]">
          {telecom} | {subscriptionType}
        </p>
        <div className="flex flex-row items-center text-[13px]">
          <p className="text-gray-dark mr-1">기기값</p>
          <span className="text-xl text-blue-primary font-semibold">
            {phonePrice.toLocaleString("ko-KR")}
          </span>
          <p>원</p>
        </div>
      </div>
    </Link>
  );
};

export default ShopListItem;
