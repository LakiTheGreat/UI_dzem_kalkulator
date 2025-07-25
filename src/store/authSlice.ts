import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export type AuthSlice = {
  userId: number | null;
};

const initialState: AuthSlice = {
  userId: null,
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    logInUser: (state, action: PayloadAction<number>) => {
      state.userId = action.payload;
    },
    logOutUser: (state) => {
      state.userId = null;
    },
  },
});

export const { logInUser, logOutUser } = authSlice.actions;

export default authSlice.reducer;
