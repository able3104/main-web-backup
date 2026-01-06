import { cn } from "cn-func";

interface ContentProps {
  children: React.ReactNode;
  bottomCTABar?: boolean;
  className?: string;
}

const Content = ({ children, bottomCTABar, className }: ContentProps) => {
  return (
    <main
      className={cn(
        "p-4 bg-blue-tertiary min-h-[calc(100dvh-5rem)]",
        bottomCTABar && "pb-32",
        className
      )}
    >
      {children}
    </main>
  );
};

export default Content;
