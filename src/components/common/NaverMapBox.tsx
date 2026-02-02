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

  useEffect(() => {
    // 인증 실패 콜백 설정
    window.navermap_authFailure = () => {
      console.error("네이버 지도 API 인증 실패");
      setMapError("지도 API 인증에 실패했습니다. 관리자에게 문의하세요.");
    };

    return () => {
      delete window.navermap_authFailure;
    };
  }, []);

  useEffect(() => {
    // 네이버 지도 API가 로드되지 않았으면 대기
    if (!window.naver || !window.naver.maps) {
      console.warn("네이버 지도 API가 아직 로드되지 않았습니다.");
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
  }, [latitude, longitude, zoomLevel, agencyName]);

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
