import { configureStore } from "@reduxjs/toolkit";
import favouriteCardReducer from "./slice/updateFavouriteCardSlice";

const store = configureStore({
  reducer: {
    users: favouriteCardReducer,
  },
});

export default store;

