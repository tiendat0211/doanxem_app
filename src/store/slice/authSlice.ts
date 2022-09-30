import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import UserModel from '../../model/ApiModel/UserModel';

export interface AuthState {
  user?: UserModel;
  token?: string;
  //isFirstTimeLogin: boolean;
}

const initAuthState: AuthState = {
  user: undefined,
  token: '',
  //isFirstTimeLogin: false,
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
    // disableFirstTimeLogin: state => {
    //   state.isFirstTimeLogin = false;
    // },
  },
});

export const { signIn, signOut,  } =
  authSlice.actions;

export default authSlice;
