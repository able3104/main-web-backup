import { useAtom } from "jotai";
import { contentModalAtom } from "./atom";
import { cn } from "cn-func";

const ContentModal = () => {
  const [modal, setModal] = useAtom(contentModalAtom);
  const { isOpen, imageUrl, title, description, footer } = modal;

  const handleClose = () => {
    setModal({
      isOpen: false,
      imageUrl: "",
      title: "",
      description: "",
      footer: null,
    });
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-100" onClick={handleClose} />
      <div
        className={cn(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
          "flex flex-col items-center gap-5 z-110",
          "w-9/10 max-w-96 bg-white rounded-lg px-5 py-6 text-center"
        )}
      >
        <div className="flex flex-col items-center">
          <img src={imageUrl} alt={title} width={120} height={120} />
          <h2 className="text-[22px] font-semibold">{title}</h2>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-lg/5 font-medium whitespace-pre-wrap">
            {description}
          </p>
          <div className="text-[13px] text-gray-dark font-medium">{footer}</div>
        </div>
      </div>
    </>
  );
};

export default ContentModal;
