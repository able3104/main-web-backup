import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { registerQuoteApi } from "../../../apis/quote";
import { auth } from "../../../firebase/config";

const QuotePage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const agencyId = searchParams.get("agency_id");
  const phoneBrand = searchParams.get("phone_brand");
  const phoneName = searchParams.get("phone_name");
  const phonePrice = searchParams.get("phone_price");
  const phonePlan = JSON.parse(searchParams.get("phone_plan") || "{}");
  const discount = JSON.parse(searchParams.get("discount") || "[]");
  const subscriptionType = searchParams.get("subscription_type");
  const telecom = searchParams.get("telecom");

  const userName = auth.currentUser?.displayName || "사용자";

  useEffect(() => {
    // 여기에서 파라미터를 기반으로 견적서 발급 API 요청을 수행합니다.
    const fetchQuote = async () => {
      if (
        !agencyId ||
        !phoneBrand ||
        !phoneName ||
        !phonePrice ||
        !phonePlan ||
        !discount ||
        !subscriptionType ||
        !telecom
      )
        return;
      try {
        const res = await registerQuoteApi({
          agencyId: Number(agencyId),
          phoneBrand: phoneBrand,
          phoneName: phoneName,
          phonePlan: phonePlan,
          phonePrice: Number(phonePrice),
          discount: discount,
          subscriptionType: subscriptionType,
          telecom: telecom,
          customerName: userName,
        });

        navigate(`/quote/result/${res.quoteCode}`, { replace: true });
      } catch (error) {
        console.error("Error registering quote:", error);
        alert("견적서 발급에 실패했습니다. 다시 시도해주세요.");
        navigate(-1);
      }
    };

    fetchQuote();
  }, [agencyId, phoneBrand, phoneName, phonePrice, phonePlan, discount]);

  return null;
};

export default QuotePage;
