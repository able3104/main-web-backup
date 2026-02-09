import { cn } from "cn-func";

interface BottomCTABarProps {
  children: React.ReactNode;
}

// 화면 하단에 들어가는 Call To Action 바 컴포넌트입니다.
// 해당 컴포넌트는 Layout 기준 하단에 고정되어 표시됩니다.
const BottomCTABar = ({ children }: BottomCTABarProps) => {
  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0",
        "flex flex-col justify-end items-center gap-3",
        "w-full h-28 px-3 pb-6",
        "bg-gradient-to-b from-[#F5F7FA]/5 to-[#FFFEFB]"
      )}
      style={{ zIndex: 100 }}
    >
      {children}
    </div>
  );
};

export default BottomCTABar;
