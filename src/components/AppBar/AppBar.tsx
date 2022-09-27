import React from "react";
import {
  Image,
  ImageStyle,
  Platform,
  StatusBar,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
// import { IC_LEFT } from "../../assets/path";
import { NavigationRef } from "../../../App";
import PressView from "../PressView/PressView";
import AppColors from "../../styles/AppColors";
import { unit1, unit10, unit16, unit18, unit20, unit24, unit6 } from "../../utils/appUnit";
import { useTheme } from "../../hooks/useTheme";

type AppBarProps = {
  title: string,
  titleType?: "center" | "left",
  titleStyle?: StyleProp<TextStyle>,
  leftIcon?: any,
  leftIconStyle?: StyleProp<ImageStyle>
  leftIconOnClick?: () => void,
  containerStyle?: StyleProp<ViewStyle>
  rightIcon?: any,
  rightIconStyle?: StyleProp<ImageStyle>
  rightIconOnClick?: () => void,
}

const AppBar: React.FC<AppBarProps> = (
  {
    containerStyle,
    title,
    titleStyle,
    titleType,
    leftIcon,
    leftIconStyle,
    leftIconOnClick,
    rightIcon,
    rightIconStyle,
    rightIconOnClick,
  },
) => {
  const navigation = NavigationRef.current;

  if (!leftIconOnClick) {
    leftIconOnClick = () => {
      navigation?.goBack();
    };
  }
  const isCenter = titleType === "center";

  return <View style={[styles.container, containerStyle]}>
    <PressView
      onPress={leftIconOnClick}
     >
      <Image
        source={leftIcon}
        style={[leftIconStyle,styles.leftIcon]}
      />
    </PressView>
    <Text
      style={[styles.title, titleStyle, {
        textAlign: isCenter ? "center" : "left",
      }]}
    >{title}</Text>

    <PressView
      onPress={rightIconOnClick}>
      <Image
        source={rightIcon}
        style={[rightIconStyle ,styles.rightIcon]}
      />
    </PressView>
  </View>;
};


AppBar.defaultProps = {
  //leftIcon: IC_LEFT,
  titleType: "center",
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingTop: (Platform.OS === "android" ? StatusBar.currentHeight || 0 : unit24) + unit18,
    paddingBottom: unit18,
    paddingHorizontal: unit16,
    alignItems: "center",
    backgroundColor: "white",
    borderBottomColor: '#F2F1F1',
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

export default AppBar;
