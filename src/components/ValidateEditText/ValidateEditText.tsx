import React, { useState } from "react";
import { ColorValue, Image, Platform, StyleProp, Text, TextInput, TextInputProps, View, ViewStyle } from "react-native";
import {  dimension, fontSize14 } from "../../styles/AppFonts";
import { unit10, unit100, unit12, unit14, unit155, unit16, unit18, unit20, unit24, unit5 } from "../../utils/appUnit";
import PressView from "../PressView/PressView";
import IThemeColors from "../../styles/theme/IThemeColors";
import AppColors from "../../styles/AppColors";

interface ValidateEditTextProps extends Partial<TextInputProps> {
  checkValidFunctions: ((input: string) => [boolean, string?])[];
  textValue: string;
  setValue: (value: string) => void;
  isValid?: boolean;
  setValid?: (isValid: boolean) => void;
  defaultHelperText?: string;
  leftIcon?: any;
  rightIcon?: any;
  contentStyle?: ViewStyle;
  onPress?: () => void;
  inputStyle?: StyleProp<ViewStyle>;
  colorPallet: IThemeColors;
  tintColorIcon?: ColorValue;
}

const ValidateEditText: React.FC<ValidateEditTextProps> = props => {
  let {
    contentStyle,
    onPress,
    defaultHelperText,
    checkValidFunctions,
    textValue,
    setValue,
    setValid,
    isValid,
    rightIcon,
    leftIcon,
    inputStyle,
    colorPallet,
    tintColorIcon,
  } = props;
  const [isBlur, setBlur] = useState(true);
  const checkIsValid = (): boolean => {
    return !checkValidFunctions
      .map(fn => {
        return fn(textValue)[0];
      })
      .includes(false);
  };

  let handleErrorText = (): string => {
    for (const validFunction of checkValidFunctions) {
      let res = validFunction(textValue);
      if (!res[0]) {
        return res[1] ? res[1] : defaultHelperText ? defaultHelperText : "";
      }
    }
    return "";
  };

  if (setValid) {
    setValid(checkIsValid());
  }

  // useEffect(() => {
  //   if (setValid) {
  //     setValid(checkIsValid());
  //   }
  // }, [textValue]);

  return (
    <View style={contentStyle}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderColor: isBlur ? colorPallet.color_divider_2 : AppColors.color_primary,
          borderRadius: unit5,
          borderWidth: 1,
        }}>
        {leftIcon && (
          <Image
            source={leftIcon}
            style={{
              width: unit24,
              height: unit24,
              marginStart: unit16,
              marginEnd: unit10,
              tintColor: isBlur ? colorPallet.color_text_gray_3 : AppColors.color_primary,
            }}
          />
        )}
        <TextInput
          style={[
            {
              paddingVertical: Platform.OS === "ios" ? unit12 : unit12,
              width: dimension.width - unit155,
              fontSize: fontSize14,
              color: colorPallet.color_text_blue_3,
              // fontFamily: AppFonts.semiBold,
            },
            inputStyle,
          ]}
          value={textValue}
          onChangeText={setValue}
          onBlur={() => {
            setBlur(true);
            if (checkIsValid()) {
              setBlur(true);
            } else {
              setBlur(false);
            }
          }}
          onFocus={() => {
            setBlur(false);
          }}
          {...props}
          placeholderTextColor={colorPallet.color_text_gray_3}
        />
        {rightIcon && (
          <PressView onPress={onPress}>
            <Image
              source={rightIcon}
              style={{
                width: unit24,
                height: unit24,
                marginStart: unit20,
                tintColor: tintColorIcon ? tintColorIcon : AppColors.color_primary,
                marginEnd: unit16,
              }}
            />
          </PressView>
        )}
      </View>
      {
        (isBlur && textValue.length > 0 && handleErrorText().length > 0)
          ? (
            <Text
              style={{
                color: "red",
                marginHorizontal: unit20,
                marginTop: unit10,
                fontSize: fontSize14,
              }}>
              {"* " + handleErrorText()}
            </Text>
          )
          : null
      }
    </View>
  );
};

export default ValidateEditText;
