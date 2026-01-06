import { useAtom } from "jotai";
import { calculatorModalAtom } from "./atom";
import { cn } from "cn-func";
import CalculatorDetail from "./detail";

const CalculatorModal = () => {
  const [modal, setModal] = useAtom(calculatorModalAtom);
  const {
    isOpen,
    month,
    phonePrice,
    firstPhonePlanPrice,
    selectedPhonePlanPrice,
  } = modal;

  const handleClose = () => {
    setModal({
      isOpen: false,
      month: 0,
      phonePrice: 0,
      phoneOriginalPrice: 0,
      commonDiscountPrice: 0,
      firstPhonePlanPrice: 0,
      selectedPhonePlanPrice: 0,
    });
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-100" onClick={handleClose} />
      <div
        className={cn(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
          "flex flex-col items-center z-110",
          "w-9/10 max-w-96 bg-white rounded-2xl overflow-hidden"
        )}
      >
        <div className="flex flex-col items-center w-full px-5 py-4 bg-blue-tertiary">
          <h2 className="text-lg font-medium">
            {month}개월간 매달 납부하실 금액은?
          </h2>
          <div className="flex items-center gap-1 text-base text-blue-primary">
            월
            <span className="text-[22px] font-semibold">
              {(
                (phonePrice +
                  firstPhonePlanPrice * 6 +
                  selectedPhonePlanPrice * (month - 6)) /
                month
              ).toLocaleString("ko-KR")}
              원
            </span>
          </div>
        </div>
        <CalculatorDetail {...modal} footer={true} />
      </div>
    </>
  );
};

export default CalculatorModal;
