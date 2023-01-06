import { configureStore } from "@reduxjs/toolkit";

import hamburgerReducer from "../slices/hamburgerSlice";
import routerReducer from "../slices/routerSlice";
import cursorSlice from "../slices/cursorSlice";

export const store = configureStore({
  reducer: {
    hamburger: hamburgerReducer,
    section: routerReducer,
    cursor: cursorSlice,
  },
});

export default store;
