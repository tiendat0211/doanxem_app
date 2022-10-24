import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Button,
  Dimensions,
  FlatList,
  Image,
  Platform,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  Text,
  View,
} from "react-native";
import AppStyles from "../../styles/AppStyles";
import useAuth from "../../hooks/useAuth";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AppColors from "../../styles/AppColors";
import { useTheme } from "../../hooks/useTheme";
import {
  unit12,
  unit16,
  unit20,
  unit24,
  unit32,
  unit48, unit56,
} from "../../utils/appUnit";
import { IC_ARROWLEFT, IC_CREATE, IC_DRAWER } from "../../assets/path";
import { useLanguage } from "../../hooks/useLanguage";
import { DrawerActions, NavigationContainer, RouteProp, useRoute } from "@react-navigation/native";
import PressView from "../../components/PressView/PressView";
import { NavigationRef, RootStackParamList } from "../../../App";
import AppBar from "../../components/AppBar/AppBar";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import CustomHandle from "../../components/CustomHandle/CustomHandle";
import UserProfileItem from "../../components/UserProfileItem/UserProfileItem";
import UserPostItem from "../../components/UserPostItem/UserPostItem";
import useScreenState from "../../hooks/useScreenState";
import {getUserProfile } from "../../network/AppAPI";
import ApiHelper from "../../utils/ApiHelper";
import UserModel from "../../model/ApiModel/UserModel";
import AppTracking from "../../tracking/AppTracking";

type AnotherUserScreenProps = RouteProp<RootStackParamList, "AnotherUserScreen">;

const AnotherUserScreen: React.FC = () => {
  const { user_uuid } = useRoute<AnotherUserScreenProps>().params;
  const { colorPallet , theme} = useTheme()
  const { language } = useLanguage();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [deviceStatus, setDeviceStatus] = useState('Vertical'); //Horizontal
  const snapPointsVertical = useMemo(() => [ Platform.OS === 'android' ? '69%' : '60%', '87%'], []);
  const { isLoading, setLoading, mounted, error, setError } = useScreenState();
  const [user,setUser] = useState<UserModel>();

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

  async function loadProfileUser() {
    try {
      const res = await getUserProfile(user_uuid);
      if (ApiHelper.isResSuccess(res)) {
        const user = res?.data?.data;
        setUser(user)
      }
      setError(undefined);
    } catch (e) {
      setError(e);
    } finally {

    }
  }

  useEffect(()=>{
    const screenStartTime = new Date();
    loadProfileUser().finally(()=>{});

    AppTracking.logCustomEvent("view_profile_user", {
      user_id: String(user_uuid),
    });

    return () => {
      const screenEndTime = new Date();
      const totalOnScreenTime = screenEndTime.getTime() - screenStartTime.getTime();

      AppTracking.logCustomEvent("view_profile_user_time", {
        user_id: String(user_uuid),
        duration_millisecond: totalOnScreenTime,
      });
    };
  },[])

  return (
    <SafeAreaView
      style={AppStyles.container}>
      <StatusBar
        barStyle={ theme === 'light' ? "dark-content" : "light-content"}
        backgroundColor={AppColors.color_transparent}
      />
      <AppBar
        title={user?.email||''}
        leftIcon={IC_ARROWLEFT}
        leftIconOnClick={() => {
          NavigationRef.current?.goBack();
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
        <View
          style={{
            backgroundColor: colorPallet.color_background_1,
            flex: 1,
            paddingTop: unit20,
            paddingHorizontal: unit20
          }}
        >
          <BottomSheetFlatList
            refreshControl={
              <RefreshControl
                refreshing={isLoading}
                onRefresh={loadProfileUser} />
            }
            data={user?.posts}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) =>{
              return <UserPostItem
                key={item.id}
                post={item}
                onPress={()=>{
                  NavigationRef?.current?.navigate("DetailPostScreen",{
                    postID: item?.post_uuid
                  })
                }}
              />
            }}
            numColumns={3}
          />

        </View>
      </BottomSheet>

    </SafeAreaView>
  )
};

export default AnotherUserScreen;


