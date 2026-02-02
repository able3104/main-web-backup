import NaverMapBox from "../../../common/NaverMapBox";

// Props 타입 정의
interface NaverMapsProps {
  latitude: number;
  longitude: number;
  agencyName: string;
}

const NaverMaps = ({ latitude, longitude, agencyName }: NaverMapsProps) => {
  return (
    <div className="flex flex-col gap-4 px-4">
      <h2 className="text-xl font-semibold h-6">위치</h2>
      <NaverMapBox
        latitude={latitude}
        longitude={longitude}
        zoomLevel={16}
        agencyName={agencyName}
      />
    </div>
  );
};

export default NaverMaps;
