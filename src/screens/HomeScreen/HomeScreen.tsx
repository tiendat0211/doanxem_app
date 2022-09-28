import React, { useState } from "react";
import { Button, Dimensions, Image, Platform, SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import AppStyles from "../../styles/AppStyles";
import useAuth from "../../hooks/useAuth";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import NewTab from "./tabs/NewTab";
import TopTab from "./tabs/TopTab";
import HotTab from "./tabs/HotTab";
import AppColors from "../../styles/AppColors";
import { useTheme } from "../../hooks/useTheme";
import {
  unit10,
  unit12,
  unit15,
  unit16,
  unit20,
  unit24, unit32, unit48, unit50, unit56,

} from "../../utils/appUnit";
import { IC_CREATE, IC_DRAWER, IC_FILTER, IC_HOTTAB, IC_NEWTAB, IC_TOPTAB } from "../../assets/path";
import { useLanguage } from "../../hooks/useLanguage";
import { AppFonts, fontSize16, fontSize18, fontSize20 } from "../../styles/AppFonts";
import { DrawerActions, NavigationContainer } from "@react-navigation/native";
import { NavigationRef } from "../../../App";
import AppBar from "../../components/AppBar/AppBar";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import PressView from "../../components/PressView/PressView";
import CreatePostScreen from "../CreatePostScreen/CreatePostScreen";


const renderScene = SceneMap({
  new: NewTab,
  hot: HotTab,
  top: TopTab
});


const HomeScreen: React.FC = () => {
  const { authData, signOut } = useAuth();
  const user = authData.user;
  const { colorPallet, theme } = useTheme()
  const { language } = useLanguage();

  const [index, setIndex] = React.useState(0);
  const [openCreate, setOpenCreate] = useState(false)
  const [routes] = React.useState([
    { key: 'new', title: language?.newTab },
    { key: 'top', title: language?.topTab },
    { key: 'hot', title: language?.hotTab },
  ]);

  return (
    <>
      <CreatePostScreen
        style={[
          StyleSheet.absoluteFill,
          {
            marginTop: Platform.OS === "ios" ? StatusBar.currentHeight : 0,
            zIndex: 2000,
          },
        ]}
        open={openCreate}
        setOpen={setOpenCreate}
      />
      {
        openCreate ?
          null
          :
          <SafeAreaView
            style={[AppStyles.container, { backgroundColor: colorPallet.color_background_1 }]}>
            <StatusBar
              barStyle={theme === 'light' ? "dark-content" : "light-content"}
              backgroundColor={AppColors.color_transparent}
            />
            <AppBar
              title={language?.Home}
              leftIcon={IC_DRAWER}
              rightIcon={IC_FILTER}
              leftIconOnClick={() => {
                NavigationRef.current?.dispatch(DrawerActions.openDrawer)
              }}
              rightIconOnClick={() => {
                NavigationRef.current?.navigate('FilterScreen')
              }}
              titleStyle={{
                color: colorPallet.color_text_blue_1
              }}
              containerStyle={{
                borderBottomColor: colorPallet.color_divider_3
              }}
            />

            <TabView
              navigationState={{ index, routes }}
              renderScene={renderScene}
              onIndexChange={setIndex}
              renderTabBar={(props) => {
                return <TabBar
                  {...props}
                  tabStyle={{
                    flexDirection: 'row',
                    paddingVertical: unit15,
                  }}
                  activeColor={AppColors.color_primary}
                  inactiveColor={theme === 'light' ? colorPallet.color_text_blue_3 : AppColors.color_text4}
                  indicatorStyle={{ backgroundColor: AppColors.color_primary }}
                  style={{
                    backgroundColor: colorPallet.color_background_1,
                    shadowColor: AppColors.color_primary,
                    // shadowOffset: {
                    //   width: 0,
                    //   height: unit12,
                    // },
                    shadowOpacity: 0.58,
                    shadowRadius: unit16,
                    elevation: unit24,
                  }}
                  labelStyle={{
                    fontSize: fontSize18,
                    fontFamily: AppFonts.bold,
                    textTransform: 'none',
                  }}
                  renderIcon={({ route, focused }) => {
                    return <Image
                      source={
                        route.key === 'new'
                          ? IC_NEWTAB
                          : route.key === 'top'
                            ? IC_TOPTAB :
                            IC_HOTTAB
                      }
                      style={{
                        height: unit24,
                        width: unit24,
                        tintColor: focused
                          ? AppColors.color_primary
                          : theme === 'light' ? colorPallet.color_text_blue_3 : AppColors.color_text4
                      }}
                    />
                  }}
                />
              }}
            />
            <PressView
              style={{
                position: 'absolute',
                bottom: unit32,
                right: unit20,
                // backgroundColor:'red',
              }}
              onPress={() => {
                setOpenCreate(true)
                console.log('click');
              }}
            >
              <Image
                source={IC_CREATE}
                style={{
                  width: unit48,
                  height: unit48,
                  borderRadius: unit56,
                }}
              />
            </PressView>

          </SafeAreaView>
      }


    </>
  )
};

export default HomeScreen;


