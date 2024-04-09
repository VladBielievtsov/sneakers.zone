"use client"

import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '../ui/button';
import { v4 as uuidv4 } from 'uuid';
import { PlusCircle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { addProduct } from '@/lib/features/products/productsActions';
import { RootState } from '@/lib/store';
import { useToast } from '../ui/use-toast';
import { useRouter } from 'next/navigation';

const formSchema = z
  .object({
    title: z
      .string()
      .min(1, { message: "This field has to be filled." })
      .max(255),
    description: z
      .string()
      .min(1, { message: "This field has to be filled." })
      .max(2000),
    category: z
      .string()
      .min(1, { message: "This field has to be filled." }),
    price: z
      .string()
      .min(1, { message: "This field has to be filled." })
  })

export default function AddProduct() {
  const {push} = useRouter()
  const { error } = useAppSelector((state: RootState) => state.products);

  const [sizes, setSizes] = useState<{id: string, size: string, quantity: number}[]>([{
    id: uuidv4(),
    size: "",
    quantity: 0
  }])
  const [sizesError, setSizesError] = useState<string | null>(null)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      price: "",
      category: ""
    },
  });

  function hasEmptyValues(obj: any) {
    for (let key in obj) {
        if (!obj[key] && obj[key] !== 0) {
            return true;
        }
    }
    return false;
  }

  const dispatch = useAppDispatch();
  const { toast } = useToast()

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const newSizes = sizes.map(({id, ...rest}) => rest)
    let emptyValuesFound = newSizes.some(item => hasEmptyValues(item));
    if (emptyValuesFound) {
      setSizesError("There are empty values in the 'Sizes'");
      return
    } 

    const res = await dispatch(
      addProduct({...values, sizes: newSizes})
    ).then(() => { 
      toast({
        description: "Product has been created",
      })
      push("/panel/products")
    })
  }

  const addSizeField = () => {
    setSizes([...sizes, {
      id: uuidv4(),
      size: "",
      quantity: 0
    }])
  }

  const removeSizeField = (id: string) => {
    const newArr = sizes.filter(s => s.id !== id)
    setSizes(newArr)
  }

  const handleSizeChange = (id: string, field: string, value: string) => {
    setSizesError(null)
    const updated = sizes.map(s => {
      if (s.id === id) {
        return {
          ...s,
          [field]: field === "quantity" ? parseInt(value) : value
        }
      }
      return s
    })
    setSizes(updated)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
        {error && (
          <div className='text-destructive border-destructive border rounded bg-destructive/10 p-4'>
            <p>
              {error}
            </p>
          </div>
        )}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="men">Men</SelectItem>
                    <SelectItem value="women">Women</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input placeholder="Price in $" type='number' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <label className={cn('text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
          [
            sizesError && "text-destructive"
          ]
          )}>Sizes and Quantity</label>
          <div className='mt-2'>
            <div className='flex flex-col gap-4'>
              {sizes.map(size => (
                <div key={size.id} className='flex gap-x-4'>
                  <Input placeholder='size' type='text' onChange={(e) => handleSizeChange(size.id, "size", e.target.value)} />
                  <Input placeholder='quantity' type='number' onChange={(e) => handleSizeChange(size.id, "quantity", e.target.value)} />
                  <Button type='button' className='p-2 h-auto' onClick={() => removeSizeField(size.id)}><XCircle /></Button>
                </div>
              ))}
            </div>
            {sizesError && (
              <p className="text-sm font-medium text-destructive mt-2">
                {sizesError}
              </p>
            )}
            <div className='flex justify-center mt-4'>
              <Button type='button' className='p-2 h-auto' onClick={addSizeField}><PlusCircle /></Button>
            </div>
          </div>
        </div>
        <Button type="submit">Add Product</Button>
      </form>
    </Form>
  )
}
