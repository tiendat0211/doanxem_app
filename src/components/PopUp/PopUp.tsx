import { Dimensions, StyleProp, View, ViewStyle } from "react-native";
import React from "react";
import { useTheme } from "../../hooks/useTheme";

import { unit1, unit12, unit16, unit20, unit4, unit8 } from "../../utils/appUnit";
import AppText from "../AppText/AppText";
import AppColors from "../../styles/AppColors";
import AppStyles from "../../styles/AppStyles";
import { fontSize12, fontSize14 } from "../../styles/AppFonts";
import PressView from "../PressView/PressView";


interface UserPostItem {
  leftButtonPress?: () => void,
  rightButtonPress: () => void,
  style?: StyleProp<ViewStyle>,
  mess?: string,
  leftButtonTitle?: string,
  rightButtonTitle: string,
}

const PopUp: React.FC<UserPostItem> = (props) => {
  let { leftButtonPress,rightButtonPress, style,mess , rightButtonTitle, leftButtonTitle} = props;
  const { colorPallet, theme } = useTheme();
  return (
    <View
      style={[AppStyles.centerContainer, {
        position: "absolute",
        backgroundColor: AppColors.color_transparent_dark,
        width: Dimensions.get("screen").width,
        height: Dimensions.get("screen").height,
      }, style]}>
      <View
        style={[{
          backgroundColor: colorPallet.color_background_1,
          alignItems: "center",
          justifyContent: "center",
          width: Dimensions.get("screen").width-40,
          paddingVertical: unit16
        }]}
      >
        <AppText
          fontType={"bold"}
          style={{
            color: AppColors.color_primary,
            fontSize: unit20,
            paddingBottom: unit12,
          }}
        >
          Thông báo
        </AppText>
        <AppText
          fontType={'regular'}
          style={{
            fontSize: fontSize14,
            color: colorPallet.color_text_blue_3
          }}
        >
          {mess}
        </AppText>

        <View
          style={{
            flexDirection: 'row',
            paddingTop: unit20
          }}
        >
          {
            leftButtonTitle? <PressView
              style={{
                borderColor: colorPallet.color_background_2,
                borderWidth: unit1,
                paddingVertical: unit8,
                paddingHorizontal: unit20,
                borderRadius: unit4
              }}
              onPress={leftButtonPress}
            >
              <AppText
                fontType={'semiBold'}
                style={{
                  color: colorPallet.color_text_blue_2,
                  fontSize: fontSize12
                }}
              >
                {leftButtonTitle}
              </AppText>
            </PressView>
              : null
          }

          <PressView
            style={{
              backgroundColor: AppColors.color_primary,
              paddingVertical: unit8,
              paddingHorizontal: unit20,
              borderRadius: unit4,
              marginLeft: leftButtonTitle? unit8: 0
            }}
            onPress={rightButtonPress}
          >
            <AppText
              fontType={'semiBold'}
              style={{
                color: AppColors.color_white,
                fontSize: fontSize12
              }}
            >
              {rightButtonTitle}
            </AppText>
          </PressView>
        </View>

      </View>
    </View>
  );

};
export default PopUp;
