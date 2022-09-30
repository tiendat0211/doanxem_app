import React from "react";
import { Image, Platform, SafeAreaView, StatusBar, Text, View } from "react-native";
import AppStyles from "../../styles/AppStyles";
import AppColors from "../../styles/AppColors";
import { unit16, unit18, unit35, unit40, unit50, unit52 } from "../../utils/appUnit";
import { IC_BUTTON_NEXT, IC_LOGO, IMG_ONBOARDING } from "../../assets/path";
import AppText from "../../components/AppText/AppText";
import { fontSize16, fontSize24 } from "../../styles/AppFonts";
import PressView from "../../components/PressView/PressView";
import { NavigationRef } from "../../../App";
import { useTheme } from "../../hooks/useTheme";
import { useLanguage } from "../../hooks/useLanguage";

const SplashScreen: React.FC = () => {

  const {colorPallet, theme } = useTheme()
  const { language } = useLanguage();

  return <SafeAreaView style={[AppStyles.centerContainer, {
    backgroundColor: AppColors.color_white,
  }]}>
    <StatusBar
      translucent
      backgroundColor={AppColors.color_transparent}
      barStyle={ theme === 'light' ? "dark-content" : "light-content"}
    />
    <View
      style={{
        alignItems:'center',
        flexGrow:1,
        marginTop: (Platform.OS === "android" ? StatusBar.currentHeight || 0 : 0) + unit18,
      }}
    >
      <Image
        source={IC_LOGO}
        style={{
          width: 101,
          height: 42,
          marginBottom: unit40,
        }}
      />
      <Image source={IMG_ONBOARDING} style={{width: 334.5, height: 336.5}}/>
      <AppText
        fontType={'bold'}
        style={{
          textAlign: "center",
          fontSize: fontSize24,
          marginTop: unit35,
          marginBottom: unit16,
          color: '#0B2347',
        }}>
        {language?.onboarding_title}
      </AppText>
      <AppText
        fontType={'regular'}
        style={{
          textAlign: "center",
          marginHorizontal: unit52,
          fontSize: fontSize16,
          color: '#ADADAD',
        }}>
        {language?.onboarding_slogan}
      </AppText>
    </View>

  </SafeAreaView>;
};

export default SplashScreen;
