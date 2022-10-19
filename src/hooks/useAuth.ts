import { AuthState, signIn, signOut, updateUser } from "../store/slice/authSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { setAccessToken, setLocationHeader } from "../network/client";
import UserModel from "../model/ApiModel/UserModel";
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
    updateUser: (newUserData: UserModel) => {
      dispatch(updateUser(newUserData));
    }
  };
}
