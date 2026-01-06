import Selection from "../../../common/selection";
import { carrierData } from "../../../../contents/carrierData";
import TextCard from "../../../card/text";
import { useAtom } from "jotai";
import { surveySelectedCarrierAtom } from "../atom";

const SelectCarrier = () => {
  const [selectedCarrier, setSelectedCarrier] = useAtom(
    surveySelectedCarrierAtom
  );

  return (
    <Selection.Group onChange={setSelectedCarrier} selectedId={selectedCarrier}>
      {carrierData.map((carrier) => (
        <Selection.Item key={carrier.title} id={carrier.title}>
          <TextCard {...carrier} />
        </Selection.Item>
      ))}
    </Selection.Group>
  );
};

export default SelectCarrier;
