import React, { useCallback, useMemo, useRef, useState } from "react";
import { Button, Image, Platform, SafeAreaView, StatusBar, Text, View } from "react-native";
import AppStyles from "../../styles/AppStyles";
import useAuth from "../../hooks/useAuth";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AppColors from "../../styles/AppColors";
import { useTheme } from "../../hooks/useTheme";
import { unit12, unit16, unit2, unit20, unit24, unit32, unit4, unit6, unit68, unit72 } from "../../utils/appUnit";
import { IC_DRAWER, IC_FILTER, IC_HOTTAB, IC_LOGO, IC_NEWTAB, IC_TOPTAB, IMG_LOGO } from "../../assets/path";
import AppText from "../../components/AppText/AppText";
import { useLanguage } from "../../hooks/useLanguage";
import { fontSize14, fontSize16, fontSize18, fontSize20 } from "../../styles/AppFonts";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerActions, NavigationContainer } from "@react-navigation/native";
import PressView from "../../components/PressView/PressView";
import { NavigationRef } from "../../../App";
import AppBar from "../../components/AppBar/AppBar";
import SearchBar from "../../components/SearchBar/SearchBar";
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from "@gorhom/bottom-sheet";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import PostedTab from "./ProfileTabs/PostedTab";
import WaitApprovalTab from "./ProfileTabs/WaitApprovalTab";
import SaveTab from "./ProfileTabs/SaveTab";
import CustomHandle from "../../components/CustomHandle/CustomHandle";
import UserProfileItem from "../../components/UserProfileItem/UserProfileItem";


const ProfileScreen: React.FC = () => {
  const { colorPallet , theme} = useTheme()
  const { language } = useLanguage();
  const {authData} = useAuth()
  const user = authData.user

  const bottomSheetRef = useRef<BottomSheet>(null);
  const [deviceStatus, setDeviceStatus] = useState('Vertical'); //Horizontal
  const snapPointsVertical = useMemo(() => ['69%', '85%'], []);
  const renderCustomHandle = useCallback(
    (props) => <CustomHandle
      {...props}
      title="Custom Handle Example"
      style={{
        borderBottomColor: colorPallet.color_background_1,
        backgroundColor: colorPallet.color_background_1,
      }}
    />,
    [],
  );

  const handleSheetChange = useCallback((index: any) => {
    // eslint-disable-next-line no-console
    console.log('handleSheetChange', index);
  }, []);

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'posted', title: language?.postedTab },
    { key: 'wait', title: language?.waitTab },
    { key: 'save', title: language?.saveTab },
  ]);

  const renderScene = SceneMap({
    posted: PostedTab,
    wait: WaitApprovalTab,
    save: SaveTab
  });

  return (
    <SafeAreaView
      style={AppStyles.container}>
      <StatusBar
        barStyle={ theme === 'light' ? "dark-content" : "light-content"}
        backgroundColor={AppColors.color_transparent}
      />
      <AppBar
        title={language?.User_profile}
        leftIcon={IC_DRAWER}
        leftIconOnClick={() => {
          NavigationRef.current?.dispatch(DrawerActions.openDrawer)
        }}
        titleStyle={{
          color: colorPallet.color_text_blue_1
        }}
        containerStyle={{
          borderBottomColor: colorPallet.color_divider_3,
          shadowColor:AppColors.color_primary,
          shadowOffset: {
            width: 0,
            height: unit12,
          },
          shadowOpacity: 0.58,
          shadowRadius: unit16,
          elevation: unit24,
        }}
      />

      <View
        style={{
          backgroundColor: colorPallet.color_background_3,
        }}
      >

        <UserProfileItem
          img_src={{
            uri: user?.avatar
          }}
          name={user?.name}
          email={user?.email}
          style={{
            marginVertical: unit24,
            shadowColor:AppColors.color_primary,
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.30,
            shadowRadius: 4.65,

            elevation: 8,
          }}
        />

      </View>

      <BottomSheet
        ref={bottomSheetRef}
        handleComponent={renderCustomHandle}
        index={0}
        snapPoints={snapPointsVertical}
        animateOnMount={true}
        backgroundStyle={{
          backgroundColor: colorPallet.color_background_1,
        }}
        onChange={handleSheetChange}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          renderTabBar={(props) => {
            return <TabBar
              {...props}
              tabStyle={{ flexDirection: 'row' }}
              activeColor={AppColors.color_primary}
              inactiveColor={colorPallet.color_text_gray_3}
              indicatorStyle={{ backgroundColor: colorPallet.color_background_1 }}
              style={{
                backgroundColor: colorPallet.color_background_1,
              }}
              labelStyle={{
                fontSize: fontSize16,
                fontWeight: '700',
                textTransform: 'none',
                paddingVertical: unit4
              }}
            />
          }}
        />
      </BottomSheet>


    </SafeAreaView>
  )
};

export default ProfileScreen;


