import { configureStore } from "@reduxjs/toolkit";
import AppSlice from "./AppSlice";
import HomePageSlice from "./HomePageSlice";
import CartSlice from "./CartSlice";

const store = configureStore({
  reducer: {
    AppData: AppSlice,
    HomeData: HomePageSlice,
    Cart: CartSlice,
  },
});

export default store;
