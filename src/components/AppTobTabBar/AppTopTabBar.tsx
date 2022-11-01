import { StyleSheet, View } from "react-native";
import Animated, { BounceIn } from "react-native-reanimated";
import React from "react";
import { CommonActions } from "@react-navigation/native";
import { MaterialTopTabBarProps } from "@react-navigation/material-top-tabs";
import { useTheme } from "../../hooks/useTheme";
import AppText from "../AppText/AppText";
import { fontSize18 } from "../../styles/AppFonts";
import AppColors from "../../styles/AppColors";
import { unit10, unit2, unit4, unit6 } from "../../utils/appUnit";
import PressView from "../PressView/PressView";


interface AppTopTabBarProps extends MaterialTopTabBarProps {
  tabBarData: TopTabBarItemType[];
}

export type TopTabBarItemType = {
  name: string,
  routeName: string,
  tabBarIcon: (focused: boolean) => JSX.Element,
}

const AppTopTabBar: React.FC<AppTopTabBarProps> = (props) => {
  const {
    navigation,
    state,
    descriptors,
    tabBarData,
  } = props;
  const { colorPallet } = useTheme();

  const { routes } = state;

  return (
    <View
      style={[styles.bottomTabBar, {
        borderTopColor: colorPallet.color_divider_1,
        backgroundColor: colorPallet.color_background_1,
        shadowOpacity: 0.60,
        shadowRadius: 4.65,
        elevation: 8,
      }]}>
      {
        routes.map((route, index) => {
          const focus = index === state.index;
          const { options } = descriptors[route.key];

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!focus && !event.defaultPrevented) {
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
            style={[styles.tabItem, {
              paddingVertical: unit10,
              borderBottomWidth: unit2,
              borderBottomColor: focus ? AppColors.color_primary : colorPallet.color_background_1,
            }]}
          >

            {focus ? (
              <Animated.View
                style={{ flexDirection: "row" }}
                entering={BounceIn}
              >
                {
                  item?.tabBarIcon(true)
                }
              </Animated.View>
            ) : (
              <View style={{ flexDirection: "row" }}>
                {
                  item?.tabBarIcon(false)
                }

              </View>
            )}
            <AppText
              fontType={"bold"}
              style={{
                color: focus ? AppColors.color_primary : colorPallet.color_text_blue_1,
                fontSize: fontSize18,
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
    justifyContent: "center",
  },
  tabItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    flexDirection: "row",
  },
});

export default AppTopTabBar;

