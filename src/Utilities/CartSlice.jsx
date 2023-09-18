import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  restInfo: null,
  items: [],
  error: null,
};
const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: {
      reducer(state, action) {
        const { cartItem, restInfo } = action.payload;
        state.restInfo = restInfo;
        const item = state.items.find((item) => item?.id === cartItem?.id);
        if (item) {
          item.qty = item.qty + 1;
        } else {
          cartItem.qty = 1;
          state.items.push(cartItem);
        }
      },
      prepare(cartItem, restInfo) {
        return {
          payload: {
            cartItem,
            restInfo,
          },
        };
      },
    },
    removeItem(state, action) {
      const { cartItem } = action.payload;
      const item = state.items.find((item) => item?.id === cartItem?.id);
      if (item) {
        if (item.qty > 1) item.qty = item.qty - 1;
        else if (item.qty === 1)
          state.items = state.items.filter((items) => items?.id !== item?.id);
      }
    },
    clearCart(state, action) {
      (state.items = []), (resId = "");
    },
  },
});
export const selectCartItem = (state) => state.Cart.items;
export const { addItem, removeItem, clearCart } = CartSlice.actions;
export default CartSlice.reducer;
