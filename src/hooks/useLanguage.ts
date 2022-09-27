import vn from "../i18n/vn";
import en from "../i18n/en";
import BaseLanguage from "../i18n/BaseLanguage";
import {useAppSelector} from "../store/store";
import {LangType} from "../store/slice/settingSlice";

const getTranslate = (langCode: LangType): BaseLanguage => {
  switch (langCode) {
    case "vi":
      return vn;
  }
  return en;
};

export const useLanguage = () => {
  return getTranslate(useAppSelector(state => state.setting.lang));
};

export const useLocale = () => {
  return useAppSelector(state => state.setting.lang)
}
