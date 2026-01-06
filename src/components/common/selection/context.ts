import { createContext, useContext } from "react";

interface SelectionContextProps {
  selectedId: string | null;
  onChange: (id: string) => void;
}

export const SelectionContext = createContext<
  SelectionContextProps | undefined
>(undefined);

export const useSelectionContext = () => {
  const ctx = useContext(SelectionContext);
  if (!ctx)
    throw new Error("Selection.Item must be used within a Selection.Group");
  return ctx;
};
