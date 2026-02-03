import { useEffect, useRef, useState } from "react";

interface NaverMapBoxProps {
  latitude: number;
  longitude: number;
  zoomLevel?: number;
  agencyName?: string;
}

declare global {
  interface Window {
    naver: any;
    navermap_authFailure?: () => void;
  }
}

const NaverMapBox = ({ 
  latitude, 
  longitude, 
  zoomLevel = 16,
  agencyName = "위치"
}: NaverMapBoxProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [mapError, setMapError] = useState<string | null>(null);
  const [isApiLoaded, setIsApiLoaded] = useState(false);

  useEffect(() => {
    // 인증 실패 콜백 설정
    window.navermap_authFailure = () => {
      console.error("네이버 지도 API 인증 실패");
      setMapError("지도 API 인증에 실패했습니다. 관리자에게 문의하세요.");
    };

    // 네이버 지도 API 스크립트 동적 로드
    const loadNaverMapScript = () => {
      // 이미 로드되어 있는 경우
      if (window.naver && window.naver.maps) {
        console.log("네이버 지도 API 이미 로드됨");
        setIsApiLoaded(true);
        return;
      }

      // 이미 스크립트 태그가 있는지 확인
      const existingScript = document.querySelector('script[src*="oapi.map.naver.com"]');
      if (existingScript) {
        console.log("네이버 지도 스크립트 로딩 대기 중...");
        const checkApiLoaded = () => {
          if (window.naver && window.naver.maps) {
            console.log("네이버 지도 API 로드 완료");
            setIsApiLoaded(true);
          } else {
            setTimeout(checkApiLoaded, 100);
          }
        };
        checkApiLoaded();
        return;
      }

      // 새로운 스크립트 로드
      const clientId = import.meta.env.VITE_NAVER_MAP_CLIENT_ID;
      if (!clientId) {
        console.error("네이버 지도 클라이언트 ID가 설정되지 않았습니다.");
        setMapError("지도 API 설정 오류");
        return;
      }

      const script = document.createElement("script");
      script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${clientId}`;
      script.async = true;
      script.onload = () => {
        console.log("네이버 지도 스크립트 로드 성공");
        setIsApiLoaded(true);
      };
      script.onerror = () => {
        console.error("네이버 지도 스크립트 로드 실패");
        setMapError("지도 API를 불러올 수 없습니다.");
      };
      document.head.appendChild(script);
    };

    loadNaverMapScript();

    return () => {
      delete window.navermap_authFailure;
    };
  }, []);

  useEffect(() => {
    // API가 로드되지 않았으면 대기
    if (!isApiLoaded) {
      return;
    }

    if (!mapRef.current) return;

    try {
      // 지도 옵션 설정 (공식 문서 형식)
      const mapOptions = {
        center: new window.naver.maps.LatLng(latitude, longitude),
        zoom: zoomLevel,
        minZoom: 10,
        zoomControl: true,
        zoomControlOptions: {
          position: window.naver.maps.Position.TOP_RIGHT,
        },
      };

      // 지도 생성
      const map = new window.naver.maps.Map(mapRef.current, mapOptions);
      mapInstanceRef.current = map;

      // 마커 생성
      new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(latitude, longitude),
        map: map,
        title: agencyName,
      });

      console.log("네이버 지도 초기화 완료:", { latitude, longitude, agencyName });
    } catch (error) {
      console.error("네이버 지도 초기화 실패:", error);
      setMapError("지도를 불러오는 중 오류가 발생했습니다.");
    }

    // cleanup
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.destroy();
      }
    };
  }, [isApiLoaded, latitude, longitude, zoomLevel, agencyName]);

  if (mapError) {
    return (
      <div className="flex items-center justify-center w-full h-[400px] rounded-xl bg-red-50 border border-red-200">
        <div className="text-center px-4">
          <p className="text-sm text-red-600 font-medium">{mapError}</p>
          <p className="text-xs text-red-500 mt-2">Client ID를 확인해주세요</p>
        </div>
      </div>
    );
  }

  // API 로딩 중일 때
  if (!isApiLoaded) {
    return (
      <div className="flex items-center justify-center w-full h-[400px] rounded-xl bg-gray-100 border border-gray-200">
        <div className="text-center px-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-primary mx-auto mb-2"></div>
          <p className="text-sm text-gray-500">지도를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={mapRef}
      style={{
        width: "100%",
        height: "400px",
        borderRadius: "0.75rem",
        overflow: "hidden",
        border: "1px solid #e5e7eb",
      }}
    />
  );
};

export default NaverMapBox;
