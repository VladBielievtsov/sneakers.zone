import { createSlice } from "@reduxjs/toolkit";
import { addProduct, deleteProduct, editProduct, getProducts } from "./productsActions";

export interface Sizes {
  id: number
  size: string
  quantity: number
  productID: string
}

export interface IProduct {
  id: string;
  title: string;
  description: string;
  price: string;
  sizes: Sizes[];
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
    // EDIT
    builder.addCase(editProduct.pending, (state) => {
      state.status = "loading"
      state.error = null;
    })
    builder.addCase(editProduct.fulfilled, (state, { payload }) => {
      const editedProduct = payload.data.product;
      const existingProductIndex = state.products?.findIndex(p => p.id === editedProduct.id);
      if (existingProductIndex !== undefined && existingProductIndex !== -1 && state.products) {
        state.products[existingProductIndex] = editedProduct;
        state.status = "succeeded";
      }
    })
    builder.addCase(editProduct.rejected, (state, { payload }) => {
      state.status = "failed"
      state.error = payload?.message;
    })
    // DELETE
    builder.addCase(deleteProduct.pending, (state) => {
      state.status = "loading"
      state.error = null;
    })
    builder.addCase(deleteProduct.fulfilled, (state, { payload }) => {
      state.status = "succeeded"
      state.products = state.products?.filter((product) => product.id !== payload.id) || null;
    })
    builder.addCase(deleteProduct.rejected, (state, { payload }) => {
      state.status = "failed"
      state.error = payload?.message;
    })
  },
});

export default productsSlice.reducer;
