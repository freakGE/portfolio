import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  choosenSection: "",
};

const routerSlice = createSlice({
  name: "section",
  initialState,
  reducers: {
    scrollToSection: (state, action) => {
      state.choosenSection = action.payload;
    },
  },
});

export default routerSlice.reducer;
export const { scrollToSection } = routerSlice.actions;
