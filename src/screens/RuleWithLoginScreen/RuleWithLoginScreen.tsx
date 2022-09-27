import React from "react";
import { Image, Platform, SafeAreaView, ScrollView, StatusBar, Text, View } from "react-native";
import AppStyles from "../../styles/AppStyles";
import AppColors from "../../styles/AppColors";
import { useTheme } from "../../hooks/useTheme";
import { unit1, unit12, unit20, unit24, unit32 } from "../../utils/appUnit";
import { IC_ARROWLEFT, IC_DRAWER, IC_FILTER } from "../../assets/path";
import AppText from "../../components/AppText/AppText";
import { useLanguage } from "../../hooks/useLanguage";
import { fontSize16, fontSize20 } from "../../styles/AppFonts";
import { DrawerActions, NavigationContainer } from "@react-navigation/native";
import PressView from "../../components/PressView/PressView";
import { NavigationRef } from "../../../App";
import TextRule from "../../components/TextRule/TextRule";
import AppBar from "../../components/AppBar/AppBar";


const RuleWithLoginScreen: React.FC = () => {
  const {colorPallet} = useTheme()
  const { language } = useLanguage();

  return (
    <SafeAreaView
      style={[AppStyles.container,{backgroundColor: colorPallet.color_background_1}]}>
      <StatusBar
        barStyle={"dark-content"}
        backgroundColor={AppColors.color_transparent}
      />
      <AppBar
        title={language?.Rule}
        leftIcon={IC_ARROWLEFT}
        leftIconOnClick={()=>{
          NavigationRef.current?.navigate("RegisterScreen")
        }}
        titleStyle={{
          color: colorPallet.color_text_blue_1
        }}
        containerStyle={{
          borderBottomColor:colorPallet.color_divider_3
        }}
      />

      <ScrollView style={{flex: 1}}>
        <TextRule/>
      </ScrollView>

    </SafeAreaView>
  )
};

export default RuleWithLoginScreen;


