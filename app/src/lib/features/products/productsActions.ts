import axiosClient from "@/lib/axios-client";
import { SerializedError, createAsyncThunk } from "@reduxjs/toolkit";
import { IProduct } from "./productsSlice";
import { AxiosError } from "axios";

export interface ErrorType {
  message: string | undefined;
  status: string | undefined;
}

export const getProducts = createAsyncThunk<
  { data: { products: IProduct[] } },
  string | void,
  { rejectValue: ErrorType }
>("/products/getAll", async (params, { rejectWithValue }) => {
  try {
    let url = "/product";

    if (params) {
      url = "/product?" + params
    }
    
    const { data } = await axiosClient.get(url);
    return data;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorType>
    if (axiosError) {
      return rejectWithValue({
        message: axiosError.response?.data.message,
        status: axiosError.response?.data.status
      })
    }
  }
});

interface SizesRequest {
  size: string
  quantity: number
}

interface AddProductRequest {
  title: string
  description: string
  price: string
  category: string
  sizes: SizesRequest[]
}

export const addProduct = createAsyncThunk<
  { data: { product: IProduct } },
  AddProductRequest,
  { rejectValue: ErrorType }
>("/products/add", async ({title, category, description, price, sizes}, { rejectWithValue }) => {
  try {
    const { data } = await axiosClient.post("/product", {
      title, category, description, price, sizes
    });
    return data;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorType>
    if (axiosError) {
      return rejectWithValue({
        message: axiosError.response?.data.message,
        status: axiosError.response?.data.status
      })
    }
  }
});

export const deleteProduct = createAsyncThunk<
  { id: string },
  string,
  { rejectValue: ErrorType }
>("/products/delete", async (id, { rejectWithValue }) => {
  try {
    const {data} = await axiosClient.delete(`/product/${id}`);
    return data;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorType>
    if (axiosError) {
      return rejectWithValue({
        message: axiosError.response?.data.message,
        status: axiosError.response?.data.status
      })
    }
  }
});