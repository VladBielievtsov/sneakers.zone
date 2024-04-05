import { getProducts } from '@/lib/features/products/productsActions';
import { useAppDispatch } from '@/lib/hooks';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { Button } from '../ui/button';
import Link from 'next/link';
import useSetSearchParams from '@/hooks/useSetSearchParams';
import { cn } from '@/lib/utils';

const CATEGORIES_OPTIONS = [
  {id: uuidv4(), name: "Women", value: "women"},
  {id: uuidv4(), name: "Men", value: "men"},
  {id: uuidv4(), name: "Shop All", value: "shop-all"},
]

export default function Categories() {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams()
  const selectedCategory = searchParams.get("category")

  const [category, setCategory] = useState({
    category: CATEGORIES_OPTIONS.some(option => option.value === selectedCategory) ? selectedCategory : "none"
  }) 

  useEffect(() => {
    setCategory((prev) => ({
      ...prev, 
      sort: CATEGORIES_OPTIONS.some(option => option.value === selectedCategory) ? selectedCategory : "none"
    }))
    dispatch(getProducts(searchParams.toString()));
  }, [selectedCategory])

  return (
    <div className="flex justify-center w-full">
      {CATEGORIES_OPTIONS.map(c => (
        <Button key={c.id} variant={"link"} asChild>
          <Link 
            href={"?" + useSetSearchParams({key: "category", value: c.value})}
            className={cn({
              "opacity-100": c.value === selectedCategory,
              "opacity-50": c.value !== selectedCategory
            })}
          >
            {c.name}
          </Link>
        </Button>
      ))}
    </div>
  )
}
