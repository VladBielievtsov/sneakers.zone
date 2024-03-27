"use client";
import { useSearchParams } from "next/navigation";
import { getCategories } from "@/lib/features/categories/categoriesActions";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import { useEffect, useLayoutEffect, useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

type newCategoriesType = {
  checked: boolean;
  created_at: string;
  id: number;
  name: string;
};

export default function useCategories() {
  const [newCategories, setNewCategories] = useState<newCategoriesType[]>([]);
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();

  const categoriesStatus = useAppSelector(
    (state: RootState) => state.categories.status
  );

  let { categories } = useAppSelector((state: RootState) => state.categories);

  useLayoutEffect(() => {
    if (categoriesStatus === "idle") {
      dispatch(getCategories());
    }
  }, [categoriesStatus, dispatch]);

  useEffect(() => {
    const arr =
      categories?.map((c, id) => ({
        ...c,
        checked: searchParams.getAll("category").includes(c.name),
      })) || [];
    setNewCategories(arr);
  }, [categories]);

  const handleCheckboxChange = (id: number, checked: boolean) => {
    setNewCategories((prev) =>
      prev.map((category) =>
        category.id === id ? { ...category, checked } : category
      )
    );
  };

  return {
    categories: newCategories,
    renderCategories: (
      <Accordion type="single" collapsible defaultValue="item-1">
        <AccordionItem value="item-1" className="border-0">
          <AccordionTrigger className="">Categories</AccordionTrigger>
          <AccordionContent className="space-y-4">
            {newCategories?.map((c) => (
              <div className="" key={c.id}>
                <Label className="flex items-center space-x-2 cursor-pointer">
                  <Checkbox
                    checked={c.checked}
                    onCheckedChange={(checked: boolean) => {
                      handleCheckboxChange(c.id, checked);
                    }}
                  />{" "}
                  <span>{c.name}</span>
                </Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    ),
  };
}
