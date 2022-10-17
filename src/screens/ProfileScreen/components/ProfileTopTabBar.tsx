import {I18nManager, Image, Pressable, StyleSheet, View} from "react-native";
import Animated, { BounceIn } from "react-native-reanimated";
import React from "react";
import { CommonActions } from "@react-navigation/native";
import {MaterialTopTabBarProps} from "@react-navigation/material-top-tabs";
import {useLanguage} from "../../../hooks/useLanguage";
import {useTheme} from "../../../hooks/useTheme";
import useAuth from "../../../hooks/useAuth";
import AppText from "../../../components/AppText/AppText";
import {fontSize12, fontSize16, fontSize18, fontSize8} from "../../../styles/AppFonts";
import AppColors from "../../../styles/AppColors";
import {
  unit10,
  unit2,
  unit24,
  unit4,
  unit6,
} from "../../../utils/appUnit";
import PressView from "../../../components/PressView/PressView";

interface ProfileTopTabBarProps extends MaterialTopTabBarProps {
}

type ProfileTopTabBarItemType = {
  name: string,
  routeName: string,
}

const ProfileTopTabBar: React.FC<ProfileTopTabBarProps> = (props) => {
  const {
    navigation,
    state,
    descriptors,
  } = props;
  const { colorPallet } = useTheme();

  function getTabBarData(): ProfileTopTabBarItemType[] {
    return [
      {
        name: "Đã đăng",
        routeName: "ApprovedTab",
      },
      {
        name: "Đợi duyệt",
        routeName: "PendingTab",
      },
      {
        name: "Đã lưu",
        routeName: "SavedTab",
      },
    ];
  }


  const tabBarData = getTabBarData();
  const { routes } = state;

  return (
      <View
        style={[styles.bottomTabBar, {
          borderTopColor: colorPallet.color_divider_1,
          backgroundColor: colorPallet.color_background_1,
        }]}>
        {
          routes.map((route, index) => {
            const focused = index === state.index;
            const { options } = descriptors[route.key];

            const onPress = () => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });

              if (!focused && !event.defaultPrevented) {
                navigation.dispatch({
                  ...CommonActions.navigate({ name: route.name, merge: true }),
                  target: state.key,
                });
              }
            };

            const item = tabBarData[index];

            return <PressView
              key={item.name}
              onPress={onPress}
              style={[styles.tabItem,{
              }]}
            >
              <AppText
                fontType={'bold'}
                style={{
                  color: focused ? AppColors.color_primary : colorPallet.color_text_gray_3,
                  fontSize: fontSize16,
                  marginBottom: unit4,
                  marginTop: unit10,
                  marginLeft: unit6,
                }}>
                {item.name}
              </AppText>
            </PressView>;
          })
        }
      </View>
  );
};

const styles = StyleSheet.create({
  bottomTabBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  tabItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    flexDirection: "row"
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator: {
    backgroundColor: 'rgb(0, 132, 255)',
    width: 48,
    height: 48,
    borderRadius: 24,
    margin: 6,
  },
});

export default ProfileTopTabBar;

