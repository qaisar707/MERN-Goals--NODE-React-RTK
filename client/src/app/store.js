import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice.js";
import goalReducer from "../features/goals/goalSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    goals: goalReducer,
  },
});
