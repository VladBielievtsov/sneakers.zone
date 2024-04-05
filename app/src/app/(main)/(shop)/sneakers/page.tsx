"use client";

import Categories from "@/components/Filter/Categories";
import Sort from "@/components/Filter/Sort";
import ProductsList from "@/components/ProductsList";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronRight } from "lucide-react";

export default function Sneakers() {
  return (
    <div>
      <Categories />
      <div className="flex justify-between items-center">
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center space-x-1"><span>Filter</span> <ChevronRight /></DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Filter 1</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div>
          <Sort />
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6">
        <ProductsList />
      </div>
    </div>
  );
}
