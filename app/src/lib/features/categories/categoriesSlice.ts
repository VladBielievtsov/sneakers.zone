import { SerializedError, createSlice } from "@reduxjs/toolkit";
import { getCategories } from "./categoriesActions";

export interface ICategory {
  id: number;
  name: string;
  created_at: string;
}

export interface CategoriesState {
  categories: null | ICategory[];
  error: null | SerializedError | undefined;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: CategoriesState = {
  categories: null,
  error: null,
  status: "idle",
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getCategories.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(getCategories.fulfilled, (state, { payload }) => {
      state.status = "succeeded";
      //@ts-ignore
      state.categories = payload.data;
    });
    builder.addCase(getCategories.rejected, (state, { payload }) => {
      state.status = "failed";
      state.error = payload;
    });
  },
});

export default categoriesSlice.reducer;
