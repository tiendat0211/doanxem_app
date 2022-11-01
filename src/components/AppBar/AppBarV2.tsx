import React from "react";
import { Platform, StatusBar, StyleProp, StyleSheet, TextStyle, View, ViewStyle } from "react-native";
import { unit1, unit10, unit16, unit18, unit20, unit24 } from "../../utils/appUnit";
import { useTheme } from "../../hooks/useTheme";
import AppText from "../AppText/AppText";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type AppBarProps = {
  title: string,
  titleStyle?: StyleProp<TextStyle>,
  left?: any,
  containerStyle?: StyleProp<ViewStyle>
  right?: any,
}

const AppBarV2: React.FC<AppBarProps> = (
  {
    containerStyle,
    title,
    titleStyle,
    left,
    right,
  },
) => {
  const { colorPallet } = useTheme();

  const { top } = useSafeAreaInsets();

  return <View style={[
    styles.container,
    {
      backgroundColor: colorPallet.color_background_1,
      borderBottomColor: colorPallet.color_divider_2,
      paddingTop: (Platform.OS === "android" ? StatusBar.currentHeight || 0 : top) + unit10,
      alignContent: "center",
    }, containerStyle,
  ]}>
    {
      left
    }


    <View style={{

      flex: 1,
    }
    } />

    <AppText
      fontType={"bold"}
      style={[styles.title, titleStyle, {
        textAlign: "center",
        position: "absolute",
        top: (Platform.OS === "android" ? StatusBar.currentHeight || 0 : top) + unit10,
        left: 0,
        right: 0,
      }]}
    >{title}
    </AppText>

    {
      right
    }
  </View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingBottom: unit18,
    paddingHorizontal: unit16,
    alignItems: "center",
    borderBottomWidth: unit1,
  },
  title: {
    fontSize: unit20,
    flexGrow: 1,
    fontWeight: "500",
    paddingHorizontal: unit10,
  },
  leftIcon: {
    width: unit24,
    height: unit24,
  },
  rightIcon: {
    width: unit24,
    height: unit24,
  },
});

export default AppBarV2;
