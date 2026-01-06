interface CalculatorDetailProps {
  month: number;
  phoneOriginalPrice: number;
  phonePrice: number;
  commonDiscountPrice: number;
  firstPhonePlanPrice: number;
  selectedPhonePlanPrice: number;
  footer?: boolean;
}

const CalculatorDetail = ({
  month,
  phoneOriginalPrice,
  phonePrice,
  commonDiscountPrice,
  firstPhonePlanPrice,
  selectedPhonePlanPrice,
  footer = false,
}: CalculatorDetailProps) => {
  return (
    <div className="flex flex-col gap-2 w-full px-5 py-4">
      <div className="flex flex-col gap-1">
        <div className="flex flex-row justify-between text-base font-medium">
          <span>단말기</span>
          <span>{phonePrice.toLocaleString("ko-KR")}원</span>
        </div>
        <div className="flex flex-col text-[13px] text-gray-dark">
          <div className="flex flex-row justify-between">
            <span>출고가</span>
            <span>{phoneOriginalPrice.toLocaleString("ko-KR")}원</span>
          </div>
          <div className="flex flex-row justify-between">
            <span className="flex items-center">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M5.5 5.5V10.5H10.5"
                  stroke="#A0A6AD"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              공통 지원금
            </span>
            <span className="text-blue-primary">
              {"- "}
              {commonDiscountPrice.toLocaleString("ko-KR")}원
            </span>
          </div>
          <div className="flex flex-row justify-between">
            <span className="flex items-center">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M5.5 5.5V10.5H10.5"
                  stroke="#A0A6AD"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              판매점 지원금
            </span>
            <span className="text-blue-primary">
              {"- "}
              {(
                phoneOriginalPrice -
                commonDiscountPrice -
                phonePrice
              ).toLocaleString("ko-KR")}
              원
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex flex-row justify-between text-base font-medium">
          <span>요금({month}개월)</span>
          <span>
            {(
              firstPhonePlanPrice * 6 +
              selectedPhonePlanPrice * (month - 6)
            ).toLocaleString("ko-KR")}
            원
          </span>
        </div>
        <div className="flex flex-col text-[13px] text-gray-dark">
          <div className="flex flex-row justify-between">
            <span>6개월 요금제</span>
            <span>{(firstPhonePlanPrice * 6).toLocaleString("ko-KR")}원</span>
          </div>
          <div className="flex flex-row justify-between">
            <span>{month - 6}개월 요금제</span>
            <span>
              {(selectedPhonePlanPrice * (month - 6)).toLocaleString("ko-KR")}원
            </span>
          </div>
        </div>
      </div>
      {footer && (
        <p className="text-center text-xs font-light text-gray-dark">
          예상 견적이며, 가입 조건에 따라 다를 수 있습니다.
        </p>
      )}
    </div>
  );
};

export default CalculatorDetail;
