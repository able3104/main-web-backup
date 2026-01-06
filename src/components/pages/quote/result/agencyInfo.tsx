import { cn } from "cn-func";
import { logo } from "../../../../assets/images";

interface AgencyInfoProps {
  agencyName: string;
  agencyAddress: string;
  agencyPhone: string;
  quoteCode: string;
  authTag: boolean;
}

const AgencyInfo = ({
  agencyName,
  agencyAddress,
  agencyPhone,
  quoteCode,
  authTag,
}: AgencyInfoProps) => {
  const handleCallAgency = () => {
    window.location.href = `tel:${agencyPhone}`;
  };
  const handleGetAddress = () => {
    window.location.href = `kakaomap://search?q=${agencyAddress}`;
  };

  return (
    <div className="flex flex-col gap-5 p-4 mx-4 border border-gray-light rounded-lg">
      <div className="flex flex-row gap-2 items-center">
        <p className="text-base font-medium">{agencyName}</p>
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
      <div className="flex flex-col text-center">
        <p className="text-lg font-medium">견적코드</p>
        <p className="text-[22px] font-semibold text-blue-primary">
          {quoteCode}
        </p>
        <p className="text-[13px] font-light text-gray-dark">
          유효기간: 발급일로부터 24시간
        </p>
      </div>
      <div className="flex flex-row gap-2.5 w-full text-[13px] text-blue-primary font-semibold">
        <button
          onClick={handleCallAgency}
          className="flex-1 p-2 bg-blue-tertiary rounded-lg"
        >
          전화하기
        </button>
        <button
          onClick={handleGetAddress}
          className="flex-1 p-2 bg-blue-tertiary rounded-lg"
        >
          길찾기
        </button>
      </div>
    </div>
  );
};

export default AgencyInfo;
