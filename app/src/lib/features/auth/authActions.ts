import {
  PayloadAction,
  SerializedError,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import axiosClient from "@/lib/axios-client";

export const signup = createAsyncThunk<
  void,
  { fullname: string; username: string; email: string; password: string },
  { rejectValue: SerializedError }
>(
  "/auth/signup",
  async ({ fullname, username, email, password }, { rejectWithValue }) => {
    try {
      const { data } = await axiosClient.post("/signup", {
        fullname,
        username,
        email,
        password,
      });
      return data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const login = createAsyncThunk<
  void,
  { email: string; password: string },
  { rejectValue: SerializedError }
>("/auth/login", async ({ email, password }, { rejectWithValue }) => {
  try {
    const { data } = await axiosClient.post("/login", {
      email,
      password,
    });
    return data;
  } catch (error: any) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message);
    }
  }
});

export const user = createAsyncThunk<
  void,
  void,
  { rejectValue: SerializedError }
>("/auth/user", async (_, { rejectWithValue }) => {
  try {
    const { data } = await axiosClient.get("/user");
    return data;
  } catch (error: any) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message);
    }
  }
});
