import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../redux/slices/postSlice";
import userReducer from "../redux/slices/userSlice";

export const store = configureStore({
  reducer: {
    post: postReducer,
    user: userReducer,
  },
});
