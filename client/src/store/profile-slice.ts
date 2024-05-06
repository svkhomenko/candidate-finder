import { createSlice } from '@reduxjs/toolkit';
import type { IRole } from '~/types/user';

type IInitialState = {
  user: {
    id: string | undefined;
    email: string | undefined;
    fullName: string | undefined;
    role: IRole | undefined;
    phoneNumber: string | undefined;
  };
  accessToken: string | null;
};

const initialState: IInitialState = {
  user: {
    id: undefined,
    email: undefined,
    fullName: undefined,
    role: undefined,
    phoneNumber: undefined,
  },
  accessToken: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setUser(state, { payload }) {
      const { accessToken, ...user } = payload;
      state.user = user;
    },
    setUserAndToken(state, { payload }) {
      const { accessToken, ...user } = payload;
      state.user = user;
      state.accessToken = accessToken;
    },
    updateUser(state, { payload }) {
      Object.assign(state.user, payload);
    },
    setToken(state, { payload }) {
      const { accessToken } = payload;
      state.accessToken = accessToken;
    },
    logout(state) {
      state.user = initialState.user;
      state.accessToken = null;
    },
  },
});

export const { setUser, setUserAndToken, setToken, updateUser, logout } = profileSlice.actions;
export default profileSlice.reducer;
