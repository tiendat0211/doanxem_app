import React from "react";
import { Image, StatusBar, View } from "react-native";
import AppStyles from "../../styles/AppStyles";
import AppColors from "../../styles/AppColors";
import { useTheme } from "../../hooks/useTheme";
import { unit20, unit24, unit32, unit48, unit56 } from "../../utils/appUnit";
import { IC_CREATE, IC_DRAWER, IC_HOTTAB, IC_NEWTAB, IC_TOPTAB } from "../../assets/path";
import { useLanguage } from "../../hooks/useLanguage";
import { DrawerActions } from "@react-navigation/native";
import { NavigationRef } from "../../../App";
import AppBar from "../../components/AppBar/AppBar";
import PressView from "../../components/PressView/PressView";
import NewTab from "./tabs/NewTab";
import HotTab from "./tabs/HotTab";
import TopTab from "./tabs/TopTab";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import AppTopTabBar, { TopTabBarItemType } from "../../components/AppTobTabBar/AppTopTabBar";

export type HomeScreenParamList = {
  HotTab: undefined;
  NewTab: undefined;
  TopTab: undefined;
};

const Tab = createMaterialTopTabNavigator<HomeScreenParamList>();

const HomeScreen: React.FC = () => {
  const { colorPallet, theme } = useTheme();
  const { language } = useLanguage();

  function getTabBarData(): TopTabBarItemType[] {
    return [
      {
        name: language?.newTab,
        routeName: "NewTab",
        tabBarIcon: (focused) => {
          return <Image
            source={IC_NEWTAB}
            style={{
              width: unit24,
              height: unit24,
              tintColor: focused ? AppColors.color_primary : colorPallet.color_text_blue_3,
            }}
          />;
        },
      },
      {
        name: language?.topTab,
        routeName: "TopTab",
        tabBarIcon: (focused) => {
          return <Image
            source={IC_TOPTAB}
            style={{
              width: unit24,
              height: unit24,
              tintColor: focused ? AppColors.color_primary : colorPallet.color_text_blue_3,
            }}
          />;
        },
      },
      {
        name: language?.hotTab,
        routeName: "hotTab",
        tabBarIcon: (focused) => {
          return <Image
            source={IC_HOTTAB}
            style={{
              width: unit24,
              height: unit24,
              tintColor: focused ? AppColors.color_primary : colorPallet.color_text_blue_3,
            }}
          />;
        },
      },
    ];
  }

  const tabData = getTabBarData();

  return (
    <>
      <View
        style={[AppStyles.container, { backgroundColor: colorPallet.color_background_1 }]}>
        <StatusBar
          barStyle={theme === "light" ? "dark-content" : "light-content"}
          backgroundColor={AppColors.color_transparent}
        />
        <AppBar
          title={language?.Home}
          leftIcon={IC_DRAWER}
          leftIconOnClick={() => {
            NavigationRef.current?.dispatch(DrawerActions.openDrawer);
          }}
          titleStyle={{
            color: colorPallet.color_text_blue_1,
          }}
          containerStyle={{
            borderBottomColor: colorPallet.color_divider_3,
          }}
        />

        <Tab.Navigator
          tabBar={(props) => <AppTopTabBar tabBarData={tabData} {...props} />}
          screenOptions={{
            swipeEnabled: false,
          }}
        >
          <Tab.Screen
            name="NewTab"
            component={NewTab}
          />
          <Tab.Screen
            name="TopTab"
            component={TopTab}
          />
          <Tab.Screen
            name="HotTab"
            component={HotTab}
          />
        </Tab.Navigator>


        <PressView
          style={{
            position: "absolute",
            bottom: unit32,
            right: unit20,
            // backgroundColor:'red',
          }}
          onPress={() => {
            NavigationRef?.current?.navigate("CreatePostScreen");
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
      </View>
    </>
  );
};

export default HomeScreen;


