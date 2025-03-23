import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"; // We'll create this next

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;