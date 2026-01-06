import { cn } from "cn-func";
import SectionHeader from "./header";
import {
  process0,
  process1,
  process2,
  process3,
} from "../../../../../assets/images";

const processSteps = [
  {
    icon: process0,
    title: "견적서 발급",
    description: "아래 버튼을 눌러 견적서를 받아주세요.",
  },
  {
    icon: process1,
    title: "대리점 방문",
    description: "꼭! 견적서에 나온 위치로 방문해주세요.",
  },
  {
    icon: process2,
    title: "견적서 제시 후 개통 진행",
    description: "견적서를 제시하면 동일 조건 개통 가능합니다.",
  },
  {
    icon: process3,
    title: "개통 완료",
    description: "개통 절차가 모두 끝났습니다.",
  },
];

const ProcessStep = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <SectionHeader
        title="요정의 서비스는 어떻게 진행되나요?"
        description="현재 보고 계신 대리점은 오프라인에서만 개통이 가능해요."
      />
      <div className={cn("flex flex-col", "border-l border-blue-primary")}>
        {processSteps.map((step, index) => (
          <div
            key={index}
            className="flex flex-row items-center gap-2.5 px-5 py-2"
          >
            <img src={step.icon} alt={step.title} width={40} height={40} />
            <div className="flex-1 flex flex-col">
              <p
                className={cn(
                  "text-base font-semibold",
                  index === 2 && "text-blue-primary"
                )}
              >
                {index + 1}. {step.title}
              </p>
              <p className="text-sm text-gray-dark font-light">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProcessStep;
