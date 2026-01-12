import { useEffect, useRef } from "react";

const NaverMaps = () => {
  const mapElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { naver } = window;
    if (!mapElement.current || !naver) return;

    // 부산시청 좌표로 테스트 (image_68a3b2.jpg에서 확인된 위치)
    const location = new naver.maps.LatLng(35.1795543, 129.0756416);

    const mapOptions = {
      center: location,
      zoom: 16,
    };

    const map = new naver.maps.Map(mapElement.current, mapOptions);

    new naver.maps.Marker({
      position: location,
      map: map,
    });
  }, []);

  return (
    <div className="flex flex-col gap-3 px-4 mb-8">
      <h3 className="text-[17px] font-bold text-gray-900">위치</h3>

      <div 
        ref={mapElement} 
        className="w-full h-[250px] rounded-xl bg-gray-100 shadow-sm border border-gray-100" 
        style={{ minHeight: "250px" }}
      />
    </div>
  );
};

export default NaverMaps;