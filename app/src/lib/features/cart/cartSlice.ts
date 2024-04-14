import { createSlice } from "@reduxjs/toolkit";
import { IProduct, Sizes } from "../products/productsSlice";
import { getCookie, setCookie } from "cookies-next";
import { v4 as uuidv4 } from 'uuid';

export interface CartItem {
  id: string
  product: IProduct
  size: Sizes
  quantity: number
}

interface CartState {
  list: CartItem[]
}

const initialState: CartState = {
  list: JSON.parse(getCookie("CART") || "[]")
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, { payload }) => {
      const updatedCart = [...state.list, { id: uuidv4(), ...payload }];
      document.cookie = `CART=${JSON.stringify(updatedCart)}`;
      state.list = updatedCart
    },
    removeFromCart: (state, { payload }) => {
      const updatedCart = state.list.filter((item) => item.id !== payload);
      setCookie("CART", JSON.stringify(updatedCart));
      state.list = updatedCart
    } 
  },
})

export default cartSlice.reducer;
export const { addToCart, removeFromCart } = cartSlice.actions;