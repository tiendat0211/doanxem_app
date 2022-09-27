import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getDefaultLocaleLanguage } from "../../utils/Utils";
import { setLocationHeader } from "../../network/client";
import dayjs from "dayjs";

export type ThemeType = "dark" | "light";
export type LangType = "en" | "vi" | "ja";

interface SettingType {
  theme: ThemeType;
  lang: LangType;
  isFirstOpenApp: boolean;
  canGoToMainApp: boolean;
}

const initSettingState: SettingType = {
  theme: "light",
  lang: getDefaultLocaleLanguage(),
  isFirstOpenApp: true,
  canGoToMainApp: false,
};

const settingSlice = createSlice({
  name: "setting_config",
  initialState: initSettingState,
  reducers: {
    setTheme: (state, payload: PayloadAction<ThemeType>) => {
      state.theme = payload.payload;
    },
    setLang: (state, payload: PayloadAction<LangType>) => {
      state.lang = payload.payload;
      setLocationHeader(payload.payload);
      dayjs.locale(payload.payload);
    },
    setFirstOpenApp: (state, payload: PayloadAction<boolean>) => {
      state.isFirstOpenApp = payload.payload;
    },
    setCanGoToMainApp: (state, payload: PayloadAction<boolean>) => {
      state.canGoToMainApp = payload.payload;
    },
  },
});

export const { setTheme, setLang, setFirstOpenApp, setCanGoToMainApp } = settingSlice.actions;

export default settingSlice;
