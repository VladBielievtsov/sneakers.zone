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
  error: null | SerializedError | undefined;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: ProductsState = {
  products: null,
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
      state.error = null;
    });
    builder.addCase(getProducts.fulfilled, (state, { payload }) => {
      state.status = "succeeded";
      //@ts-ignore
      state.products = payload.data;
    });
    builder.addCase(getProducts.rejected, (state, { payload }) => {
      state.status = "failed";
      state.error = payload;
    });
  },
});

export default productsSlice.reducer;
