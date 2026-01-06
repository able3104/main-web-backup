import { useState } from "react";
import Header from "../../layout/header";
import SelectCarrier from "./form/selectCarrier";
import SelectDevice from "./form/selectDevice";
import BottomCTABar from "../../layout/bottomCTABar";
import Content from "../../layout/content";
import SelectSwitchCarrier from "./form/selectSwitchCarrier";
import SurveyProgressBar from "./progressBar";
import { useNavigate } from "react-router-dom";
import { useAtom, useAtomValue } from "jotai";
import {
  deviceDataTypeAtom,
  surveySelectedCarrierAtom,
  surveySelectedDeviceAtom,
  surveySelectedSwitchCarrierAtom,
} from "./atom";
import { switchCarrierData } from "../../../contents/switchCarrierData";
import { cn } from "cn-func";

const SurveyPage = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const selectedCompany = useAtomValue(deviceDataTypeAtom);
  const [selectedDevice, setSelectedDevice] = useAtom(surveySelectedDeviceAtom);
  const [selectedCarrier, setSelectedCarrier] = useAtom(
    surveySelectedCarrierAtom
  );
  const [selectedSwitchCarrier, setSelectedSwitchCarrier] = useAtom(
    surveySelectedSwitchCarrierAtom
  );

  const surveyForms = [
    {
      header: {
        title: "어떤 스마트폰을 원하시나요?",
        subTitle: "요정이 최저가로 찾아줄게요!",
        backButton: false,
      },
      content: <SelectDevice />,
      buttonText: "다음으로",
      buttonFunction: () => {
        if (!selectedDevice) return;
        setCurrentIndex(currentIndex + 1);
      },
    },
    {
      header: {
        title: "현재 사용 중인 통신사가 어디인가요?",
        subTitle: "최저가 분석을 위해 꼭 알아야해요.",
        backButton: true,
        backButtonHandler: () => {
          setCurrentIndex(currentIndex - 1);
        },
      },
      content: <SelectCarrier />,
      buttonText: "다음으로",
      buttonFunction: () => {
        if (!selectedCarrier) return;
        setCurrentIndex(currentIndex + 1);
      },
    },
    {
      header: {
        title: "통신사를 변경해도 되나요?",
        subTitle: "통신사를 변경하면 더 좋은 혜택을 받아요.",
        backButton: true,
        backButtonHandler: () => {
          setCurrentIndex(currentIndex - 1);
        },
      },
      content: <SelectSwitchCarrier />,
      buttonText: "내 주변 최저가 대리점 보러가기!",
      buttonFunction: () => {
        if (!selectedDevice || !selectedCarrier || !selectedSwitchCarrier)
          return;

        // 데이터 초기화 전 저장
        const data = {
          device: selectedDevice,
          carrier: selectedCarrier,
          switchCarrier: selectedSwitchCarrier === switchCarrierData[0].title,
        };

        // 값 초기화
        setSelectedDevice(null);
        setSelectedCarrier(null);
        setSelectedSwitchCarrier(null);

        navigate(
          `/shop/list?brand=${selectedCompany}&device=${data.device}&carrier=${data.carrier}&switchCarrier=${data.switchCarrier}`
        );
      },
    },
  ];
  return (
    <>
      <Header {...surveyForms[currentIndex].header} />
      <Content bottomCTABar>{surveyForms[currentIndex].content}</Content>
      <BottomCTABar>
        <SurveyProgressBar
          currentIndex={currentIndex}
          maxIndex={surveyForms.length}
        />
        <button
          className={cn(
            "w-full h-14 bg-blue-primary rounded-2xl",
            "text-white font-semibold",
            "disabled:bg-gray-light disabled:cursor-not-allowed"
          )}
          onClick={surveyForms[currentIndex].buttonFunction}
          disabled={
            (currentIndex === 0 && !selectedDevice) ||
            (currentIndex === 1 && !selectedCarrier) ||
            (currentIndex === 2 && !selectedSwitchCarrier)
          }
        >
          {surveyForms[currentIndex].buttonText}
        </button>
      </BottomCTABar>
    </>
  );
};

export default SurveyPage;
