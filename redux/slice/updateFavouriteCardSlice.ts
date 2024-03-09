import { combineReducers, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../constants/interfaces";

interface FavouriteState {
  favouriteList: User[];
  usersList: User[];
}

const initialState: FavouriteState = {
  favouriteList: [],
  usersList: [],
};

const updateFavouriteList = createSlice({
  
  name: "updateFavouriteList",
  initialState,
  reducers: {
    setUsersList(state, action: PayloadAction<any>) {
      state.usersList = action?.payload;
    },
    addToFavourite(state, action: PayloadAction<any>) {
      console.log('ttttt', action.payload)
      const filteredIndex = state.usersList.findIndex(
        (o) => o.id.value.toString() === action.payload.toString()
      );

      if (filteredIndex === -1) {
        return;
      }

      let clonesUsersList = state.usersList;
      clonesUsersList = clonesUsersList?.map((user) => {
        if (user?.id?.value === state?.usersList?.[filteredIndex]?.id?.value) {
          return {
            ...user,
            isFavourite: true,
          };
        } else {
          return user;
        }
      });

      state.usersList = clonesUsersList;
    },
    removeFromFavourite(state, action: PayloadAction<any>) {
      const filteredIndex = state.usersList.findIndex(
        (o) => o.id.value.toString() === action.payload.toString()
      );

      if (filteredIndex === -1) {
        return;
      }

      let clonesUsersList = state.usersList;
      clonesUsersList = clonesUsersList?.map((user) => {
        if (user?.id?.value === state?.usersList?.[filteredIndex]?.id?.value) {
          return {
            ...user,
            isFavourite: false,
          };
        } else {
          return user;
        }
      });

      state.usersList = clonesUsersList;
    },
  },
});

export const { addToFavourite, removeFromFavourite, setUsersList } =
  updateFavouriteList.actions;

export default updateFavouriteList.reducer;
