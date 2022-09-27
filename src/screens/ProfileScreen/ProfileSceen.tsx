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
  const { colorPallet } = useTheme()
  const language = useLanguage();

  const bottomSheetRef = useRef<BottomSheet>(null);
  const [deviceStatus, setDeviceStatus] = useState('Vertical'); //Horizontal
  const snapPointsVertical = useMemo(() => ['68%', '85%'], []);
  const renderCustomHandle = useCallback(
    (props) => <CustomHandle title="Custom Handle Example" {...props} />,
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
        barStyle={"dark-content"}
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
          borderBottomColor: colorPallet.color_divider_3
        }}
      />

      <View
        style={{
          backgroundColor: colorPallet.color_background_4,
        }}
      >

        <UserProfileItem
          img_src={IMG_LOGO}
          name={"_Nghiencoliemsi_"}
          email={"@ngoclongg2010"}
          style={{
            marginVertical: unit24,
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
              indicatorStyle={{ backgroundColor: AppColors.color_white }}
              style={{
                backgroundColor: AppColors.color_white,
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


