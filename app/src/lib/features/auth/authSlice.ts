import { createSlice } from "@reduxjs/toolkit";
import { getCookie, hasCookie, deleteCookie } from "cookies-next";
import { login, signup, user } from "./authActions";

export interface UserInfo {
  id: number;
  email: string;
  username: string;
  fullname: string;
  password: string;
  role: string
}

type CookieValueTypes = string | undefined;

export interface AuthState {
  loading: boolean;
  userInfo: null | UserInfo;
  token: null | CookieValueTypes;
  error: string | null | undefined;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const token = hasCookie("ACCESS_TOKEN") ? getCookie("ACCESS_TOKEN") : null;

const initialState: AuthState = {
  loading: false,
  userInfo: null,
  token,
  error: null,
  status: "idle"
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      deleteCookie("ACCESS_TOKEN");
      state.loading = false;
      state.userInfo = null;
      state.token = null;
      state.error = null;
    },
  },
  extraReducers(builder) {
    // Sign up
    builder.addCase(signup.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.status = "loading"
    });
    builder.addCase(signup.fulfilled, (state, {payload}) => {
      state.loading = false;
      state.userInfo = null;
      state.token = null;
      state.status = "succeeded"
    });
    builder.addCase(signup.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload?.message;
      state.status = "failed"
    });
    // Login
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.status = "loading"
    });
    builder.addCase(login.fulfilled, (state, {payload}) => {
      state.loading = false;
      state.userInfo = payload.data.user;
      state.token = payload.data.token;
      state.status = "succeeded"
    });
    builder.addCase(login.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload?.message;
    });
    // User
    builder.addCase(user.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.status = "loading"
    });
    builder.addCase(user.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload.data.user;
      state.status = "succeeded"
    });
    builder.addCase(user.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload?.message;
      state.status = "failed"
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
