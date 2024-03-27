import { SerializedError, createSlice } from "@reduxjs/toolkit";
import { getCookie, hasCookie, deleteCookie } from "cookies-next";
import { login, signup, user } from "./authActions";

export interface UserInfo {
  id: number;
  email: string;
  username: string;
  fullname: string;
  password: string;
}

type CookieValueTypes = string | undefined;

export interface AuthState {
  loading: boolean;
  userInfo: null | UserInfo;
  token: null | CookieValueTypes;
  error: null | SerializedError | undefined;
  success: boolean;
}

const token = hasCookie("ACCESS_TOKEN") ? getCookie("ACCESS_TOKEN") : null;

const initialState: AuthState = {
  loading: false,
  userInfo: null,
  token,
  error: null,
  success: false,
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
    });
    builder.addCase(signup.fulfilled, (state, { payload }) => {
      state.loading = false;
      //@ts-ignore
      state.userInfo = payload.data.user;
      //@ts-ignore
      state.token = payload.data.token;
    });
    builder.addCase(signup.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    // Login
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.loading = false;
      //@ts-ignore
      state.userInfo = payload.data.user;
      //@ts-ignore
      state.token = payload.data.token;
    });
    builder.addCase(login.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    // User
    builder.addCase(user.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(user.fulfilled, (state, { payload }) => {
      state.loading = false;
      //@ts-ignore
      state.userInfo = payload.data.user;
    });
    builder.addCase(user.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
