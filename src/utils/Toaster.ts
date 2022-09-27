import Snackbar, { SnackBarOptions } from "react-native-snackbar";
import axios from "axios";
import AppColors from "../styles/AppColors";

export function showToastError(e: unknown, options?: Partial<SnackBarOptions>) {
  if (axios.isAxiosError(e)) {
    showToastMsg(e.message, {
      ...options,
    });
    return;
  }
}

export function showToastErrorMessage(msg: string, options?: Partial<SnackBarOptions>) {
  showToastMsg(msg, {
    ...options,
  });
}

export function showToastSuccess(msg: string, options?: Partial<SnackBarOptions>) {
  showToastMsg(msg, {
    ...options,
  });
}

export function showToastMsg(msg?: string, options?: Partial<SnackBarOptions>) {
  if (!msg) {
    return;
  }
  Snackbar.show({
    text: msg,
    duration: Snackbar.LENGTH_LONG,
    textColor: AppColors.color_white,
    ...options,
  });
}
