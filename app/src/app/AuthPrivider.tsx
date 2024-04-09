"use client";

import { user } from "@/lib/features/auth/authActions";
import { useAppDispatch } from "@/lib/hooks";
import { hasCookie } from "cookies-next";
import React, { useEffect } from "react";

export default function AuthPrivider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();

  const getUser = async () => {
    await dispatch(user());
  };

  useEffect(() => {
    if (hasCookie("ACCESS_TOKEN")) {
      getUser();
    }
  }, []);

  return <div>{children}</div>;
}
