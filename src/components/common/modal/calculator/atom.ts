import { atom } from "jotai";

interface CalculatorModalAtom {
  isOpen: boolean;
  month: number;
  phonePrice: number;
  phoneOriginalPrice: number;
  commonDiscountPrice: number;
  firstPhonePlanPrice: number;
  selectedPhonePlanPrice: number;
}

const calculatorModalAtom = atom<CalculatorModalAtom>({
  isOpen: false,
  month: 0,
  phonePrice: 0,
  phoneOriginalPrice: 0,
  commonDiscountPrice: 0,
  firstPhonePlanPrice: 0,
  selectedPhonePlanPrice: 0,
});

const calculatorModalOpenAtom = atom(
  (get) => get(calculatorModalAtom).isOpen,
  (_, set, payload: Omit<CalculatorModalAtom, "isOpen">) => {
    set(calculatorModalAtom, {
      isOpen: true,
      ...payload,
    });
  }
);

export { calculatorModalAtom, calculatorModalOpenAtom };
