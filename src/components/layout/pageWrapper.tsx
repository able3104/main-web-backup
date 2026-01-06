const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className="w-full h-screen overflow-y-scroll">{children}</div>;
};

export default PageWrapper;
