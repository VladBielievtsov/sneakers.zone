import axiosClient from "@/lib/axios-client";
import { SerializedError, createAsyncThunk } from "@reduxjs/toolkit";

export const getCategories = createAsyncThunk<
  void,
  void,
  { rejectValue: SerializedError }
>("/categories/getAll", async (_, { rejectWithValue }) => {
  try {
    const { data } = await axiosClient.get("/category");
    return data;
  } catch (error: any) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message);
    }
  }
});
