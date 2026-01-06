import { useAtom } from "jotai";
import { loginModalAtom } from "./atom";
import { cn } from "cn-func";
import { kakaoSymbol, modalLogo } from "../../../../assets/images";
import { signInWithPopup } from "firebase/auth";
import { auth, kakaoProvider } from "../../../../firebase/config";

const LoginModal = () => {
  const [modal, setModal] = useAtom(loginModalAtom);
  const { isOpen, subtitle, title, afterFunction } = modal;

  const closeModal = () => {
    setModal({ ...modal, isOpen: false });
  };

  const handleKakaoLogin = async () => {
    try {
      await signInWithPopup(auth, kakaoProvider);
      closeModal();
      afterFunction();
    } catch (error) {
      console.error("Error signing in with Kakao:", error);
      alert("Kakao login failed. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-100" onClick={closeModal} />
      <div
        className={cn(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
          "flex flex-col items-center gap-5",
          "w-9/10 max-w-96 bg-white rounded-lg px-5 py-6 z-110"
        )}
      >
        <img src={modalLogo} alt="Modal Logo" width={60} height={33} />
        <div className="flex flex-col gap-2 items-center">
          <p className="text-lg font-medium">{subtitle}</p>
          <h2 className="text-[22px] font-semibold text-center">{title}</h2>
        </div>
        <button
          onClick={handleKakaoLogin}
          className="flex flex-row justify-center items-center gap-2 w-full p-4 bg-[#FEE500] rounded-xl"
        >
          <img src={kakaoSymbol} alt="Kakao Symbol" width={20} />
          카카오 로그인
        </button>
        <button
          className="text-[13px] text-gray-dark font-medium"
          onClick={closeModal}
        >
          지금은 안할래요
        </button>
      </div>
    </>
  );
};

export default LoginModal;
