import Filter from "@/components/Filter/Filter";
import { cn } from "@/lib/utils";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex items-start justify-between pt-[88px] min-h-screen">
        <div className="max-w-[270px] w-full pr-10" style={{height: "calc(100vh - 88px)"}}>
          <Filter />
        </div>
        <div className="w-full">
          <div className="container w-full px-0">{children}</div>
        </div>
      </div>
    </>
  );
}
