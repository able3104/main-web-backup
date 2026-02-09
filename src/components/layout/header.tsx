import { cn } from "cn-func";
import ArrowIcon from "../icons/arrow";

interface HeaderProps {
  title: string;
  subTitle?: string;
  subTitleHighlight?: boolean;
  backButton?: boolean;
  backButtonHandler?: () => void;
}

const Header = ({
  title,
  subTitle,
  subTitleHighlight,
  backButton,
  backButtonHandler,
}: HeaderProps) => {
  return (
    <header
      className={cn(
        "sticky top-0 left-0 right-0 z-50",
        "flex flex-col justify-center",
        "h-20 px-4 bg-white",
        "border-b border-gray-light"
      )}
      style={{ zIndex: 9999 }}
    >
      <div className="grid grid-cols-[2rem_1fr_2rem]">
        {backButton ? (
          <button className="p-1 text-gray-normal" onClick={backButtonHandler}>
            <ArrowIcon size={24} />
          </button>
        ) : (
          <div />
        )}
        <div className="flex flex-col items-center text-center">
          <h1 className="text-lg font-semibold h-5">{title}</h1>
          <h2
            className={cn(
              "text-[15px] h-5",
              subTitleHighlight ? "text-blue-primary" : "text-gray-dark"
            )}
          >
            {subTitle}
          </h2>
        </div>
      </div>
    </header>
  );
};

export default Header;
