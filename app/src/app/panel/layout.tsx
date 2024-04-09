'use client'

import PanelHeader from "@/components/panel/PanelHeader";
import { useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function PanelLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userInfo, status } = useAppSelector((state: RootState) => state.auth);

  if (status === "succeeded") {
    if (userInfo?.role !== 'admin') {
      redirect("/sneakers")
    }
  }
  
  return status === "succeeded" && (
    <>
      <PanelHeader />
      <div className="container mx-auto px-4 pt-[77px]">{children}</div>
    </>
  );
}
