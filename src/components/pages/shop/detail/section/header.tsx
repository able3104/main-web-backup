const SectionHeader = ({
  title,
  description,
}: {
  title: string;
  description?: string;
}) => {
  return (
    <div className="flex flex-col gap-1">
      <h2 className="text-xl font-semibold h-6">{title}</h2>
      {description && (
        <p className="text-[13px] text-gray-dark">{description}</p>
      )}
    </div>
  );
};

export default SectionHeader;
