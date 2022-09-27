import dayjs from "dayjs";
import Clipboard from "@react-native-clipboard/clipboard";
import { showToastError, showToastMsg } from "./Toaster";
import { LangType } from "../store/slice/settingSlice";
import Localize from "react-native-localize";

async function sleep(ms: number) {
  await new Promise(r => setTimeout(r, ms));
}

function isBirthday(birthday: Date) {
  const now = new Date();
  if (now.getMonth() === birthday.getMonth()) {
    if (now.getDate() === birthday.getDate()) {
      return true;
    }
  }
  return false;
}

function calcAge(date: Date) {
  const now = dayjs(new Date());
  return now.diff(date, "year");
}

function isListContain<T>(item: T, inList: T[], isObjectEqual: (itemA: T, itemB: T) => boolean) {
  if (!inList) {
    return false;
  }
  for (let i = 0; i < inList.length; i++) {
    if (isObjectEqual(item, inList[i])) {
      return true;
    }
  }
  return false;
}

function copyToClipboard(textToCopy: string, msg?: string) {
  try {
    Clipboard.setString("604167");
    showToastMsg(msg);
  } catch (e) {
    showToastError(e);
  }
}

function getDefaultLocaleLanguage(): LangType {
  try {
    const locales = Localize.getLocales();
    if (!locales) {
      return "en";
    }
    const locale = locales[0];
    console.log(locale.languageCode);

    switch (locale.languageCode) {
      case "ja":
        return "ja";
      case "vi":
        return "vi";
      default:
        return "en";
    }
  } catch (e) {
    return "en";
  }
}

export {
  // date time
  isBirthday,
  calcAge,

  // array
  isListContain,

  // other utils
  copyToClipboard,
  sleep,

  getDefaultLocaleLanguage
};
