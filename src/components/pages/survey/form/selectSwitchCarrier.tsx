import Selection from "../../../common/selection";
import { switchCarrierData } from "../../../../contents/switchCarrierData";
import TextCard from "../../../card/text";
import { useAtom } from "jotai";
import { surveySelectedSwitchCarrierAtom } from "../atom";

const SelectSwitchCarrier = () => {
  const [selectedSwitchCarrier, setSelectedSwitchCarrier] = useAtom(
    surveySelectedSwitchCarrierAtom
  );

  return (
    <Selection.Group
      onChange={setSelectedSwitchCarrier}
      selectedId={selectedSwitchCarrier}
    >
      {switchCarrierData.map((value) => (
        <Selection.Item key={value.title} id={value.title}>
          <TextCard {...value} />
        </Selection.Item>
      ))}
    </Selection.Group>
  );
};

export default SelectSwitchCarrier;
