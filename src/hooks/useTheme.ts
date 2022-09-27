import lightColors from '../styles/theme/lightColors';
import darkColors from '../styles/theme/darkColors';
import { useAppDispatch, useAppSelector } from "../store/store";
import { setCanGoToMainApp, setFirstOpenApp } from "../store/slice/settingSlice";

export function useTheme() {
  const theme = useAppSelector(state => state.setting).theme;
  return {
    theme: theme,
    colorPallet: theme === 'light' ? lightColors : darkColors,
  };
}

export function useSetting() {
  const { isFirstOpenApp, canGoToMainApp } = useAppSelector(state => state.setting)
  const dispatch = useAppDispatch()
  return {
    isFirstOpenApp,
    canGoToMainApp,
    setFirstOpenApp(isFirst: boolean) {
      dispatch(setFirstOpenApp(isFirst))
    },
    setGoToMainApp(canGo: boolean) {
      dispatch(setCanGoToMainApp(canGo))
    }
  }
}
