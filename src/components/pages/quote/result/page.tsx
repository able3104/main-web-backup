import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getQuoteApi, GetQuoteResponse } from "../../../../apis/quote";
import { getSubsidy } from "../../../../apis";
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
import { firstPhonePlans } from "../../../../contents/firstPhonePlanData";


// Lazy load NaverMaps to prevent blocking during page transitions
const NaverMaps = lazy(() => import("./NaverMaps"));

const QuoteResultPage = () => {
  const navigate = useNavigate();
  const { quoteCode } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDiscounts, setSelectedDiscounts] = useState<number[]>([0]);
  const [commonDiscount, setCommonDiscount] = useState(0);

  // 데이터 상태 관리
  const [quoteDetail, setQuoteDetail] = useState<GetQuoteResponse | null>(null);

  // 요금제 가격 계산
  const firstPlanPrice = useMemo(() => {
    return quoteDetail?.telecom
      ? firstPhonePlans[quoteDetail.telecom as keyof typeof firstPhonePlans]
      : firstPhonePlans["SKT"];
  }, [quoteDetail?.telecom]);

  // 1. 견적서 정보 로드
  useEffect(() => {
    const fetchQuoteResult = async () => {
      if (!quoteCode) {
        setError("견적 코드가 없습니다.");
        setIsLoading(false);
        return;
      }
      
      console.log("견적 정보 로드 시작, quoteCode:", quoteCode);
      setIsLoading(true);
      setError(null);
      
      try {
        const data = await getQuoteApi(quoteCode);
        console.log("견적 정보 로드 성공:", data);
        setQuoteDetail(data);
      } catch (error: any) {
        console.error("견적 정보를 가져오는데 실패했습니다:", error);
        setError(error?.response?.data?.message || "견적 정보를 불러오는데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchQuoteResult();
  }, [quoteCode]);

  // 2. 공시지원금 로드
  useEffect(() => {
    const fetchCommonDiscount = async () => {
      if (!quoteDetail?.telecom) return;
      try {
        const amount = await getSubsidy(quoteDetail.telecom);
        setCommonDiscount(amount);
      } catch (error) {
        console.error("공시지원금 조회 실패:", error);
      }
    };
    fetchCommonDiscount();
  }, [quoteDetail?.telecom]);

  return (
    <>
      <Header
        title={isLoading ? "조회중" : quoteDetail?.agencyName || "견적 결과"}
        subTitle={
          isLoading ? "잠시만 기다려주세요." : quoteDetail?.agencyAddress
        }
        backButton
        backButtonHandler={() => navigate(-1)}
      />
      <Content className="px-0 pt-4 bg-white">
        {isLoading ? (
          <p className="text-base font-semibold text-gray-dark px-4 text-center py-10">
            정보를 불러오는 중입니다...
          </p>
        ) : error ? (
          <div className="py-20 text-center px-4">
            <p className="text-base font-semibold text-red-600 mb-2">
              오류가 발생했습니다
            </p>
            <p className="text-sm text-gray-dark mb-4">{error}</p>
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 bg-blue-primary text-white rounded-lg"
            >
              돌아가기
            </button>
          </div>
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


            {quoteDetail && (
              <Suspense
                fallback={
                  <div className="flex flex-col gap-4 px-4">
                    <h2 className="text-xl font-semibold h-6">위치</h2>
                    <div className="flex items-center justify-center w-full h-[400px] rounded-xl bg-gray-100 border border-gray-200">
                      <p className="text-sm text-gray-500">지도를 불러오는 중...</p>
                    </div>
                  </div>
                }
              >
                <NaverMaps
                  latitude={quoteDetail.agencyLatitude}
                  longitude={quoteDetail.agencyLongitude}
                  agencyName={quoteDetail.agencyName}
                />
              </Suspense>
            )}

            <PolicyAccordion />
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-base font-semibold text-gray-dark">
              견적 정보를 찾을 수 없습니다.
            </p>
          </div>
        )}
      </Content>
    </>
  );
};

export default QuoteResultPage;
