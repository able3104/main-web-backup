import { cn } from "cn-func";

interface TestNoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TestNoticeModal = ({ isOpen, onClose }: TestNoticeModalProps) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-100" onClick={onClose} />
      <div
        className={cn(
          "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
          "flex flex-col items-center gap-5 z-110",
          "w-9/10 max-w-96 bg-white rounded-lg px-5 py-6 text-center"
        )}
      >
        <div className="flex flex-col items-center gap-3">
          <h2 className="text-[22px] font-semibold">
            현재 테스트 중인 서비스 입니다.
          </h2>
        </div>
        <button
          onClick={onClose}
          className={cn(
            "w-full h-12 bg-blue-primary rounded-2xl",
            "text-white font-semibold"
          )}
        >
          닫기
        </button>
      </div>
    </>
  );
};

export default TestNoticeModal;
