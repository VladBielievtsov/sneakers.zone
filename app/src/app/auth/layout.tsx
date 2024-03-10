import Link from "next/link";
import { cn } from "@/lib/utils";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="">
      <header
        className={cn(
          "bg-color border-b border-zinc-200 fixed left-0 right-0 top-0 z-50  backdrop-blur-sm px-6 py-4"
        )}
      >
        <Link href={"/"} className="text-2xl">
          <span className="text-xl">Sneakers.zone</span>
        </Link>
      </header>
      <div className="flex justify-center items-center min-h-screen p-4 pt-[81px]">
        {children}
      </div>
    </div>
  );
}
