import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

// 1. 제공해주신 새로운 응답 데이터 구조에 맞춘 인터페이스 정의
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
  const mapElement = useRef<HTMLDivElement>(null);
  const [agency, setAgency] = useState<AgencyDetail | null>(null);
  const [searchParams] = useSearchParams();

  // 2. URL 파라미터에서 요청에 필요한 정보들을 추출
  const agencyId = searchParams.get("agency_id");
  const phoneBrand = searchParams.get("phone_brand") || "undefined";
  const phoneName = searchParams.get("phone_name") || "갤럭시S25";
  const telecom = searchParams.get("telecom") || "SKT";
  const subscriptionType = searchParams.get("subscription_type") || "번호이동";

  useEffect(() => {
    const fetchAgencyDetail = async () => {
      try {
        // [수정]: POST 방식으로 변경 및 요청 본문에 데이터 포함
        const response = await axios.post(`https://api.yo-jeong.com/user/getAgencyDetail`, {
          agency_id: Number(agencyId),
          phone_brand: phoneBrand,
          phone_name: phoneName,
          telecom: telecom,
          subscription_type: subscriptionType
        });
        
        // 응답 데이터를 상태에 저장
        setAgency(response.data);
      } catch (error) {
        console.error("매장 상세 정보 로드 실패 (POST):", error);
      }
    };

    if (agencyId) {
      fetchAgencyDetail();
    }
  }, [agencyId, phoneBrand, phoneName, telecom, subscriptionType]);

  useEffect(() => {
    const { naver } = window;
    // 매장 데이터가 로드되지 않았거나 네이버 객체가 없으면 중단
    if (!mapElement.current || !naver || !agency) return;

    // 3. 응답받은 agency_latitude, agency_longitude를 사용하여 중심점 설정
    const location = new naver.maps.LatLng(
      agency.agency_latitude, 
      agency.agency_longitude
    );

    const mapOptions = {
      center: location,
      zoom: 16,
      minZoom: 10,
      zoomControl: true,
    };

    const map = new naver.maps.Map(mapElement.current, mapOptions);

    // 4. 마커 생성: 응답받은 좌표와 매장명(agency_name) 사용
    new naver.maps.Marker({
      position: location,
      map: map,
      title: agency.agency_name,
      animation: naver.maps.Animation.DROP
    });

  }, [agency]); // agency 데이터가 업데이트될 때마다 지도 렌더링

  return (
    <div className="flex flex-col gap-3 px-4 mb-8">
      <h3 className="text-[17px] font-bold text-gray-900">위치</h3>
      <div 
        ref={mapElement} 
        className="w-full h-[300px] rounded-xl bg-gray-100 shadow-sm border border-gray-100" 
        style={{ minHeight: "300px" }}
      />
    </div>
  );
};

export default NaverMaps;