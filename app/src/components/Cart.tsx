import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { MdOutlineShoppingBag } from "react-icons/md";
import CartItem from "./CartItem";
import { ScrollArea } from "./ui/scroll-area";

export default function Cart() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="text-2xl" variant={"ghost"}>
          <MdOutlineShoppingBag />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>My Cart (4)</SheetTitle>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <ScrollArea style={{ height: "calc(100vh - 270px)" }}>
            <div className="grid gap-4 divide-y divide-zinc-300">
              <CartItem />
              <CartItem />
              <CartItem />
              <CartItem />
              <CartItem />
            </div>
          </ScrollArea>
          <div className="static bottom-0">
            <div className="flex justify-between">
              <p>Discount:</p>
              <b className="font-medium">$00.00</b>
            </div>
            <div className="flex justify-between">
              <p>Delivery:</p>
              <b className="font-medium">$00.00</b>
            </div>
            <div className="flex justify-between">
              <p>Tax:</p>
              <b className="font-medium">$00.00</b>
            </div>
            <div className="flex justify-between">
              <p>Total:</p>
              <b className="text-xl">$124.00</b>
            </div>
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button className="w-full" type="submit">
              Check Out
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
