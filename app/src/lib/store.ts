import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import ProductsReducer from "./features/products/productsSlice";
import CategoriesReducer from "./features/categories/categoriesSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      products: ProductsReducer,
      categories: CategoriesReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
