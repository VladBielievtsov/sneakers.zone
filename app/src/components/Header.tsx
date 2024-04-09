"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import axiosClient from "@/lib/axios-client";
import { logout } from "@/lib/features/auth/authSlice";
import Cart from "./Cart";
import SearchInput from "./SearchInput";
import { User } from "lucide-react";
import Logo from "./Logo";

export default function Header() {
  const { userInfo } = useAppSelector((state: RootState) => state.auth);

  const dispatch = useAppDispatch();

  const onLogout = () => {
    axiosClient.post("/auth/logout").then(() => {
      dispatch(logout());
    });
  };

  return (
    <header
      className={"bg-color fixed left-0 right-0 top-0 z-50  backdrop-blur-sm"}
    >
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-between pb-4 border-b border-zinc-500">
          <div className="lg:pr-6">
            <Logo />
          </div>
          <div className="max-w-2xl w-full">
            <SearchInput />
          </div>
          <div className="flex justify-end lg:pl-6 space-x-2">
            <Cart />
            {!!userInfo ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="outline-0">
                  <Avatar className="border-2 border-hover">
                    <AvatarImage src="" />
                    <AvatarFallback>{userInfo.fullname[0]}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel>{userInfo.fullname}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="p-0">
                    <Link href={"/"} className="px-2 py-1.5 w-full">
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  {userInfo.role === "admin" && (
                    <DropdownMenuItem className="p-0">
                      <Link href={"/panel/dashboard"} className="px-2 py-1.5 w-full">
                        Panel
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem className="cursor-pointer" onClick={onLogout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant={"ghost"} className="text-2xl" asChild>
                <Link href={"/auth/login"}>
                  <User className='h-[22px]' />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
