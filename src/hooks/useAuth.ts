import { AuthState, signIn, signOut } from "../store/slice/authSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { setAccessToken, setLocationHeader } from "../network/client";
import UserModel from "../model/UserModel";
import { LangType, setLang } from "../store/slice/settingSlice";

export default function useAuth() {
  const dispatch = useAppDispatch();
  const authData = useAppSelector(state => state.auth);
  return {

    signIn: (authData: AuthState) => {
      setAccessToken(authData.token);
      dispatch(signIn(authData));
    },
    signOut: () => {
      setAccessToken(undefined);
      dispatch(signOut());
    },
    authData,
  };
}
