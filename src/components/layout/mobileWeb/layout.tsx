import { cn } from "cn-func";
import { Outlet } from "react-router-dom";
import PageWrapper from "../pageWrapper";
import ContentModal from "../../common/modal/content";
import LoginModal from "../../common/modal/login";
import CalculatorModal from "../../common/modal/calculator";

const MobileLayout = () => {
  return (
    <div className="min-h-screen w-full bg-gray-50 flex justify-center overflow-hidden font-display">
      <div
        className={cn(
          "relative overflow-hidden",
          "w-full h-dvh max-h-dvh sm:w-[430px] sm:max-w-full bg-white",
          "outline outline-gray-light"
        )}
      >
        <PageWrapper>
          <Outlet />
        </PageWrapper>
        <ContentModal />
        <LoginModal />
        <CalculatorModal />
      </div>
    </div>
  );
};

export default MobileLayout;
