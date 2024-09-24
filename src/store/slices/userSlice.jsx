import { createSlice } from "@reduxjs/toolkit";

// userSlice.js
const initialState = {
  user: null,
  role: null,
  isAuthenticated: false, // Track login state
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setRole(state, action) {
      state.role = action.payload;
    },
    setAuthenticated(state, action) {
      state.isAuthenticated = action.payload; // Set the login status
    },
    logOut(state) {
      state.user = null;
      state.role = null;
      state.isAuthenticated = false; // Reset login state
    },
  },
});

export const { setUser, setRole, setAuthenticated, logOut } = userSlice.actions;
export default userSlice.reducer;
