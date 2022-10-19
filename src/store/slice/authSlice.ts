import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import UserModel from '../../model/ApiModel/UserModel';

export interface AuthState {
  user?: UserModel;
  token?: string;
}

const initAuthState: AuthState = {
  user: undefined,
  token: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initAuthState,
  reducers: {
    signOut: () => {
      return initAuthState;
    },
    signIn: (state, payload: PayloadAction<AuthState>) => {
      return {
        ...payload.payload,
      };
    },
    updateUser: (state, payload: PayloadAction<UserModel>) => {
      state.user = {
        ...state.user,
        ...payload.payload
      }
    },
  },
});

export const { signIn, signOut, updateUser } =
  authSlice.actions;

export default authSlice;
