import type { User } from "@/types/user.type";
import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  user: User[] | null;
  accessToken: string | null;
  refreshToken: string | null;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
    },
    setAuthData: (state, action) => {
      console.log("🚀 ~ action:", action);
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    updateToken(state, action) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
  },
});

export const { logout, updateToken, setAuthData } = authSlice.actions;
export default authSlice.reducer;
