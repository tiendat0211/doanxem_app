import React, { useRef } from "react";
import { Button, Dimensions, Image, Platform, SafeAreaView, StatusBar, Text, View } from "react-native";
import AppStyles from "../../styles/AppStyles";
import useAuth from "../../hooks/useAuth";
import AppColors from "../../styles/AppColors";
import { useTheme } from "../../hooks/useTheme";
import {
  unit10,
  unit12,
  unit15,
  unit16, unit20,
  unit24, unit32, unit400, unit48, unit50, unit56,

} from "../../utils/appUnit";
import { IC_CREATE, IC_DOWNLOAD, IC_DRAWER, IC_FILTER, IC_HOTTAB, IC_NEWTAB, IC_TOPTAB } from "../../assets/path";
import { useLanguage } from "../../hooks/useLanguage";
import { AppFonts, fontSize16, fontSize18, fontSize20 } from "../../styles/AppFonts";
import { DrawerActions, NavigationContainer } from "@react-navigation/native";
import { NavigationRef } from "../../../App";
import AppBar from "../../components/AppBar/AppBar";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import PressView from "../../components/PressView/PressView";
import NewTab from "./tabs/NewTab";
import HotTab from "./tabs/HotTab";
import TopTab from "./tabs/TopTab";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import SelectItem from "../../components/SelectItem/SelectItem";


const renderScene = SceneMap({
  new: NewTab,
  hot: HotTab,
  top: TopTab
});


const HomeScreen: React.FC = () => {
  const { authData, signOut } = useAuth();
  const user = authData.user;
  const {colorPallet, theme } = useTheme()
  const { language } = useLanguage();

  const bottomSheetRef = useRef<BottomSheet>(null);


  function openBottomSheet() {
    bottomSheetRef.current?.snapToIndex(0);
  }

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'new', title: language?.newTab },
    { key: 'top', title: language?.topTab },
    { key: 'hot', title: language?.hotTab },
  ]);

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
            inactiveColor={ theme === 'light' ?  colorPallet.color_text_blue_3 : AppColors.color_text4}
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
                route.key === 'new'
                  ? IC_NEWTAB
                  :  route.key === 'top'
                  ? IC_TOPTAB:
                  IC_HOTTAB
                }
                style={{
                  height: unit24,
                  width: unit24,
                  tintColor : focused
                    ? AppColors.color_primary
                    : theme === 'light' ?  colorPallet.color_text_blue_3 : AppColors.color_text4
              }}
              />
            }}
          />
        }}
      />
      <PressView
        style={{
          position:'absolute',
          bottom: unit32,
          right: unit32,
        }}
        onPress={() => {
          NavigationRef.current?.navigate('CreatePostScreen');
          console.log('click');
        }}
      >
        <Image
          source={IC_CREATE}
          style={{
            width:unit48,
            height: unit48,
            borderRadius: unit56,
          }}
        />
      </PressView>

      {/* BottomSheet */}
      <BottomSheet
        backgroundStyle={{
          backgroundColor: colorPallet.color_background_3,
        }}
        handleIndicatorStyle={{
          backgroundColor: colorPallet.color_background_3
        }}
        ref={bottomSheetRef}
        backdropComponent={(props) =>
          <BottomSheetBackdrop
            {...props}
            enableTouchThrough={false}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
            pressBehavior={"close"}
          />
        }
        index={-1}
        snapPoints={[unit400]}>
        <View
          style={{
            backgroundColor: colorPallet.color_background_1,
            borderRadius: unit10,
            marginHorizontal: unit20,
            marginBottom: unit12
          }}
        >
          <SelectItem
            title={'Lưu ảnh vào bộ nhớ'}
            rightImageSource={IC_DOWNLOAD}

            appTxtStyle={{
              fontFamily: AppFonts.semiBold,
              fontSize: unit16
            }}
          />
        </View>

        <View
          style={{
            backgroundColor: colorPallet.color_background_1,
            borderRadius: unit10,
            marginHorizontal: unit20,
            marginBottom: unit12
          }}
        >
          <SelectItem
            title={'Lưu ảnh vào bộ nhớ'}
            rightImageSource={IC_DOWNLOAD}

            appTxtStyle={{
              fontFamily: AppFonts.semiBold,
              fontSize: unit16
            }}
          />
        </View>

        <View
          style={{
            backgroundColor: colorPallet.color_background_1,
            borderRadius: unit10,
            marginHorizontal: unit20,
            marginBottom: unit12
          }}
        >
          <SelectItem
            title={'Lưu ảnh vào bộ nhớ'}
            rightImageSource={IC_DOWNLOAD}

            appTxtStyle={{
              fontFamily: AppFonts.semiBold,
              fontSize: unit16
            }}
          />
        </View>

        <View
          style={{
            backgroundColor: colorPallet.color_background_1,
            borderRadius: unit10,
            marginHorizontal: unit20,
            marginBottom: unit12
          }}
        >
          <SelectItem
            title={'Lưu ảnh vào bộ nhớ'}
            rightImageSource={IC_DOWNLOAD}
            appTxtStyle={{
              fontFamily: AppFonts.semiBold,
              fontSize: unit16
            }}
          />
        </View>

        <View
          style={{
            backgroundColor: colorPallet.color_background_1,
            borderRadius: unit10,
            marginHorizontal: unit20,
            marginBottom: unit12
          }}
        >
          <SelectItem
            title={'Lưu ảnh vào bộ nhớ'}
            rightImageSource={IC_DOWNLOAD}

            appTxtStyle={{
              fontFamily: AppFonts.semiBold,
              fontSize: unit16
            }}
          />
        </View>

      </BottomSheet>
    </SafeAreaView>
  )
};

export default HomeScreen;


