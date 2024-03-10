"use client";

import { user } from "@/lib/features/auth/authActions";
import { useAppDispatch } from "@/lib/hooks";
import { setCookie } from "cookies-next";
import React, { useLayoutEffect } from "react";

export default function AuthPrivider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();

  const getUser = async () => {
    await dispatch(user());
  };

  useLayoutEffect(() => {
    getUser();
  }, []);

  return <div>{children}</div>;
}
