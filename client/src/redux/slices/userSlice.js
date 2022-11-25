import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  userLoginApi,
  userLogOutApi,
  userProfileApi,
  userRegisterApi,
} from "../actions/userAction";

// All Actions

export const userRegister = createAsyncThunk(
  "auth/register",
  async ({ user, selectedFile }) => {
    return userRegisterApi(user, selectedFile);
  }
);
export const userLogin = createAsyncThunk("auth/login", async (user) => {
  return userLoginApi(user);
});
export const userLogOut = createAsyncThunk("auth/login", async (user) => {
  return userLogOutApi(user);
});
export const loadUser = createAsyncThunk(
  "auth/user",
  async (rejectWithValue) => {
    return userProfileApi(rejectWithValue);
  }
);

const initialState = {
  loading: false,
  isAuthenticated: false,
  user: null,
  error: "",
  msg: "",
  modal: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    showModal: (state, { payload }) => {
      state.modal = payload;
    },
  },
  extraReducers: {
    [userRegister.pending]: (state) => {
      state.loading = true;
    },
    [userRegister.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.msg = payload;
      state.error = "";
    },
    [userRegister.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.isAuthenticated = false;
    },
    [userLogin.pending]: (state) => {
      state.loading = true;
    },
    [userLogin.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.msg = payload;
      state.error = "";
    },
    [userLogin.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.isAuthenticated = false;
    },
    [userLogOut.pending]: (state) => {
      state.loading = true;
    },
    [userLogOut.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.msg = payload;
      state.isAuthenticated = false;
      state.error = "";
    },
    [userLogOut.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [loadUser.pending]: (state) => {
      state.loading = true;
    },
    [loadUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = payload;
      state.error = "";
    },
    [loadUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = payload;
    },
  },
});

export const { showModal } = userSlice.actions;

export default userSlice.reducer;
