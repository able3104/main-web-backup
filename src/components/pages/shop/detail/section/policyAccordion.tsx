import { useState } from "react";
import ArrowIcon from "../../../../icons/arrow";
import SectionHeader from "./header";
import { cn } from "cn-func";

const policies = [
  {
    title: "공통 안내",
    content: [
      "요정은 스마트폰 판매점을 중개하는 플랫폼이며, 개통·계약의 직접 당사자가 아닙니다.",
      "기기 개통, 요금제 선택, 약정 조건 등 최종 계약 내용은 판매점에서 확정됩니다.",
      "판매점별 혜택·재고·프로모션은 상황에 따라 변경될 수 있습니다.",
      "계약 전, 판매점이 제공하는 최종 조건을 반드시 확인해 주세요.",
      "계약 전, 판매점이 제공하는 최종 조건을 반드시 확인해 주세요. 확인 미흡으로 발생한 문제에 대해서는 책임을 부담할 수 없습니다.",
    ],
  },
  {
    title: "견적 안내",
    content: [
      "요정에서 제공되는 견적의 유효기간은 발급 후 24시간입니다.",
      "실제 개통 시 적용되는 금액은 판매점에서 최종 확정됩니다.",
      "견적 내용의 최종 확인 책임은 고객 본인에게 있습니다.",
      "견적과 실제 조건이 다를 경우, 판매점 안내를 기준으로 계약이 진행됩니다.",
    ],
  },
  {
    title: "요정 보장 안내",
    content: [
      "견적 유효기간(24시간) 경과 후에는 보장이 적용되지 않습니다.",
      "가격 차이가 발생한 경우, 최대 3만원 한도 내에서 보장됩니다.",
      "보장은 판매점 방문 시점의 실제 조건과 요정 견적이 명확히 비교 가능한 경우에만 적용됩니다.",
    ],
  },
];

const PolicyAccordion = () => {
  return (
    <div className="flex flex-col gap-4 py-4">
      <div className="px-4">
        <SectionHeader title="유의사항" />
      </div>
      <div className="flex flex-col">
        {policies.map((policy, index) => (
          <PolicyItem
            key={index}
            title={policy.title}
            content={policy.content}
          />
        ))}
      </div>
    </div>
  );
};

const PolicyItem = ({
  title,
  content,
}: {
  title: string;
  content: string[];
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="flex flex-col">
      <button className="flex justify-between px-4 py-3" onClick={handleToggle}>
        <span className="text-base font-semibold">{title}</span>
        <ArrowIcon direction={isOpen ? "up" : "down"} />
      </button>
      <div
        className={cn(
          "w-full bg-blue-tertiary",
          "overflow-hidden transition-all duration-300",
          isOpen ? "max-h-80" : "max-h-0"
        )}
      >
        <div className="flex flex-col gap-1 px-4 py-3">
          {content.map((line, index) => (
            <div key={index} className="flex items-start">
              <div className="flex items-center justify-center w-5 h-5">
                <div className="w-[3px] h-[3px] bg-gray-dark rounded-full" />
              </div>
              <p className="flex-1 text-[13px]/4 text-gray-dark">{line}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PolicyAccordion;
