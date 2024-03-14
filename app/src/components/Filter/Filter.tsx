"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import useCategories from "./Categories";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/hooks";
import { getProducts } from "@/lib/features/products/productsActions";
import { useEffect, useMemo } from "react";

export default function Filter() {
  const pathname = usePathname();
  const router = useRouter();
  const { renderCategories, categories } = useCategories();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const categoriesFromUrl = searchParams.getAll("category");

  const handleCategories = () => {
    const checkedCategories = categories.filter((c) => c.checked === true);
    const categoryNames = checkedCategories.map((c) => c.name);
    return new URLSearchParams(
      categoryNames.map((category) => ["category", category])
    ).toString();
  };

  const onApply = async () => {
    const categories = handleCategories();
    const url = new URL(`http://localhost:3000${pathname}/?${categories}`);
    router.push(url.href);
  };

  useEffect(() => {
    dispatch(getProducts(categoriesFromUrl));
  }, [searchParams]);

  return (
    <nav className="h-full flex flex-col border-r pt-4">
      <div>{renderCategories}</div>
      <div className="w-full p-6">
        <Button className="w-full" onClick={onApply}>
          Apply
        </Button>
      </div>
    </nav>
  );
}
