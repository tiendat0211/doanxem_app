import React from "react";
import { Image, SafeAreaView, ScrollView, StatusBar, Text, View, ViewStyle } from "react-native";
import AppStyles from "../../styles/AppStyles";
import AppColors from "../../styles/AppColors";
import { useTheme } from "../../hooks/useTheme";
import {  unit16, unit17, unit20, unit24, unit32, unit5 } from "../../utils/appUnit";
import { IC_ARROWLEFT,  IC_CHECK2,IC_ENGLISH, IC_VIETNAM, } from "../../assets/path";
import AppText from "../../components/AppText/AppText";
import { useLanguage } from "../../hooks/useLanguage";
import { fontSize16, fontSize18, fontSize20 } from "../../styles/AppFonts";
import PressView from "../../components/PressView/PressView";
import { NavigationRef } from "../../../App";
import AppBar from "../../components/AppBar/AppBar";
import { setTheme, ThemeType } from "../../store/slice/settingSlice";
import useScreenState from "../../hooks/useScreenState";
import { useAppDispatch } from "../../store/store";
import SelectItem from "../../components/SelectItem/SelectItem";


const ViewModeScreen: React.FC = () => {
  const { colorPallet, theme } = useTheme()
  const { language } = useLanguage();
  const dispatch = useAppDispatch();


  const { isLoading, setLoading, mounted } = useScreenState();

  function changeTheme(theme: ThemeType) {
    setLoading(true);
    setTimeout(() => {
      if (mounted) {
        dispatch(setTheme(theme));
        console.log(theme)
      }
      setLoading(false);
    }, 0);
  }

  return (
    <SafeAreaView
      style={[AppStyles.container, { backgroundColor: colorPallet.color_background_1 }]}>
      <StatusBar
        barStyle={ theme === 'light' ? "dark-content" : "light-content"}
        backgroundColor={AppColors.color_transparent}
      />
      <AppBar
        title={language?.viewMode}
        leftIcon={IC_ARROWLEFT}
        leftIconOnClick={() => {
          NavigationRef.current?.goBack()
        }}
        titleStyle={{
          color: colorPallet.color_text_blue_1
        }}
        containerStyle={{
          borderBottomColor: colorPallet.color_divider_3
        }}
      />

      <ScrollView>
        <SelectItem
          onPress={() => {
            changeTheme("light");
          }}
          title={language?.lightTheme}
          rightImageSource={theme === "light" ? IC_CHECK2 : undefined}
          rightImageProps = {{ tintColor: AppColors.color_primary}}
        />

        <SelectItem
          onPress={() => {
            changeTheme("dark");
          }}
          title={language?.darkTheme}
          rightImageSource={theme === "dark" ? IC_CHECK2 : undefined}
          rightImageProps = {{ tintColor: AppColors.color_primary}}
        />
      </ScrollView>

    </SafeAreaView>
  )
};

export default ViewModeScreen;

