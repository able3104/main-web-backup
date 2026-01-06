import { ReactNode, useEffect, useState } from "react";
import { SelectContext } from "./selectContext";
import { cn } from "cn-func";

interface SelectGroupProps {
  selectedOption: {
    name: string;
    price: number;
    description?: string;
  } | null;
  onChange: React.Dispatch<React.SetStateAction<any>>;
  children: ReactNode;
}

const Group = ({ selectedOption, onChange, children }: SelectGroupProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [endAnimation, setEndAnimation] = useState(false);
  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    setIsOpen(false);
  }, [selectedOption]);

  useEffect(() => {
    if (isOpen) {
      setEndAnimation(true);
    } else {
      const timer = setTimeout(() => {
        setEndAnimation(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // 컴포넌트가 언마운트 될 때도 스크롤 락을 해제해야 안전합니다.
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <SelectContext.Provider value={{ selectedOption, onChange }}>
      {isOpen && (
        <div className="fixed inset-0 z-10 no-scroll" onClick={handleClose} />
      )}
      <div
        className={cn("relative w-full text-sm", endAnimation ? "z-20" : "z-0")}
      >
        <div
          className={cn(
            "flex flex-row items-center gap-2",
            "w-full h-12 px-4 bg-white",
            "border border-gray-light rounded-lg",
            "cursor-pointer",
            endAnimation &&
              "rounded-b-none outline -outline-offset-1 outline-gray-light"
          )}
          onClick={handleToggle}
        >
          <div className="flex-1 flex flex-row justify-between truncate">
            {selectedOption ? (
              <>
                <p>{selectedOption.name}</p>
                <p>{selectedOption.price.toLocaleString("ko-KR")}원</p>
              </>
            ) : (
              <p className="text-gray-dark">
                7개월 후 사용하실 요금제를 선택해주세요.
              </p>
            )}
          </div>
          <div
            className={cn(
              isOpen && "rotate-x-180",
              "duration-400",
              "flex items-center justify-center w-5 h-5"
            )}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#a0a6ad"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
                transform={"rotate(270 12 12)"}
              />
            </svg>
          </div>
        </div>
        <div
          className={cn(
            isOpen ? "max-h-56" : "max-h-0",
            !endAnimation && " border-none",
            "absolute top-full left-0 z-20",
            "flex flex-col",
            "w-full shadow-md overflow-hidden overflow-y-scroll",
            "border-x border-b border-gray-light rounded-b-lg",
            "duration-300 ease-in-out"
          )}
        >
          {children}
        </div>
      </div>
    </SelectContext.Provider>
  );
};

export default Group;
