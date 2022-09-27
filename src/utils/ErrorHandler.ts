import Snackbar from "react-native-snackbar";
import axios from "axios";

export class ErrorHandler {
  static showErrorMessage(message: string | undefined = undefined): void {
    Snackbar.show({
      text: message || "Đã có lỗi xảy ra, vui lòng thử lại",
      duration: Snackbar.LENGTH_SHORT,
      numberOfLines: 3,
    });
  }

  static showError(e: unknown): void {
    if (axios.isAxiosError(e)) {
      ErrorHandler.showErrorMessage(e.response?.data?.message);
    } else if (e instanceof Error) {
      ErrorHandler.showErrorMessage(e.message);
    } else {
      ErrorHandler.showErrorMessage();
    }
  }

  static showErrorLog(e: unknown): void {
    console.error(e);
  }
}
