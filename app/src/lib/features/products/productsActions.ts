import axiosClient from "@/lib/axios-client";
import { SerializedError, createAsyncThunk } from "@reduxjs/toolkit";

export const getProducts = createAsyncThunk<
  void,
  string | void,
  { rejectValue: SerializedError }
>("/products/getAll", async (params, { rejectWithValue }) => {
  try {
    let url = "/product";

    if (params) {
      url = "/product?" + params
    }
    
    const { data } = await axiosClient.get(url);
    return data;
  } catch (error: any) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message);
    }
  }
});
