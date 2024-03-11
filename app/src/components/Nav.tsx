"use client";

import { getCategories } from "@/lib/features/categories/categoriesActions";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import { useLayoutEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

export default function Nav() {
  const dispatch = useAppDispatch();

  const categoriesStatus = useAppSelector(
    (state: RootState) => state.categories.status
  );

  let { categories } = useAppSelector((state: RootState) => state.categories);

  useLayoutEffect(() => {
    if (categoriesStatus === "idle") {
      dispatch(getCategories());
    }
  }, [categoriesStatus, dispatch]);
  return (
    <nav className="h-full flex flex-col border-r pt-4">
      <Accordion type="single" collapsible defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTrigger className="px-6">Categories</AccordionTrigger>
          <AccordionContent className="px-6">
            {categories?.map((c) => (
              <div className="">
                <Label className="flex items-center space-x-2 cursor-pointer">
                  <Checkbox /> <span>{c.name}</span>
                </Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </nav>
  );
}
