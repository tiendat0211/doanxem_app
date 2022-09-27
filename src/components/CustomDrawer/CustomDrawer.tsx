import React from "react";
import { Dimensions, Image, Platform, StatusBar, View } from "react-native";
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { useLanguage } from "../../hooks/useLanguage";
import { NavigationRef } from "../../../App";
import { DrawerActions } from "@react-navigation/native";
import PressView from "../PressView/PressView";
import {
  IC_ARROWLEFT,
  IC_HOME,
  IC_INFO,
  IC_NOTI,
  IC_RANK,
  IC_SEARCH,
  IC_SETTING,
  IC_USER2,
  IMG_LOGO,
} from "../../assets/path";
import { unit10, unit100, unit12, unit20, unit28, unit35, unit40, unit48, unit5, unit6, unit72 } from "../../utils/appUnit";
import AppText from "../AppText/AppText";
import { useTheme } from "../../hooks/useTheme";
import { dimension, fontSize14, fontSize16, fontSize18, fontSize20 } from "../../styles/AppFonts";
import AppColors from "../../styles/AppColors";

export default function CustomDrawer(props: any) {
  const { colorPallet } = useTheme()

  return (
    <>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          backgroundColor: '#0B2347',
        }}>
        <View
          style={{
            width:dimension.width *0.93,
            backgroundColor: colorPallet.color_background_4,
            borderBottomRightRadius: unit35,
            borderTopRightRadius: unit35,
            marginTop: (Platform.OS === "android" ? StatusBar.currentHeight || 0 : 0),
            paddingRight: unit20,
            paddingLeft: unit20
          }}
        >
          <DrawerContentScrollView {...props}
          >
            <View
              style={{
                flexDirection: 'row',
                paddingBottom: unit28,
              }}
            >
              <PressView
                onPress={() => {
                  NavigationRef.current?.dispatch(DrawerActions.closeDrawer);
                }}
              >
                <Image
                  source={IC_ARROWLEFT}
                  style={{
                    width: unit28,
                    height: unit28,
                    borderRadius: unit20,
                  }}
                />
              </PressView>

              <View
                style={{ flexGrow: 1 }}
              >

              </View>

              <PressView
                onPress={() => {
                  NavigationRef.current?.navigate('SettingScreen');
                }}
              >
                <Image
                  source={IC_SETTING}
                  style={{
                    width: unit28,
                    height: unit28,
                  }}
                />
              </PressView>
            </View>

            <View
              style={{
                flexDirection: 'row',
                paddingBottom: unit48,
              }}
            >
              <Image
                source={IMG_LOGO}
                style={{
                  width: unit72,
                  height: unit72,
                  marginRight: unit20,
                }}
              />
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <AppText
                  style={{
                    color: colorPallet.color_text_blue_1,
                    fontSize: fontSize18,
                    paddingBottom: unit6,
                  }}
                >
                  _Nghiencoliemsi_
                </AppText>
                <AppText
                  style={{
                    color: colorPallet.color_text_gray_3,
                    fontSize: fontSize14,
                    paddingBottom: unit6,
                  }}
                >
                  @ngoclongg2010
                </AppText>
              </View>

            </View>

            <DrawerItemList
              {...props}
            />

          </DrawerContentScrollView>
          <AppText
            style={{
              fontSize: fontSize16,
              color: colorPallet.color_text_gray_3,
              marginBottom: unit20
            }}
          >
            Phiên bản 1,24 Beta
          </AppText>
        </View>

      </View>

    </>
  )
}
