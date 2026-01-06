import CalculatorDetail from "../../../common/modal/calculator/detail";
import SectionHeader from "../../shop/detail/section/header";

interface QuoteDetailProps {
  month: number;
  phoneOriginalPrice: number;
  phonePrice: number;
  commonDiscountPrice: number;
  firstPhonePlanPrice: number;
  selectedPhonePlanPrice: number;
}

const QuoteDetail = (props: QuoteDetailProps) => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <SectionHeader title="세부 견적 내용" />
      <div className="border border-gray-light rounded-2xl">
        <CalculatorDetail {...props} />
      </div>
    </div>
  );
};

export default QuoteDetail;
