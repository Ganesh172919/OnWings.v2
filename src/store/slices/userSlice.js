import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  user: null,
  isLoginModalOpen: false,
  isSignupModalOpen: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
      state.isLoginModalOpen = false;
      state.isSignupModalOpen = false;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    toggleLoginModal: (state) => {
      state.isLoginModalOpen = !state.isLoginModalOpen;
    },
    toggleSignupModal: (state) => {
      state.isSignupModalOpen = !state.isSignupModalOpen;
    },
  },
});

export const { login, logout, toggleLoginModal, toggleSignupModal } =
  userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectIsLoggedIn = (state) => state.user.isLoggedIn;
export const selectIsLoginModalOpen = (state) => state.user.isLoginModalOpen;
export const selectIsSignupModalOpen = (state) => state.user.isSignupModalOpen;

export default userSlice.reducer;
