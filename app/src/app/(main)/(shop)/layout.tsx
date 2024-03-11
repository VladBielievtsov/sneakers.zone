import Nav from "@/components/Nav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex justify-between px-6 pb-4 pt-[88px] min-h-screen">
        <div className="xl:max-w-[300px] max-w-[270px] w-full fixed top-0 left-0 pr-6 pt-[72px] h-screen">
          <Nav />
        </div>
        <div className="w-full xl:pl-[300px] pl-[270px]">
          <div className="container w-full px-0">{children}</div>
        </div>
      </div>
    </>
  );
}
