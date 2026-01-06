interface TextCardProps {
  title: string;
  description?: string;
}

const TextCard = ({ title, description }: TextCardProps) => {
  return (
    <div className="flex flex-col justify-center h-full">
      <p className="text-base font-semibold">{title}</p>
      {description && (
        <p className="text-[13px] font-medium text-gray-dark truncate">
          {description}
        </p>
      )}
    </div>
  );
};

export default TextCard;
