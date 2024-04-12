"use client"

import EditProduct from '@/components/panel/EditProduct';
import { Card, CardContent } from '@/components/ui/card'
import axiosClient from '@/lib/axios-client';
import { IProduct } from '@/lib/features/products/productsSlice';
import React, { useEffect, useState } from 'react'

export default function EditProductPage({ params }: { params: { id: string } }) {
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
    <div className='pb-10'>
      <div className="pb-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Edit Product</h2>
        </div>
      </div>
      <div className="grid flex-1 items-start gap-4 md:gap-8">
        <Card className="max-w-2xl mx-auto w-full">
          <CardContent>
            {!!product ? (<EditProduct product={product} />) : ("Loading...")}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
