import { Sizes } from "@/lib/features/products/productsSlice"
import { Button } from "./ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface SelectSizeProps {
  sizes: Sizes[]
  selectedSize: Sizes | null
  setSelectedSize: React.Dispatch<React.SetStateAction<Sizes | null>>
}

export default function SelectSize({sizes, selectedSize, setSelectedSize}: SelectSizeProps) {
  const handleSelect = (id: number) => {
    const findSize = sizes.filter(s => s.id === id)
    setSelectedSize(findSize[0])
  }
  
  return (
    <div className="flex flex-wrap items-center gap-4">
      {sizes.map(size => (
        <Button 
          key={size.id} 
          variant={selectedSize?.id === size.id ? "default" : "outline"}
          onClick={() => handleSelect(size.id)}
          className={cn("font-normal min-w-[52px]", [
            size.quantity === 0 && "opacity-50"
          ])}
          disabled={size.quantity === 0}
        >
          {size.size}
        </Button>
      ))}
    </div>
  )
}
