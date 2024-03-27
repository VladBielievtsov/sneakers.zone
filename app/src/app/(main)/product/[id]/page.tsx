"use client";

import Carousel from "@/components/Carousel";
import { Button } from "@/components/ui/button";
import axiosClient from "@/lib/axios-client";
import { IProduct } from "@/lib/features/products/productsSlice";
import { useEffect, useLayoutEffect, useState } from "react";
import { MdOutlineShoppingBag } from "react-icons/md";

export default function page({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<null | IProduct>(null);

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

  return (
    <div className="container pt-[104px]">
      {product ? (
        <div className="flex w-full space-x-10">
          <div className="w-1/2">
            <Carousel />
          </div>
          <div className="w-1/2">
            <div>
              <h1 className="text-3xl font-bold">
                {product ? product?.title : "Loading..."}
              </h1>
              {/* <p className="mt-4">CATEGORY: {product?.category.name}</p> */}
            </div>
            <div className="mt-6">Select Size</div>
            <div className="mt-6">
              <p className="text-2xl font-bold">${product?.price}</p>
            </div>
            <div className="mt-6">
              <Button className="text-xl space-x-2 rounded-xl">
                <MdOutlineShoppingBag />
                <span className="text-sm">Add to Cart</span>
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <h3>Loading...</h3>
      )}
      <div className="border-t border-zinc-200 pt-6 mt-6">
        <p>{product?.description}</p>
      </div>
    </div>
  );
}
