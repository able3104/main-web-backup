import { CircleQuestionMark } from "lucide-react";
import { benefit0, benefit1 } from "../../../../../assets/images";
import SectionHeader from "./header";
import { useSetAtom } from "jotai";
import { contentModalOpenAtom } from "../../../../common/modal/content/atom";

const BenefitCard = () => {
  const contentModalOpen = useSetAtom(contentModalOpenAtom);

  return (
    <div className="flex flex-col gap-4 p-4">
      <SectionHeader
        title="요정에서만 드리는 특별혜택!"
        description="요정 인증을 받은 대리점 전용 혜택이에요."
      />
      <div className="flex flex-row gap-20 justify-center">
        <div className="flex flex-col items-center">
          <img src={benefit0} alt="benefit0" width={120} height={120} />
          <button
            onClick={() =>
              contentModalOpen({
                imageUrl: benefit0,
                title: "요정 보장!",
                description: `대리점에 방문했는데 가격이 다르다면,
요정이 보장해드려요.`,
                footer: <p>세부 내용은 유의사항 참조</p>,
              })
            }
            className="flex justify-center items-center gap-1 w-full text-[15px] font-semibold"
          >
            요정 보장!
            <CircleQuestionMark size={12} className="text-gray-normal" />
          </button>
        </div>
        <div className="flex flex-col items-center">
          <img src={benefit1} alt="benefit1" width={120} height={120} />
          <button
            onClick={() =>
              contentModalOpen({
                imageUrl: benefit1,
                title: "쇼핑몰 쿠폰 제공",
                description: `취향에 맞는 케이스를 고르실 수 있도록
쇼핑몰 쿠폰 5,000원을 드려요.`,
                footer: (
                  <a
                    href="https://www.onmycase.co.kr"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ON MY CASE 둘러보기
                  </a>
                ),
              })
            }
            className="flex justify-center items-center gap-1 w-full text-[15px] font-semibold"
          >
            쇼핑몰 쿠폰 제공
            <CircleQuestionMark size={12} className="text-gray-normal" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BenefitCard;
