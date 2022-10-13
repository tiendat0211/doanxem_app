import React, { useCallback, useMemo, useRef, useState } from "react";
import { Button, Dimensions, Image, Platform, SafeAreaView, StatusBar, Text, View } from "react-native";
import AppStyles from "../../styles/AppStyles";
import useAuth from "../../hooks/useAuth";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AppColors from "../../styles/AppColors";
import { useTheme } from "../../hooks/useTheme";
import {
  unit100,
  unit12,
  unit16,
  unit2,
  unit20, unit200,
  unit24, unit245, unit250, unit300,
  unit32,
  unit4,
  unit48, unit56,
  unit6,
  unit68,
  unit72,
} from "../../utils/appUnit";
import { IC_CREATE, IC_DRAWER, IC_FILTER, IC_HOTTAB, IC_LOGO, IC_NEWTAB, IC_TOPTAB, IMG_LOGO } from "../../assets/path";
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
import ApprovedTab from "./ProfileTabs/ApprovedTab";
import PendingTab from "./ProfileTabs/PendingTab";
import SavedTab from "./ProfileTabs/SavedTab";
import CustomHandle from "../../components/CustomHandle/CustomHandle";
import UserProfileItem from "../../components/UserProfileItem/UserProfileItem";


const ProfileScreen: React.FC = () => {
  const { colorPallet , theme} = useTheme()
  const { language } = useLanguage();
  const {authData} = useAuth()
  const user = authData.user

  const bottomSheetRef = useRef<BottomSheet>(null);
  const [deviceStatus, setDeviceStatus] = useState('Vertical'); //Horizontal
  const snapPointsVertical = useMemo(() => [ Platform.OS === 'android' ? '69%' : Platform.OS === 'ios' ? '66%' : '100%', '87%'], []);
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
    { key: 'approved', title: language?.postedTab },
    { key: 'pending', title: language?.waitTab },
    { key: 'saved', title: language?.saveTab },
  ]);

  const renderScene = SceneMap({
    approved: ApprovedTab,
    pending: PendingTab,
    saved: SavedTab
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
          img_src={user?.avatar}
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

      <PressView
        style={{
          position: 'absolute',
          bottom: unit32,
          right: unit20,
          // backgroundColor:'red',
        }}
        onPress={() => {
          NavigationRef?.current?.navigate('CreatePostScreen')
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
  )
};

export default ProfileScreen;


