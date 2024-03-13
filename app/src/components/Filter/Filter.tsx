"use client";

import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import useCategories from "./Categories";
import { useRouter } from "next/navigation";

export default function Filter() {
  const pathname = usePathname();
  const router = useRouter();
  const { renderCategories, categories } = useCategories();

  const handleCategories = () => {
    const checkedCategories = categories.filter((c) => c.checked === true);
    const categoryNames = checkedCategories.map((c) => c.name);
    return new URLSearchParams(
      categoryNames.map((category) => ["category", category])
    ).toString();
  };

  const onApply = () => {
    const categories = handleCategories();
    const url = new URL(`http://localhost:3000${pathname}/?${categories}`);
    router.push(url.href);
  };

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
