interface ArrowIconProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
  direction?: "left" | "right" | "up" | "down";
}

const ArrowIcon = ({
  size = 24,
  color = "currentColor",
  strokeWidth = 2,
  direction = "left",
}: ArrowIconProps) => {
  const getTransform = () => {
    switch (direction) {
      case "right":
        return "rotate(180 12 12)";
      case "up":
        return "rotate(90 12 12)";
      case "down":
        return "rotate(270 12 12)";
      default:
        return "";
    }
  };

  return (
    <svg
      width={size.toString()}
      height={size.toString()}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 19l-7-7 7-7"
        transform={getTransform()}
      />
    </svg>
  );
};

export default ArrowIcon;
