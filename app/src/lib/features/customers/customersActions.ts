import { createAsyncThunk } from "@reduxjs/toolkit";
import { ICustomer } from "./customersSlice";
import axiosClient from "@/lib/axios-client";
import { AxiosError } from "axios";

export interface ErrorType {
  message: string | undefined;
  status: string | undefined;
}

export const getCustomers = createAsyncThunk<
  { data: { customers: ICustomer[] } },
  void,
  { rejectValue: ErrorType }
>("/customers/getAll", async (_, { rejectWithValue }) => {
  try {
    const { data } = await axiosClient.get("/customers");
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
})