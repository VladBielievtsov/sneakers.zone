import React, { useEffect, useState } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { ChevronRight } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import useSetSearchParams from '@/hooks/useSetSearchParams'
import { getProducts } from '@/lib/features/products/productsActions'
import { useAppDispatch } from '@/lib/hooks'

const SORT_OPTIONS = [
  {name: "All", value: "none"},
  {name: "Price: Low to High", value: "price-asc"},
  {name: "Price: High to Low", value: "price-desc"},
] as const

export default function Sort() {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams()
  const selectedSort = searchParams.get("sort")
  const [sortBy, setSortBy] = useState({
    sort: SORT_OPTIONS.some(option => option.value === selectedSort) ? selectedSort : "none"
  }) 

  useEffect(() => {
    setSortBy((prev) => ({
      ...prev, 
      sort: SORT_OPTIONS.some(option => option.value === selectedSort) ? selectedSort : "none"
    }))
    dispatch(getProducts(searchParams.toString()));
  }, [selectedSort])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center space-x-1 focus-visible:outline-0">
        <span>Sort by {SORT_OPTIONS.map(option => sortBy.sort === option.value ? option.name.replace("Price: ", "") : null)}</span>
        <ChevronRight />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {SORT_OPTIONS.map(option => (
          <DropdownMenuItem key={option.name} asChild>
            <Link
              href={"?" + useSetSearchParams({key: "sort", value: option.value})}
              className={cn("w-full cursor-pointer", {
                "text-gray-900 bg-gray-100": option.value === sortBy.sort,
                "text-gray-500": option.value !== sortBy.sort
              })} 
            >{option.name}</Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
