import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getQuoteApi, GetQuoteResponse } from "../../../../apis/quote";
import Header from "../../../layout/header";
import Content from "../../../layout/content";
import ProductHero from "../../shop/detail/section/productHero";
import FnqBanner from "../../shop/detail/section/fnqBanner";
import DiscountSelector from "../../shop/detail/section/discountSelector";
import BenefitCard from "../../shop/detail/section/benefitCard";
import ProcessStep from "../../shop/detail/section/processStep";
import PolicyAccordion from "../../shop/detail/section/policyAccordion";
import AgencyInfo from "./agencyInfo";
import QuoteDetail from "./quoteDetail";
import { getSubsidy } from "../../../../apis";
import { firstPhonePlans } from "../../../../contents/firstPhonePlanData";
import Footer from "../../../layout/footer";

const QuoteResultPage = () => {
  const navigate = useNavigate();
  const { quoteCode } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  const [selectedDiscounts, setSelectedDiscounts] = useState<number[]>([0]);
  const [quoteDetail, setQuoteDetail] = useState<GetQuoteResponse | null>(null);

  const [commonDiscount, setCommonDiscount] = useState(0);

  const firstPlanPrice = useMemo(() => {
    return quoteDetail?.telecom
      ? firstPhonePlans[quoteDetail.telecom as keyof typeof firstPhonePlans]
      : firstPhonePlans["SKT"];
  }, [quoteDetail?.telecom]);

  useEffect(() => {
    // 공통 할인금액(공시지원금) 조회
    const fetchCommonDiscount = async () => {
      try {
        const amount = await getSubsidy(quoteDetail?.telecom || "SKT");
        setCommonDiscount(amount);
      } catch (error) {
        console.error("Failed to fetch common discount:", error);
      }
    };
    fetchCommonDiscount();
  }, [quoteDetail?.telecom]);

  useEffect(() => {
    // quoteCode를 이용해 견적 결과를 불러오는 로직을 여기에 작성합니다.
    const fetchQuoteResult = async () => {
      if (!quoteCode) return;
      setIsLoading(true);

      try {
        // API 호출 예시
        const data = await getQuoteApi(quoteCode);
        setQuoteDetail(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching quote result:", error);
      }
      setIsLoading(false);
    };

    fetchQuoteResult();
  }, [quoteCode]);

  return (
    <>
      <Header
        title={isLoading ? "대리점 정보 조회중" : quoteDetail?.agencyName || ""}
        subTitle={
          isLoading ? "잠시만 기다려주세요." : quoteDetail?.agencyAddress
        }
        backButton
        backButtonHandler={() => navigate(-1)}
      />
      <Content className="px-0 pt-4 bg-white">
        {isLoading ? (
          <p className="text-base font-semibold text-gray-dark">
            대리점 정보를 불러오는 중입니다...
          </p>
        ) : quoteDetail ? (
          <div className="flex flex-col gap-5">
            <AgencyInfo
              agencyName={quoteDetail.agencyName}
              agencyAddress={quoteDetail.agencyAddress}
              agencyPhone={quoteDetail.agencyPhoneNumber}
              quoteCode={quoteCode || ""}
              authTag={quoteDetail.authTag}
            />
            <ProductHero imageUrl={quoteDetail.phoneImage} {...quoteDetail} />
            <FnqBanner />
            <QuoteDetail
              month={24}
              phoneOriginalPrice={quoteDetail.phoneOriginalPrice}
              phonePrice={quoteDetail.phonePrice}
              commonDiscountPrice={commonDiscount}
              firstPhonePlanPrice={firstPlanPrice}
              selectedPhonePlanPrice={quoteDetail.phonePlan.price}
            />
            <DiscountSelector
              selectedDiscounts={selectedDiscounts}
              setSelectedDiscounts={setSelectedDiscounts}
            />
            <BenefitCard />
            <ProcessStep />
            <PolicyAccordion />
          </div>
        ) : (
          <p className="text-base font-semibold text-gray-dark">
            견적 정보를 불러오지 못했습니다.
          </p>
        )}
      </Content>
      <Footer />
      {/* <BottomCTABar>
        <button
          className={cn(
            "w-full h-14 bg-blue-primary rounded-2xl",
            "text-white font-semibold"
          )}
          onClick={handleQuoteButtonClick}
        >
          견적서 받고 최저가로 바로 개통!
        </button>
      </BottomCTABar> */}
    </>
  );
};

export default QuoteResultPage;
