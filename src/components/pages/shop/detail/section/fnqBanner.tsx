import { cn } from "cn-func";
import { useState } from "react";

const fnqs = [
  {
    label: "요금제 유지기간",
    value: [
      {
        question: "비싼 요금제는 얼마나 써야하나요?",
        answer: `요금제 최소 6개월만 유지해주시면 돼요.
그 이후에는 자유롭게 변경하셔도 괜찮아요.`,
      },
    ],
  },
  {
    label: "약정 기간",
    value: [
      {
        question: "약정 기간은 어떻게 되나요?",
        answer: `약정은 기본 24개월로 진행돼요.`,
      },
    ],
  },
  {
    label: "부가서비스",
    value: [
      {
        question: "부가서비스는 꼭 가입해야 하나요?",
        answer: `요정 견적은 모든 부가서비스를 제외한 조건으로 안내돼요.`,
      },
    ],
  },
  {
    label: "카드 발급",
    value: [
      {
        question: "카드 발급은 꼭 해야 하나요?",
        answer: `새로 카드 발급은 필요 없어요.`,
      },
    ],
  },
  {
    label: "기기 반납",
    value: [
      {
        question: "기기 반납을 해야하나요?",
        answer: `기기 반납 없이 진행되는 조건이에요.`,
      },
    ],
  },
];

const FnqBanner = () => {
  const [selectedFnq, setSelectedFnq] = useState<number>(0);

  return (
    <div
      className={cn(
        "flex flex-col",
        "overflow-hidden my-4",
        "border-y border-gray-light",
        "divide-y divide-gray-light"
      )}
    >
      <div className="flex flex-row gap-2 w-full px-4 py-3 overflow-x-scroll text-sm">
        {fnqs.map((fnq, index) => (
          <button
            key={index}
            className={cn(
              "px-3 py-2 rounded-full whitespace-nowrap font-medium",
              selectedFnq === index
                ? "bg-blue-primary text-white"
                : "bg-blue-tertiary text-gray-dark"
            )}
            onClick={() => setSelectedFnq(index)}
          >
            {fnq.label}
          </button>
        ))}
      </div>
      <div className="bg-blue-tertiary">
        {fnqs[selectedFnq].value.map((item, idx) => (
          <div key={idx} className="flex flex-col gap-2 p-4">
            <p className="text-blue-primary font-semibold">
              Q. {item.question}
            </p>
            <p className="text-[15px]/4 whitespace-pre-wrap">{item.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FnqBanner;
