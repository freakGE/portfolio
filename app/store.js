import { configureStore } from "@reduxjs/toolkit";

import hamburgerReducer from "../slices/hamburgerSlice";
import routerReducer from "../slices/routerSlice";

export const store = configureStore({
  reducer: {
    hamburger: hamburgerReducer,
    section: routerReducer,
  },
});

export default store;
