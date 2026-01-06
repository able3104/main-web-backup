import { createContext, useContext } from "react";

interface SelectContextProps {
  selectedOption: {
    name: string;
    price: number;
    description?: string;
  } | null;
  onChange: React.Dispatch<React.SetStateAction<any>>;
}

export const SelectContext = createContext<SelectContextProps | undefined>(
  undefined
);

export const useSelectContext = () => {
  const ctx = useContext(SelectContext);
  if (!ctx) throw new Error("Radio.Item must be used within a Radio.Group");
  return ctx;
};
