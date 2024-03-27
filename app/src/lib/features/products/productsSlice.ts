import { SerializedError, createSlice } from "@reduxjs/toolkit";
import { getProducts } from "./productsActions";
import { ICategory } from "../categories/categoriesSlice";

export interface IProduct {
  id: number;
  title: string;
  description: string;
  price: string;
  category: ICategory;
  created_at: string;
}

export interface ProductsState {
  products: null | IProduct[];
  min_price: number | null;
  max_price: number | null;
  error: null | SerializedError | undefined;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: ProductsState = {
  products: null,
  min_price: null,
  max_price: null,
  error: null,
  status: "idle",
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getProducts.pending, (state) => {
      state.status = "loading";
      state.products = null;
      state.min_price = null;
      state.max_price = null;
      state.error = null;
    });
    builder.addCase(getProducts.fulfilled, (state, { payload }) => {
      state.status = "succeeded";
      //@ts-ignore
      state.products = payload.data.products;
      //@ts-ignore
      state.min_price = payload.min_price;
      //@ts-ignore
      state.max_price = payload.max_price;
    });
    builder.addCase(getProducts.rejected, (state, { payload }) => {
      state.status = "failed";
      state.error = payload;
    });
  },
});

export default productsSlice.reducer;
