import { createSlice } from "@reduxjs/toolkit";
import { getCustomers } from "./customersActions";

export interface ICustomer {
  id: string
	fullname: string
	email: string
	password: string
	googleId: null | string
	isConfirmed: boolean
	role: string
	confirmationToken: string
	createdAt: string
	updatedAt: string
}

interface CustomersState {
  list: ICustomer[] | null
  error: string | null | undefined;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: CustomersState = {
  list: null,
  error: null,
  status: "idle"
}

const customersSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {},
  extraReducers(builder) {
    // GET ALL
    builder.addCase(getCustomers.pending, (state) => {
      state.status = "loading";
      state.list = null;
      state.error = null;
    });
    builder.addCase(getCustomers.fulfilled, (state, { payload }) => {
      state.status = "succeeded";
      state.list = payload.data.customers;
    });
    builder.addCase(getCustomers.rejected, (state, { payload }) => {
      state.status = "failed";
      state.error = payload?.message;
    });
  },
})

export default customersSlice.reducer;