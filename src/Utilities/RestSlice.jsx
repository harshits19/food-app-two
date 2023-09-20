import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {};
export const fetchRestaurantData = createAsyncThunk(
  "RestData/fetchRestaurantData",
  async ({ resId, lat, long }) => {
    const res = await fetch(
      `https://corsproxy.io/?https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${long}&restaurantId=${resId}`,
    );
    const data = await res.json();
    return data;
  },
);

const RestSlice = createSlice({
  name: "RestData",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchRestaurantData.fulfilled, (state, action) => {
      const { data } = action.payload;
      const resObj = {
        info: data?.cards[0]?.card?.card?.info,
        offers: data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.offers,
        restList: data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards,
      };
      state = Object.assign(state, { [resObj.info.id]: resObj });
    });
  },
});
export const selectRestById = (state, restId) =>
  state.RestData.filter((rest) => rest === restId);
export const { addRestaurant } = RestSlice.actions;
export default RestSlice.reducer;
