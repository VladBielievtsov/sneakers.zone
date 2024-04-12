import AddProduct from '@/components/panel/AddProduct'
import { Card, CardContent } from '@/components/ui/card'
import React from 'react'

export default function Add() {
  return (
    <div className='pb-10'>
      <div className="pb-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Add Product</h2>
        </div>
      </div>
      <div className="grid flex-1 items-start gap-4 md:gap-8">
        <Card className="max-w-2xl mx-auto w-full">
          <CardContent>
            <AddProduct />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
