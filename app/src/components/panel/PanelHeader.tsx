"use client"

import Link from 'next/link'
import React from 'react'
import PanelNav from './PanelNav'
import Logo from '../Logo'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { RootState } from '@/lib/store'
import axiosClient from '@/lib/axios-client'
import { logout } from '@/lib/features/auth/authSlice'

export default function PanelHeader() {
  const { userInfo } = useAppSelector((state: RootState) => state.auth);

  const dispatch = useAppDispatch();

  const onLogout = () => {
    axiosClient.post("/auth/logout").then(() => {
      dispatch(logout());
    });
  };
  return (
    <header className={"bg-color fixed left-0 right-0 top-0 z-50  backdrop-blur-sm border-b border-zinc-500"}>
      <div className="container mx-auto p-4 flex items-center justify-between pb-4 ">
        <div className='flex items-center space-x-6'>
          <Logo />
          <PanelNav />
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-0">
              <Avatar className="border-2 border-hover">
                <AvatarImage src="" />
                <AvatarFallback>{userInfo?.fullname[0]}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{userInfo?.fullname}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {userInfo?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
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
        </div>
      </div>
    </header>
  )
}
