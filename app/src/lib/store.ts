import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import ProductsReducer from "./features/products/productsSlice";
import cartReducer from "./features/cart/cartSlice";
import customersReducer from "./features/customers/customersSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      products: ProductsReducer,
      cart: cartReducer,
      customers: customersReducer
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
