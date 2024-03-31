"use client";

import ProductsList from "@/components/ProductsList";
import { Button } from "@/components/ui/button";
import { getProducts } from "@/lib/features/products/productsActions";
import { useAppDispatch } from "@/lib/hooks";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Sneakers() {
  const searchParams = useSearchParams()
  const router = useRouter();
  const pathname = usePathname()
  const dispatch = useAppDispatch();
  const [category, setCategory] = useState([
    {id: 0, label: "women", active: false},
    {id: 1, label: "men", active: false},
    {id: 2, label: "shop all", active: true},
  ])

  useEffect(() => {
    const arr =
    category?.map((c) => ({
        ...c,
        active: searchParams.getAll("category").includes(c.label),
      })) || [];
      setCategory(arr);
  }, []);

  const categoryClick = (id: number) => {
    const newCategories = category.map(c => ({
        ...c,
        active: c.id === id
    }));
    setCategory(newCategories);

    const activeCategories = newCategories.filter(c => c.active).map(c => c.label);

    const urlSearchParams = new URLSearchParams(window.location.search);
    const existingParams = Object.fromEntries(urlSearchParams.entries());

    const mergedParams = {
        ...existingParams,
        category: activeCategories.join(',')
    };

    const queryString = new URLSearchParams(mergedParams).toString();
    router.push(`${pathname}?${queryString}`, undefined);
    
    dispatch(getProducts(queryString));
  }
   
  return (
    <div>
      <div className="flex justify-center w-full">
        {category.map(c => (
          <Button key={c.id} variant={"link"} className={c.active ? "opacity-100" : "opacity-50"} onClick={() => categoryClick(c.id)}>{c.label}</Button>
        ))}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6">
        <ProductsList />
      </div>
    </div>
  );
}
