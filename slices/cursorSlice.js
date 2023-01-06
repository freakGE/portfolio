import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cursorVariant: "default",
};

const cursorSlice = createSlice({
  name: "cursor",
  initialState,
  reducers: {
    changeCursor: (state, action) => {
      state.cursorVariant = action.payload;
    },
  },
});

export const { changeCursor } = cursorSlice.actions;
export default cursorSlice.reducer;
