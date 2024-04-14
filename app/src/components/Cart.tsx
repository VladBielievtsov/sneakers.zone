import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { ShoppingBag } from "lucide-react";
import CartItem from "./CartItem";
import { ScrollArea } from "./ui/scroll-area";
import { useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import { loadStripe } from '@stripe/stripe-js'
import axiosClient from "@/lib/axios-client";
import Link from "next/link";

export default function Cart() {
  const [error, setError] = useState<null | string>(null)
  const cartList = useAppSelector((state: RootState) => state.cart.list);
  const { userInfo } = useAppSelector((state: RootState) => state.auth);
  
  const totalPrice = () => {
    return cartList.reduce((total, item) => {
      const price = parseFloat(item.product.price)
      const quantity = item.quantity
      return total + (price * quantity) 
    }, 0)
  }

  const makeCheckOut = async () => {
    setError(null)
    if (!!!cartList.length) {
      setError("Cart is empty")
      return
    }

    const newList = cartList.map(item => {
      const {id, quantity, product} = item
      const {sizes, ...rest} = product
      return {quantity, ...rest}
    })

    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "")

    const body = {
      products: newList,
      email: userInfo?.email
    }

    const res = await axiosClient.post("/create-checkout-session", body)
    const session = await res.data
    
    const result = stripe?.redirectToCheckout({
      sessionId: session.result.id
    })

    result?.catch(err => {
      console.log(err);
    })
  }
  
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="text-2xl relative" variant={"ghost"}>
          <ShoppingBag className='h-[22px]' />
        </Button>       
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>My Cart ({cartList.length})</SheetTitle>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <ScrollArea style={{ height: error ? 'calc(100vh - 222px)' : 'calc(100vh - 190px)' }}>
            <div className="grid gap-4 divide-y divide-zinc-300">
              {cartList.map(cartItem => (
                <CartItem key={cartItem.id} cartItem={cartItem} />
              ))}
            </div>
          </ScrollArea>
          <div className="static bottom-0">
            <div className="flex justify-between">
              <p>Total:</p>
              <b className="text-xl">${totalPrice()}</b>
            </div>
          </div>
        </div>
        <SheetFooter>
          <div className="flex flex-col w-full">
            {error && (
              <p className="text-red-500 pt-0 pb-2">
                {error}
              </p>
            )}
            {!userInfo ? (
              <Button asChild className="w-full">
                <Link href={"/auth/login"}>
                  Login
                </Link>
              </Button>
            ) : (
              <Button className="w-full" type="button" onClick={makeCheckOut}>
                Check Out
              </Button>
            )}
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
