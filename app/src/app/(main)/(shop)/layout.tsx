export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="pt-[88px] min-h-screen">
        <div className="container w-full px-0">{children}</div>
      </div>
    </>
  );
}
