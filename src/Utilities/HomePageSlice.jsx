import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FETCH_HOME_DATA_URL, FETCH_MORE_DATA_URL } from "./Constants";

const initialState = {
  cards: { carouselCards: [], categoryCards: [], status: "idle" },
  restCards: [],
  status: "idle",
  error: null,
  page: Number(10),
  notAvail: false,
};

export const fetchData = createAsyncThunk(
  "HomeData/fetchData",
  async ({ lat, long }) => {
    const res = await fetch(`${FETCH_HOME_DATA_URL}lat=${lat}&lng=${long}`);
    const data = await res.json();
    return data;
  },
);

export const fetchMoreData = createAsyncThunk(
  "HomeData/fetchMoreData",
  async ({ lat, long, page }) => {
    const response = await fetch(FETCH_MORE_DATA_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lat: lat,
        lng: long,
        nextOffset: "COVCELQ4KIDoiofsxaDvBjCnEzgE",
        seoParams: {
          apiName: "FoodHomePage",
          pageType: "FOOD_HOMEPAGE",
          seoUrl: "https://www.swiggy.com/",
        },
        widgetOffset: {
          NewListingView_Topical_Fullbleed: "",
          NewListingView_category_bar_chicletranking_TwoRows: "",
          NewListingView_category_bar_chicletranking_TwoRows_Rendition: "",
          collectionV5RestaurantListWidget_SimRestoRelevance_food_seo:
            String(page),
        },
      }),
    });
    const data = await response.json();
    return data;
  },
);

const HomePageSlice = createSlice({
  name: "HomeData",
  initialState,
  reducers: {
    updatePage: (state, action) => {
      state.page = Number(state?.page) + Number(15);
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      const data = action.payload;
      state.status = "success";
      state.cards.status = "success";
      data?.data?.cards?.map((item) => {
        if (item?.card?.card?.id === "swiggy_not_present")
          state.notAvail = true;
        if (item?.card?.card?.id === "topical_banner")
          state.cards.carouselCards =
            item?.card?.card?.imageGridCards?.info ||
            item?.card?.card?.gridElements?.infoWithStyle?.info;
        if (item?.card?.card?.id === "whats_on_your_mind")
          state.cards.categoryCards =
            item?.card?.card?.imageGridCards?.info ||
            item?.card?.card?.gridElements?.infoWithStyle?.info;
        if (item?.card?.card?.id === "restaurant_grid_listing")
          state.restCards =
            item?.card?.card?.gridElements?.infoWithStyle?.restaurants;
      });
    });
    builder.addCase(fetchData.pending, (state, action) => {
      state.status = "loading";
      state.cards.status = "loading";
    });
    builder.addCase(fetchData.rejected, (state, action) => {
      state.status = "failed";
      state.cards.status = "failed";
      state.error = action.error.message;
    });
    builder.addCase(fetchMoreData.fulfilled, (state, action) => {
      state.status = "success";
      const data = action.payload;
      const resData =
        data?.data?.cards[0]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants;
      state.restCards = [...state.restCards, ...resData];
    });
    builder.addCase(fetchMoreData.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchMoreData.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});
export const selectCarouselData = (state) => state.HomeData?.cards;
export const selectRestCards = (state) => state.HomeData?.restCards;
export const selectHomeStatus = (state) => state.HomeData?.status;
export const selectCarouselStatus = (state) => state.HomeData?.cards?.status;
export const selectHomeError = (state) => state.HomeData?.error;
export const selectAvailStatus = (state) => state.HomeData?.notAvail;
export const selectPageNum = (state) => state.HomeData?.page;
export const { updatePage } = HomePageSlice.actions;
export default HomePageSlice.reducer;
