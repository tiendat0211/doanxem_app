import React from "react";
import { Button, PressableProps, StyleProp, TextStyle } from "react-native";
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
  singleClick?:boolean;
}

const AppButton: React.FC<AppButtonProps> = (props) => {
  const { buttonTitle,  fontType, titleStyle} = props;

  return (
    <PressView
      {...props}
      style={{
        backgroundColor: AppColors.color_primary,
        borderColor: AppColors.color_primary,
        borderRadius: unit5,
      }}
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
