import React from "react";
import { Button, Dimensions, Image, Platform, SafeAreaView, StatusBar, Text, View } from "react-native";
import AppStyles from "../../styles/AppStyles";
import useAuth from "../../hooks/useAuth";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import NewTab from "./tabs/NewTab/NewTab";
import TopTab from "./tabs/TopTab/TopTab";
import HotTab from "./tabs/HotTab/HotTab";
import AppColors from "../../styles/AppColors";
import { useTheme } from "../../hooks/useTheme";
import { unit1, unit12, unit15, unit20, unit24, unit32, unit35, unit5, unit8 } from "../../utils/appUnit";
import { IC_ARROWLEFT, IC_DRAWER, IC_FILTER, IC_HOTTAB, IC_NEWTAB, IC_TOPTAB } from "../../assets/path";
import AppText from "../../components/AppText/AppText";
import { useLanguage } from "../../hooks/useLanguage";
import { fontSize16, fontSize18, fontSize20 } from "../../styles/AppFonts";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerActions, NavigationContainer } from "@react-navigation/native";
import PressView from "../../components/PressView/PressView";
import { NavigationRef } from "../../../App";
import AppBar from "../../components/AppBar/AppBar";
import CustomTabBar from "../../components/CustomTabBar/CustomTabBar";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";

const Tab = createMaterialTopTabNavigator();
const Drawer = createDrawerNavigator();


const HomeScreen: React.FC = () => {
  const { authData, signOut } = useAuth();
  const user = authData.user;
  const {colorPallet} = useTheme()
  const language = useLanguage();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'new', title: language?.newTab },
    { key: 'top', title: language?.topTab },
    { key: 'hot', title: language?.hotTab },
  ]);

  const renderScene = SceneMap({
    new: NewTab,
    hot: HotTab,
    top: TopTab
  });



  return (
    <SafeAreaView
      style={[AppStyles.container,{backgroundColor: colorPallet.color_background_1}]}>
      <StatusBar
        barStyle={"dark-content"}
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
            inactiveColor={colorPallet.color_text_blue_3}
            indicatorStyle={{ backgroundColor: AppColors.color_primary }}
            style={{
              backgroundColor: AppColors.color_white,
          }}
            labelStyle={{
              fontSize: fontSize18,
              fontWeight: '700',
              textTransform: 'none',
            }}
            renderIcon={ ({route, focused} ) => {
              return <Image
                source={
                route.key === 'new'
                  ? IC_NEWTAB
                  :  route.key === 'top'
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

      <Button
          onPress={
            () => {
              signOut();
            }
          }
          title={"Logout"} />

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

export default HomeScreen;


