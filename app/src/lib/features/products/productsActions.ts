import axiosClient from "@/lib/axios-client";
import { SerializedError, createAsyncThunk } from "@reduxjs/toolkit";

export const getProducts = createAsyncThunk<
  void,
  string[],
  { rejectValue: SerializedError }
>("/products/getAll", async (categories, { rejectWithValue }) => {
  try {
    let url = "/products";
    if (categories.length > 0) {
      const categoryParams = categories
        .map((category) => `category[]=${encodeURIComponent(category)}`)
        .join("&");
      url += `?${categoryParams}`;
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
