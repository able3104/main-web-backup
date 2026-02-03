import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import Header from "../../../layout/header";
import Content from "../../../layout/content";
import { useEffect, useState } from "react";
import { AgencyInfo, searchAgenciesApi } from "../../../../apis";
import { normalizeCarrierName } from "../../../../utils/carrierUtils";
import Category from "./category";
import { AxiosError } from "axios";
import ShopListItem from "./item";
import Footer from "../../../layout/footer";

const ShopListPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState<string | null>(null);
  const [agencies, setAgencies] = useState<AgencyInfo[]>([]);

  const brand = searchParams.get("brand");
  const device = searchParams.get("device");
  const carrier = searchParams.get("carrier");
  const switchCarrier = searchParams.get("switchCarrier") === "true";

  useEffect(() => {
    // TODO : 여기서 device, carrier, switchCarrier로 Api 호출해서 데이터 가져오기

    const fetchData = async () => {
      if (!brand || !device || !carrier || switchCarrier === null) return;
      setIsLoading(true);
      try {
        const res = await searchAgenciesApi({
          phoneBrand: brand,
          phoneName: device,
          telecom: normalizeCarrierName(carrier),
          canChangeTelecom: switchCarrier,
        });
        setAgencies(res.agency);
        setIsLoading(false);
      } catch (error) {
        if (error instanceof AxiosError) {
          console.error("API Error:", error.response?.data);
          setIsError(
            error.response?.status === 404
              ? "조건에 맞는 대리점이 없습니다."
              : "대리점 정보를 불러오는 중 오류가 발생했습니다."
          );
          setIsLoading(false);
        } else {
          console.error("Unexpected Error:", error);
          setIsError("대리점 정보를 불러오는 중 오류가 발생했습니다.");
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, [brand, device, carrier, switchCarrier]);

  if (!brand || !device || !carrier || switchCarrier === null) {
    return <Navigate to="/survey" />;
  }

  return (
    <>
      <Header
        title="주변 최저가 대리점을 찾았어요!"
        subTitle="가격이 다르면 차액을 환불해드려요."
        backButton
        backButtonHandler={() => navigate(-1)}
      />
      <Content className="p-0">
        <Category device={device} switchCarrier={switchCarrier} />
        <div className="p-4">
          {isLoading ? (
            <div>Loading...</div>
          ) : isError ? (
            <div className="text-center font-semibold text-red-500">
              {isError}
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {agencies.length === 0 ? (
                <div className="text-center font-semibold text-gray-dark">
                  조건에 맞는 대리점이 없습니다.
                </div>
              ) : (
                agencies.map((agency, index) => (
                  <ShopListItem key={index} {...agency} />
                ))
              )}
            </div>
          )}
        </div>
      </Content>
      <Footer />
    </>
  );
};

export default ShopListPage;
