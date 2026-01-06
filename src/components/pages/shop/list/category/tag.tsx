const CategoryTag = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="rounded-full px-2 py-1 bg-blue-tertiary text-[13px] text-gray-dark whitespace-nowrap    ">
      {children}
    </div>
  );
};

export default CategoryTag;
