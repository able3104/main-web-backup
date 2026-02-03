import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import NaverMapBox from "../../../../common/NaverMapBox";
import { normalizeCarrierName } from "../../../../../utils/carrierUtils";

// 대리점 상세 정보 인터페이스
interface AgencyDetail {
  agency_id: number;
  agency_name: string;
  agency_address: string;
  agency_latitude: number;
  agency_longitude: number;
  agency_phone_number: string;
  phone_name: string;
  phone_brand: string;
  phone_price: number;
  phone_original_price: number;
  phone_image: string;
}

const NaverMaps = () => {
  const [agency, setAgency] = useState<AgencyDetail | null>(null);
  const [searchParams] = useSearchParams();

  // URL 파라미터에서 요청에 필요한 정보들을 추출
  const agencyId = searchParams.get("agency_id");
  const phoneBrand = searchParams.get("phone_brand") || "undefined";
  const phoneName = searchParams.get("phone_name") || "갤럭시S25";
  const telecom = searchParams.get("telecom") || "SKT";
  const subscriptionType = searchParams.get("subscription_type") || "번호이동";

  useEffect(() => {
    const fetchAgencyDetail = async () => {
      try {
        const response = await axios.post(`https://api.yo-jeong.com/user/getAgencyDetail`, {
          agency_id: Number(agencyId),
          phone_brand: phoneBrand,
          phone_name: phoneName,
          telecom: normalizeCarrierName(telecom),
          subscription_type: subscriptionType
        });
        
        setAgency(response.data);
      } catch (error) {
        console.error("매장 상세 정보 로드 실패:", error);
      }
    };

    if (agencyId) {
      fetchAgencyDetail();
    }
  }, [agencyId, phoneBrand, phoneName, telecom, subscriptionType]);

  return (
    <div className="flex flex-col gap-4 px-4">
      <h2 className="text-xl font-semibold h-6">위치</h2>
      {agency ? (
        <NaverMapBox
          latitude={agency.agency_latitude}
          longitude={agency.agency_longitude}
          zoomLevel={16}
          agencyName={agency.agency_name}
        />
      ) : (
        <div className="flex items-center justify-center w-full h-[400px] rounded-xl bg-gray-100 border border-gray-200">
          <p className="text-sm text-gray-500">위치 정보를 불러오는 중...</p>
        </div>
      )}
    </div>
  );
};

export default NaverMaps;