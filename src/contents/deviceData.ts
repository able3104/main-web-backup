import {
  GalaxyS25EdgeImage,
  GalaxyS25Image,
  GalaxyS25PlusImage,
  GalaxyS25UltraImage,
  GalaxyZFlip7Image,
  GalaxyZFold7Image,
  IPhone16Image,
  IPhone16PlusImage,
  IPhone16ProImage,
  IPhone16ProMaxImage,
  IPhone17AirImage,
  IPhone17Image,
  IPhone17ProImage,
  IPhone17ProMaxImage,
} from "../assets/images/device";

export const deviceData = {
  apple: [
    {
      phoneName: "아이폰 17 Pro Max",
      phoneBrand: "애플",
      phoneColors: ["#32374A", "#F77E2D", "#F5F5F5"],
      phoneImage: IPhone17ProMaxImage,
    },

    {
      phoneName: "아이폰 17 Pro",
      phoneBrand: "애플",
      phoneColors: ["#32374A", "#F77E2D", "#F5F5F5"],
      phoneImage: IPhone17ProImage,
    },

    {
      phoneName: "아이폰 17 Air",
      phoneBrand: "애플",
      phoneColors: ["#F0F9FF", "#FFFCF5", "#FCFCFC", "#000000"],
      phoneImage: IPhone17AirImage,
    },

    {
      phoneName: "아이폰 17",
      phoneBrand: "애플",
      phoneColors: ["#C7D1AC", "#EFE4F4", "#BBCBE2", "#FCFCFC", "#000000"],
      phoneImage: IPhone17Image,
    },

    {
      phoneName: "아이폰 16 Pro Max",
      phoneBrand: "애플",
      phoneColors: ["#C2BCB2", "#BFA48F", "#FCFCFC", "#000000"],
      phoneImage: IPhone16ProMaxImage,
    },

    {
      phoneName: "아이폰 16 Pro",
      phoneBrand: "애플",
      phoneColors: ["#C2BCB2", "#BFA48F", "#FCFCFC", "#000000"],
      phoneImage: IPhone16ProImage,
    },

    {
      phoneName: "아이폰 16 Plus",
      phoneBrand: "애플",
      phoneColors: ["#ECA1D1", "#BBCBE2", "#95D4D2", "#FCFCFC", "#000000"],
      phoneImage: IPhone16PlusImage,
    },

    {
      phoneName: "아이폰 16",
      phoneBrand: "애플",
      phoneColors: ["#ECA1D1", "#BBCBE2", "#95D4D2", "#FCFCFC", "#000000"],
      phoneImage: IPhone16Image,
    },
  ],
  samsung: [
    {
      phoneName: "갤럭시 Z 폴드7",
      phoneBrand: "삼성",
      phoneColors: ["#2B3A69", "#F5F5F5", "#000000"],
      phoneImage: GalaxyZFold7Image,
    },

    {
      phoneName: "갤럭시 Z 플립7",
      phoneBrand: "삼성",
      phoneColors: ["#F76A6B", "#2B3A69", "#000000"],
      phoneImage: GalaxyZFlip7Image,
    },

    {
      phoneName: "갤럭시S25 울트라",
      phoneBrand: "삼성",
      phoneColors: ["#B9C2D2", "#F5F5F5", "#000000"],
      phoneImage: GalaxyS25UltraImage,
    },

    {
      phoneName: "갤럭시S25 엣지",
      phoneBrand: "삼성",
      phoneColors: ["#B9C2D2", "#F5F5F5", "#FCFCFC", "#000000"],
      phoneImage: GalaxyS25EdgeImage,
    },

    {
      phoneName: "갤럭시S25 +",
      phoneBrand: "삼성",
      phoneColors: ["#B9C2D2", "#BDCEC2", "#F5F5F5", "#000000"],
      phoneImage: GalaxyS25PlusImage,
    },

    {
      phoneName: "갤럭시S25",
      phoneBrand: "삼성",
      phoneColors: ["#B9C2D2", "#BDCEC2", "#F5F5F5", "#000000"],
      phoneImage: GalaxyS25Image,
    },
  ],
};
