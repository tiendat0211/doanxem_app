import React from "react";
import { Button, Dimensions, Image, Platform, SafeAreaView, StatusBar, Text, View } from "react-native";
import AppStyles from "../../styles/AppStyles";
import useAuth from "../../hooks/useAuth";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AppColors from "../../styles/AppColors";
import { useTheme } from "../../hooks/useTheme";
import { unit1, unit12, unit15, unit16, unit20, unit24, unit32, unit35, unit5, unit8 } from "../../utils/appUnit";
import { IC_ARROWLEFT, IC_DRAWER, IC_FILTER, IC_HOTTAB, IC_NEWTAB, IC_TOPTAB } from "../../assets/path";
import AppText from "../../components/AppText/AppText";
import { useLanguage } from "../../hooks/useLanguage";
import { AppFonts, fontSize16, fontSize18, fontSize20 } from "../../styles/AppFonts";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerActions, NavigationContainer } from "@react-navigation/native";
import PressView from "../../components/PressView/PressView";
import { NavigationRef } from "../../../App";
import AppBar from "../../components/AppBar/AppBar";

import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import NewTab from "../HomeScreen/tabs/NewTab/NewTab";
import TopTab from "../HomeScreen/tabs/TopTab/TopTab";
import HotTab from "../HomeScreen/tabs/HotTab/HotTab";
import HardTab from "./tabs/HardTab/HotTab";
import LikeTab from "./tabs/LikeTab/NewTab";
import InterestedTab from "./tabs/InterestedTab/TopTab";

const RankScreen: React.FC = () => {
  const {colorPallet, theme} = useTheme()
  const { language } = useLanguage();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'hard', title: language?.hardTab },
    { key: 'like', title: language?.likeTab },
    { key: 'interested', title: language?.interestedTab },
  ]);

  const renderScene = SceneMap({
    hard: HardTab,
    like: LikeTab,
    interested: InterestedTab
  });

  return (
    <SafeAreaView
      style={[AppStyles.container,{backgroundColor: colorPallet.color_background_1}]}>
      <StatusBar
        barStyle={ theme === 'light' ? "dark-content" : "light-content"}
        backgroundColor={AppColors.color_transparent}
      />
      <AppBar
        title={language?.rankScreen}
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
            scrollEnabled={true}
            activeColor={AppColors.color_primary}
            inactiveColor={colorPallet.color_text_blue_3}
            indicatorStyle={{ backgroundColor: AppColors.color_primary }}
            style={{
              backgroundColor: colorPallet.color_background_1,
              shadowColor:AppColors.color_primary,
              shadowOffset: {
                width: 0,
                height: unit12,
              },
              shadowOpacity: 0.58,
              shadowRadius: unit16,
              elevation: unit24,
            }}
            labelStyle={{
              fontSize: fontSize18,
              fontFamily:AppFonts.bold,
              textTransform: 'none',
            }}
            renderIcon={ ({route, focused} ) => {
              return <Image
                source={
                  route.key === 'hard'
                    ? IC_NEWTAB
                    :  route.key === 'like'
                      ? IC_TOPTAB:
                      IC_HOTTAB
                }
                style={{
                  height: unit24,
                  width: unit24,
                  tintColor : focused ? AppColors.color_primary : colorPallet.color_text_blue_3
                }}
              />
            }}
          />
        }}
      />
    </SafeAreaView>
    //   style={AppStyles.centerContainer}>
    //   <Text>HOME SCREEN</Text>
    //   <Text>{user?.username || "Not sign in"}</Text>
    //   <Button
    //     onPress={
    //       () => {
    //         signOut();
    //       }
    //     }
    //     title={"Logout"} />
    // </SafeAreaView>;
  )
};

export default RankScreen;


