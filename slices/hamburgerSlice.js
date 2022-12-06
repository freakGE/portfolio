import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hamburgerIsOpen: false,
};

const hamburgerSlice = createSlice({
  name: "hamburger",
  initialState,
  reducers: {
    openHamburger: (state, action) => {
      state.hamburgerIsOpen = action.payload;
    },
  },
});

export default hamburgerSlice.reducer;
export const { openHamburger } = hamburgerSlice.actions;
