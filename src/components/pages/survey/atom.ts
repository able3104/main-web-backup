import { atomWithStorage } from "jotai/utils";

type deviceDataType = "apple" | "samsung";

const deviceDataTypeAtom = atomWithStorage<deviceDataType>(
  "surveyDeviceDataType",
  "apple"
);

const surveySelectedDeviceAtom = atomWithStorage<string | null>(
  "surveySelectedDevice",
  null
);
const surveySelectedCarrierAtom = atomWithStorage<string | null>(
  "surveySelectedCarrier",
  null
);
const surveySelectedSwitchCarrierAtom = atomWithStorage<string | null>(
  "surveySelectedSwitchCarrier",
  null
);

export {
  deviceDataTypeAtom,
  surveySelectedDeviceAtom,
  surveySelectedCarrierAtom,
  surveySelectedSwitchCarrierAtom,
};
