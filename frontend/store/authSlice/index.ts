import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, AuthState } from "../../ts/interfaces/auth";
import {
  register,
  login,
  logout,
  updateTokens,
  fetchUser,
} from "./actions";

export const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  authLoadingStatus: "IDLE",
  fetchUserSuccess: false,
  updateTokenSuccess: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthLoadingStatus(state) {
      state.authLoadingStatus = "PENDING";
    },
  },
  extraReducers: (builder) => {
    builder
      // SIGNUP
      .addCase(register.pending, (state) => {
        state.authLoadingStatus = "PENDING";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.authLoadingStatus = "IDLE";
      })
      .addCase(register.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.authLoadingStatus = "IDLE";
      })

      // LOGIN
      .addCase(login.pending, (state) => {
        state.isAuthenticated = false;
        state.authLoadingStatus = "PENDING";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.authLoadingStatus = "IDLE";
      })
      .addCase(login.rejected, (state) => {
        state.isAuthenticated = false;
        state.authLoadingStatus = "IDLE";
      })

      // UPDATE TOKENS
      .addCase(updateTokens.pending, (state) => {
        state.isAuthenticated = false;
        state.authLoadingStatus = "PENDING";
        state.user = null;
      })
      .addCase(updateTokens.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.authLoadingStatus = "IDLE";
      })
      .addCase(updateTokens.rejected, (state) => {
        state.isAuthenticated = false;
        state.authLoadingStatus = "IDLE";
      })
    
      // FETCH USER
      .addCase(fetchUser.pending, (state) => {
        state.authLoadingStatus = "PENDING";
        state.isAuthenticated = false;
        state.fetchUserSuccess = false;
      })
      .addCase(
        fetchUser.fulfilled,
        (state, action: PayloadAction<{ message: string; user: User }>) => {
          state.isAuthenticated = true;
          state.authLoadingStatus = "IDLE";
          state.user = action.payload.user;
          state.fetchUserSuccess = true
        }
      )
      .addCase(fetchUser.rejected, (state) => {
        state.authLoadingStatus = "IDLE";
        state.isAuthenticated = false;
        state.user = null;
      })

      // LOGOUT
      .addCase(logout.pending, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.authLoadingStatus = "PENDING";
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.authLoadingStatus = "IDLE";
      })
      .addCase(logout.rejected, (state) => {
        state.authLoadingStatus = "IDLE";
      });
  },
});

export const { resetAuthLoadingStatus } = authSlice.actions;
export default authSlice.reducer;
