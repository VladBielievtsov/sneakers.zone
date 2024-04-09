import {
  SerializedError,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import axiosClient from "@/lib/axios-client";
import { UserInfo } from "./authSlice";
import { AxiosError } from "axios";

export interface ErrorType {
  message: string | undefined;
  status: string | undefined;
}

export const signup = createAsyncThunk<
  { data: { user: UserInfo; token: string } },
  { fullname: string; username: string; email: string; password: string },
  { rejectValue: ErrorType }
>(
  "/auth/signup",
  async ({ fullname, username, email, password }, { rejectWithValue }) => {
    try {
      const { data } = await axiosClient.post("/auth/signup", {
        fullname,
        username,
        email,
        password,
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
  }
);

export const login = createAsyncThunk<
  { data: { user: UserInfo; token: string } },
  { email: string; password: string },
  { rejectValue: ErrorType }
>("/auth/login", async ({ email, password }, { rejectWithValue }) => {
  try {
    const { data } = await axiosClient.post("/auth/login", {
      email,
      password,
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

export const user = createAsyncThunk<
  { data: { user: UserInfo }  },
  void,
  { rejectValue: ErrorType }
>("/auth/user", async (_, { rejectWithValue }) => {
  try {
    const { data } = await axiosClient.get("/user");
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
