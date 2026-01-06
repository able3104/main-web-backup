import { cn } from "cn-func";
import Selection from "../../../common/selection";
import DeviceCard from "../../../card/device";
import { deviceData } from "../../../../contents/deviceData";
import { useAtom } from "jotai";
import { deviceDataTypeAtom, surveySelectedDeviceAtom } from "../atom";

type deviceDataType = "apple" | "samsung";

const SelectDevice = () => {
  const [selectedCompany, setSelectedCompany] = useAtom(deviceDataTypeAtom);
  const [selectedDevice, setSelectedDevice] = useAtom(surveySelectedDeviceAtom);

  const handleCompanyChange = (company: deviceDataType) => {
    if (company === selectedCompany) return;
    setSelectedCompany(company);
  };
  return (
    <div className="flex flex-col gap-2">
      <div
        className={cn(
          "relative flex flex-row",
          "h-9 bg-blue-secondary rounded-xl",
          "text-sm text-gray-normal"
        )}
      >
        <button
          className={cn(
            "flex-1 z-20",
            selectedCompany === "apple" && "text-blue-primary font-semibold"
          )}
          onClick={() => handleCompanyChange("apple")}
        >
          아이폰
        </button>
        <button
          className={cn(
            "flex-1 z-20",
            selectedCompany === "samsung" && "text-blue-primary font-semibold"
          )}
          onClick={() => handleCompanyChange("samsung")}
        >
          갤럭시
        </button>
        <div
          className={cn(
            "absolute left-0 top-0 z-10",
            "w-1/2 h-full bg-white rounded-xl",
            "transition-transform duration-200",
            selectedCompany === "samsung" && "translate-x-full"
          )}
        />
      </div>
      <Selection.Group onChange={setSelectedDevice} selectedId={selectedDevice}>
        {deviceData[selectedCompany as keyof typeof deviceData].map(
          (device) => (
            <Selection.Item key={device.phoneName} id={device.phoneName}>
              <DeviceCard
                image={device.phoneImage}
                name={device.phoneName}
                colors={device.phoneColors}
              />
            </Selection.Item>
          )
        )}
      </Selection.Group>
    </div>
  );
};

export default SelectDevice;
