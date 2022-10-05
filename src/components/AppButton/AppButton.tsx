import React from "react";
import { Button, PressableProps, StyleProp, TextStyle, ViewStyle } from "react-native";
import AppColors from "../../styles/AppColors";
import { fontSize18 } from "../../styles/AppFonts";
import AppText, { AppFontType } from "../AppText/AppText";
import PressView from "../PressView/PressView";
import { unit16, unit5 } from "../../utils/appUnit";

interface AppButtonProps extends PressableProps {
  buttonTitle: string,
  fontType?: AppFontType,
  titleStyle?: StyleProp<TextStyle>,
  linearStyle?: StyleProp<TextStyle>
  singleClick?:boolean,
  style?: StyleProp<ViewStyle>
}

const AppButton: React.FC<AppButtonProps> = (props) => {
  const { buttonTitle,  fontType, titleStyle,style} = props;

  return (
    <PressView
      {...props}
      style={[{
        backgroundColor: AppColors.color_primary,
        borderColor: AppColors.color_primary,
        borderRadius: unit5,
      }, style]}
    >
        <AppText
          fontType={fontType || "bold"}
          style={[{
            color: AppColors.color_white,
            textAlign: "center",
            fontSize: fontSize18,
            paddingVertical: unit16
          }, titleStyle]}>
          {buttonTitle}
        </AppText>
    </PressView>
  );
};


export default AppButton;
