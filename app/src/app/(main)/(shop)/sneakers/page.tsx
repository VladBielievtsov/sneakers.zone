"use client";

import { useSearchParams } from "next/navigation";
import ProductsList from "@/components/ProductsList";

export default function Sneakers() {
  return (
    <div className="pt-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">New Arrivals</h1>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-6 pt-6">
        <ProductsList />
      </div>
    </div>
  );
}
