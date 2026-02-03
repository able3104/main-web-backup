import { phonePlans } from "../../../../../contents/phonePlans";
import SectionHeader from "./header";

interface PhonePlanListProps {
  telecom: string;
}

const PhonePlanList = ({ telecom }: PhonePlanListProps) => {
  const plans = telecom ? phonePlans[telecom as keyof typeof phonePlans] : [];

  if (!plans || plans.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <SectionHeader title={`${telecom} 요금제`} />
      <div className="flex flex-col gap-3">
        {plans.map((plan, index) => (
          <div
            key={`${plan.name}-${index}`}
            className="flex flex-col gap-2 p-4 border border-gray-light rounded-xl hover:border-blue-primary transition-colors"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-gray-900">
                {plan.name}
              </h3>
              <p className="text-lg font-bold text-blue-primary">
                {plan.price.toLocaleString("ko-KR")}원
              </p>
            </div>
            <p className="text-sm text-gray-dark">{plan.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhonePlanList;
