"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { MdOutlineShoppingBag } from "react-icons/md";
import { FiUser } from "react-icons/fi";
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

export default function Header() {
  const { userInfo } = useAppSelector((state: RootState) => state.auth);

  const dispatch = useAppDispatch();

  const onLogout = () => {
    axiosClient.post("/logout").then(() => {
      dispatch(logout());
    });
  };

  return (
    <header
      className={cn(
        "bg-color border-b border-zinc-200 fixed left-0 right-0 top-0 z-50  backdrop-blur-sm"
      )}
    >
      <div className="flex items-center justify-between px-6 py-4">
        <div className="lg:pr-6">
          <Link href={"/sneakers"} className="text-2xl">
            <span className="text-xl">Sneakers.zone</span>
          </Link>
        </div>
        <div className="max-w-2xl w-full">
          <Input type="text" placeholder="Search" className=" w-full" />
        </div>
        <div className="flex justify-end lg:pl-6 space-x-2">
          {/* <Button className="text-2xl" variant={"ghost"} asChild>
            <Link href={"/cart"}>
              <MdOutlineShoppingBag />
            </Link>
          </Button> */}
          <Cart />
          {!!userInfo ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-0">
                <Avatar className="border-2 border-hover">
                  <AvatarImage src="" />
                  <AvatarFallback>{userInfo.fullname[0]}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>{userInfo.fullname}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="p-0">
                  <Link href={"/"} className="px-2 py-1.5 w-full">
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" onClick={onLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant={"ghost"} className="text-2xl" asChild>
              <Link href={"/auth/login"}>
                <FiUser />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
