import Header from "@/components/Header";
import PanelHeader from "@/components/panel/PanelHeader";

export default function PanelLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <PanelHeader />
      <div className="container mx-auto px-4 pt-[77px]">{children}</div>
    </>
  );
}
