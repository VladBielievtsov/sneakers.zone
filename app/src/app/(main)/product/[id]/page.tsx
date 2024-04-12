"use client";

import Carousel from "@/components/Carousel";
import SelectSize from "@/components/SelectSize";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import axiosClient from "@/lib/axios-client";
import { IProduct, Sizes } from "@/lib/features/products/productsSlice";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function page({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<null | IProduct>(null);
  const [selectedSize, setSelectedSize] = useState<Sizes | null>(null)
  const [error, setError] = useState<string | null>(null)

  const getProduct = async () => {
    try {
      const { data } = await axiosClient.get(`/product/${params.id}`);
      setProduct(data.data.product);
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  const handleAddToCard = () => {
    setError(null)
    if (!selectedSize) {
      setError("Select size")
      return
    }

    console.log({product: product?.id, size: selectedSize});
  }

  return (
    <div className="container px-0 pt-[104px]">
      {product ? (
        <div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={"/sneakers"}>Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={`/sneakers?category=${product.category}`} className="capitalize">{product.category}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={`/sneakers?category=shop-all`} className="capitalize">All Shoes</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="flex w-full space-x-10 pt-8">
            <div className="w-1/2">
              <Carousel />
            </div>
            <div className="w-1/2">
              <div>
                <h1 className="text-3xl font-bold">
                  {product ? product?.title : "Loading..."}
                </h1>
              </div>
              <div className="mt-6">
                <h2 className="mb-4">Select Size</h2>
                <SelectSize sizes={product.sizes} selectedSize={selectedSize} setSelectedSize={setSelectedSize} />
              </div>
              <div className="mt-6">
                <p className="text-2xl font-bold">${product?.price}</p>
              </div>
              <div className="mt-6">
                {product.sizes.every(size => size.quantity === 0) ? (
                  <p className="bg-zinc-100 inline-block">Out of Stock</p>
                ) : (
                  <Button className="text-xl space-x-2 rounded-xl">
                    <ShoppingBag className='h-[22px]' />
                    <span className="text-sm" onClick={() => handleAddToCard()}>Add to Cart</span>
                  </Button>
                )}
                {error && (
                  <p className="text-red-500 pt-4">
                    {error}
                  </p>
                )}
              </div>
              <div className="border-t border-zinc-200 pt-6 mt-6">
                <p>{product?.description}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h3>Loading...</h3>
      )}
    </div>
  );
}
