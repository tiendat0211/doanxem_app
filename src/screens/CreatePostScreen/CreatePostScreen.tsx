import React from "react";
import {  SafeAreaView, StatusBar} from "react-native";
import AppStyles from "../../styles/AppStyles";
import AppColors from "../../styles/AppColors";
import { useTheme } from "../../hooks/useTheme";
import { IC_DRAWER, IC_FILTER, IC_HOTTAB, IC_NEWTAB, IC_TOPTAB } from "../../assets/path";
import { useLanguage } from "../../hooks/useLanguage";
import { DrawerActions, NavigationContainer } from "@react-navigation/native";
import { NavigationRef } from "../../../App";
import AppBar from "../../components/AppBar/AppBar";


const CreatePostScreen: React.FC = () => {
  const {colorPallet, theme } = useTheme()
  const { language } = useLanguage();

  return (
    <SafeAreaView
      style={[AppStyles.container,{backgroundColor: colorPallet.color_background_1}]}>
      <StatusBar
        barStyle={ theme === 'light' ? "dark-content" : "light-content"}
        backgroundColor={AppColors.color_transparent}
      />
      <AppBar
        title={language?.Home}
        leftIcon={IC_DRAWER}
        rightIcon={IC_FILTER}
        leftIconOnClick={()=>{
          NavigationRef.current?.dispatch(DrawerActions.openDrawer)
        }}
        rightIconOnClick={()=>{
          NavigationRef.current?.navigate('FilterScreen')
        }}
        titleStyle={{
          color: colorPallet.color_text_blue_1
        }}
        containerStyle={{
          borderBottomColor:colorPallet.color_divider_3
        }}
      />

    </SafeAreaView>
  )
};

export default CreatePostScreen;


