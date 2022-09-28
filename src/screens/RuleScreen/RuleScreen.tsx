import React from "react";
import { Button, Image, Platform, SafeAreaView, ScrollView, StatusBar, Text, View } from "react-native";
import AppStyles from "../../styles/AppStyles";
import useAuth from "../../hooks/useAuth";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AppColors from "../../styles/AppColors";
import { useTheme } from "../../hooks/useTheme";
import { unit1, unit12, unit20, unit24, unit32 } from "../../utils/appUnit";
import { IC_DRAWER, IC_FILTER } from "../../assets/path";
import AppText from "../../components/AppText/AppText";
import { useLanguage } from "../../hooks/useLanguage";
import { fontSize16, fontSize20 } from "../../styles/AppFonts";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerActions, NavigationContainer } from "@react-navigation/native";
import PressView from "../../components/PressView/PressView";
import { NavigationRef } from "../../../App";
import TextRule from "../../components/TextRule/TextRule";
import AppBar from "../../components/AppBar/AppBar";


const RuleScreen: React.FC = () => {
  const {colorPallet, theme} = useTheme()
  const { language } = useLanguage();

  return (
    <SafeAreaView
      style={[AppStyles.container,{backgroundColor: colorPallet.color_background_1}]}>
      <StatusBar
        barStyle={ theme === 'light' ? "dark-content" : "light-content"}
        backgroundColor={AppColors.color_transparent}
      />
      <AppBar
        title={language?.Rule}
        leftIcon={IC_DRAWER}
        leftIconOnClick={()=>{
          NavigationRef.current?.dispatch(DrawerActions.openDrawer)
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

export default RuleScreen;


