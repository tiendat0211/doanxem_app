import React from "react";
import { Image, Platform, SafeAreaView, StatusBar, Text, View } from "react-native";
import AppStyles from "../../styles/AppStyles";
import AppColors from "../../styles/AppColors";
import { unit14, unit16, unit18, unit32, unit35, unit40, unit50, unit52, unit53 } from "../../utils/appUnit";
import { IC_BUTTON_NEXT, IC_LOGO, IMG_ONBOARDING } from "../../assets/path";
import AppText from "../../components/AppText/AppText";
import { useLanguage } from "../../hooks/useLanguage";
import { fontSize16, fontSize24 } from "../../styles/AppFonts";
import { useTheme } from "../../hooks/useTheme";
import PressView from "../../components/PressView/PressView";
import { NavigationRef } from "../../../App";

const OnboardingScreen: React.FC = () => {

  const language = useLanguage();
  const {colorPallet} = useTheme()

  return <SafeAreaView style={[AppStyles.centerContainer, {
    backgroundColor: AppColors.color_white,
  }]}>
    <StatusBar
      translucent
      backgroundColor={AppColors.color_transparent}
      barStyle={"dark-content"}
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
        // fontType="medium"
        style={{
          textAlign: "center",
          fontSize: fontSize24,
          marginTop: unit35,
          marginBottom: unit16,
          color: colorPallet.color_text_blue_1,
        }}>
        {language?.onboarding_title}
      </AppText>
      <AppText
        fontType="regular"
        style={{
          textAlign: "center",
          marginHorizontal: unit52,
          fontSize: fontSize16,
          color: colorPallet.color_text_gray_3
        }}>
        {language?.onboarding_slogan}
      </AppText>
    </View>
    <PressView
      onPress={() => {
        NavigationRef.current?.navigate("LoginScreen");
      }}
    >
      <Image
        source={IC_BUTTON_NEXT}
        style={{width: 100, height: 100, marginBottom:unit50}}
      />
    </PressView>

  </SafeAreaView>;
};

export default OnboardingScreen;
