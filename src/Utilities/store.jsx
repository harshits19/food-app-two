import { configureStore } from "@reduxjs/toolkit";
import AppSlice from "./AppSlice";
import HomePageSlice from "./HomePageSlice";
import CartSlice from "./CartSlice";
import RestSlice from "./RestSlice";

const store = configureStore({
  reducer: {
    AppData: AppSlice,
    HomeData: HomePageSlice,
    Cart: CartSlice,
    RestData: RestSlice,
  },
});

export default store;
