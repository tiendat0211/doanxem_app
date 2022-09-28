import React from "react";
import { Animated, Dimensions, Image, Platform, ScrollView, StatusBar, TouchableOpacity, View } from "react-native";
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { useLanguage } from "../../hooks/useLanguage";
import { NavigationRef } from "../../../App";
import { DrawerActions } from "@react-navigation/native";
import PressView from "../PressView/PressView";
import {
  IC_HOTTAB,
  IC_NEWTAB,
  IC_TOPTAB,

} from "../../assets/path";
import {
  unit15,
  unit2,
  unit24,
  unit6,
} from "../../utils/appUnit";
import AppText from "../AppText/AppText";
import { useTheme } from "../../hooks/useTheme";
import { fontSize18} from "../../styles/AppFonts";
import AppColors from "../../styles/AppColors";
import { TabBar } from "react-native-tab-view";

export default function CustomTabBar (props : any){
  const {colorPallet, theme} = useTheme()

  return(
    <>
      <TabBar {...props}>

      </TabBar>
      <View
        style={{
        flexDirection: 'row',
      }}>
        { props.state.routes.map((route: { key: string | number; name: any; }, index: any) => {
          const { options } = props.descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;

          const isFocused = props.state.index === index;

          const onPress = () => {
            const event = props.navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });


            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              props.navigation.navigate({ name: route.name, merge: true });
            }
          };

          return (
            <PressView
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              style={{
                flex: 1 ,
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'center',
                paddingVertical: unit15,
                borderBottomWidth: unit2,
                borderBottomColor: isFocused ? AppColors.color_primary : AppColors.color_white
            }}
            >
              <Image
                source={
                index == 0 ?
                  IC_NEWTAB
                  : index == 1 ?
                    IC_TOPTAB: IC_HOTTAB
              }
                style={{
                  width: unit24,
                  height: unit24,
                  marginRight: unit6,
                  tintColor: isFocused? AppColors.color_primary : colorPallet.color_text_blue_3
              }}
              />
              <AppText
                style={{
                  fontSize:fontSize18,
                  color: isFocused? AppColors.color_primary : colorPallet.color_text_blue_3
              }}
              >
                {label}
              </AppText>
            </PressView>
          );
        })}
      </View>
    </>
  )
}
