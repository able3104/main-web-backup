import { cn } from "cn-func";

interface SurveyProgressBarProps {
  currentIndex: number;
  maxIndex: number;
}

const SurveyProgressBar = ({
  currentIndex,
  maxIndex,
}: SurveyProgressBarProps) => {
  return (
    <div className="flex flex-row justify-center gap-2">
      {Array.from({ length: maxIndex }).map((_, index) => (
        <div
          key={index}
          className={cn(
            "w-2 h-2 rounded-full",
            "transition-all duration-300",
            index <= currentIndex ? "bg-blue-secondary" : "bg-gray-normal"
          )}
        />
      ))}
    </div>
  );
};

export default SurveyProgressBar;
