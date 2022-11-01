import { createSlice } from "@reduxjs/toolkit";
const CounterReducer = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    increment: (state, action) => {
      state.value += action.payload;
    },
    decrement: (state, action) => {
      state.value -= action.payload;
    },
  },
});

export const {decrement , increment}=CounterReducer.actions ;
export default CounterReducer.reducer ;
