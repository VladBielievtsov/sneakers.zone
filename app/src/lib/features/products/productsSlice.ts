import { SerializedError, createSlice } from "@reduxjs/toolkit";
import { addProduct, getProducts } from "./productsActions";

export interface IProduct {
  id: number;
  title: string;
  description: string;
  price: string;
  category: string;
  createdAt: string;
}

export interface ProductsState {
  products: null | IProduct[];
  error: string | null | undefined;
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
    // GET ALL
    builder.addCase(getProducts.pending, (state) => {
      state.status = "loading";
      state.products = null;
      state.error = null;
    });
    builder.addCase(getProducts.fulfilled, (state, { payload }) => {
      state.status = "succeeded";
      state.products = payload.data.products;
    });
    builder.addCase(getProducts.rejected, (state, { payload }) => {
      state.status = "failed";
      state.error = payload?.message;
    });
    // STORE
    builder.addCase(addProduct.pending, (state) => {
      state.status = "loading"
      state.error = null;
    })
    builder.addCase(addProduct.fulfilled, (state, { payload }) => {
      state.status = "succeeded"
      state.products?.push(payload.data.product);
    })
    builder.addCase(addProduct.rejected, (state, { payload }) => {
      state.status = "failed"
      state.error = payload?.message;
    })
  },
});

export default productsSlice.reducer;
