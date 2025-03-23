import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"; 
import companyReducer from "./companySlice"; // ✅ Import company slice

const store = configureStore({
  reducer: {
    user: userReducer,
    company: companyReducer, // ✅ Add company reducer here
  },
});

export default store;
