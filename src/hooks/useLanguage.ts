import vn from "../i18n/vn";
import en from "../i18n/en";
import BaseLanguage from "../i18n/BaseLanguage";
import { useAppDispatch, useAppSelector } from "../store/store";
import { LangType, setLang } from "../store/slice/settingSlice";

const getTranslate = (langCode: LangType): BaseLanguage => {
  switch (langCode) {
    case "vi":
      return vn;
    default:
      return en;
  }
};

export const useLanguage = () => {
  const lang = useAppSelector(state => state.setting).lang;
  const dispatch = useAppDispatch();
  return {
    lang,
    language: getTranslate(lang),
    setLanguage(lang: LangType) {
      dispatch(setLang(lang));
    },
  };
};

export const useLocale = () => {
  return useAppSelector(state => state.setting.lang)
}
