import React, { useCallback, useMemo, useRef, useState } from "react";
import { Button, Dimensions, Image, Platform, SafeAreaView, StatusBar, Text, View } from "react-native";
import AppStyles from "../../styles/AppStyles";
import useAuth from "../../hooks/useAuth";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AppColors from "../../styles/AppColors";
import { useTheme } from "../../hooks/useTheme";
import {
  unit100,
  unit112,
  unit12, unit150,
  unit16, unit17, unit170,
  unit20,
  unit24, unit242, unit30,
  unit32, unit40,
  unit48, unit50, unit56, unit70,
} from "../../utils/appUnit";
import {IC_ARROWLEFT, IC_CREATE, IC_DRAWER,} from "../../assets/path";
import { useLanguage } from "../../hooks/useLanguage";
import { DrawerActions, NavigationContainer, RouteProp, useRoute } from "@react-navigation/native";
import PressView from "../../components/PressView/PressView";
import { NavigationRef, RootStackParamList } from "../../../App";
import AppBar from "../../components/AppBar/AppBar";
import BottomSheet from "@gorhom/bottom-sheet";
import ApprovedTab from "./ProfileTabs/ApprovedTab";
import PendingTab from "./ProfileTabs/PendingTab";
import SavedTab from "./ProfileTabs/SavedTab";
import CustomHandle from "../../components/CustomHandle/CustomHandle";
import UserProfileItem from "../../components/UserProfileItem/UserProfileItem";
import ProfileTopTabBar from "./components/ProfileTopTabBar";
import { dimension } from "../../styles/AppFonts";

export type ProfileParamList = {
  ApprovedTab: undefined;
  PendingTab: undefined;
  SavedTab: undefined;
};

const Tab = createMaterialTopTabNavigator<ProfileParamList>();
type ProfileScreenProps = RouteProp<RootStackParamList, "ProfileScreen">;


const ProfileScreen: React.FC = () => {
  const { colorPallet , theme} = useTheme()
  const route = useRoute<ProfileScreenProps>()
  const { language } = useLanguage();
  const {authData} = useAuth()
  const user = authData.user

  const bottomSheetRef = useRef<BottomSheet>(null);
  const [deviceStatus, setDeviceStatus] = useState('Vertical'); //Horizontal
  const snapPointsVertical = useMemo(() => [Platform.OS === "ios" ? dimension?.height - unit242 : dimension?.height - unit170, Platform.OS === "ios" ? dimension?.height - unit112 : dimension?.height - unit30 ], []);
  const renderCustomHandle = useCallback(
    (props) => <CustomHandle
      {...props}
      title="Custom Handle Example"
    />,
    [],
  );

  const handleSheetChange = useCallback((index: any) => {
  }, []);



  return (
    <View
      style={AppStyles.container}>
      <StatusBar
        barStyle={ theme === 'light' ? "dark-content" : "light-content"}
        backgroundColor={AppColors.color_transparent}
      />
      <AppBar
        title={language?.User_profile}
        leftIcon={route?.params?.goback ? IC_ARROWLEFT  : IC_DRAWER}
        leftIconOnClick={() => {
          if(route?.params?.goback){
            NavigationRef.current?.goBack()
          } else{
            NavigationRef.current?.dispatch(DrawerActions.openDrawer)
          }
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
        <Tab.Navigator
          tabBar={(props) => <ProfileTopTabBar {...props} />}
          screenOptions={{
            swipeEnabled: true
          }}
        >
          <Tab.Screen
            name="ApprovedTab"
            component={ApprovedTab}
          />
          <Tab.Screen
            name="PendingTab"
            component={PendingTab}
          />
          <Tab.Screen
            name="SavedTab"
            component={SavedTab}
          />
        </Tab.Navigator>
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


    </View>
  )
};

export default ProfileScreen;


