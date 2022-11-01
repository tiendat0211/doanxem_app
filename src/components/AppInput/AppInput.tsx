import React, { useState } from "react";
import {
  Image,
  Keyboard, Platform,
  TextInput,
  View,
} from "react-native";
import AppColors from "../../styles/AppColors";
import { AppFonts, dimension, fontSize16, fontSize18 } from "../../styles/AppFonts";
import AppText, { AppFontType } from "../AppText/AppText";
import PressView from "../PressView/PressView";
import {
  unit1,
  unit10,
  unit12, unit13,
  unit14,
  unit16,
  unit20, unit200,
  unit24, unit30, unit4,
  unit5, unit6, unit8,
} from "../../utils/appUnit";
import { useTheme } from "../../hooks/useTheme";
import { useLanguage } from "../../hooks/useLanguage";
import { IC_MEDIA, IC_SEND } from "../../assets/path";
import {refInput} from "../../screens/DetailPostScreen/DetailPostScreen";

interface AppInput {
  onPressSend: () => void,
  onPressMedia?: () => void,
  onChangeText: (value: string) => void,
  value: string,
  disable: boolean,
  userName?: string,
  onPressCancel?: () => void,
  onFocus:()=>void,
}

const AppInput: React.FC<AppInput> = (props) => {
  const { onPressSend,onPressMedia,  onChangeText, value,disable,userName,onPressCancel, onFocus} = props;
  const {colorPallet, theme } = useTheme();
  const { language } = useLanguage();
  const [isBlur,setBlur] = useState(true);


  return (
    <View
      style={{
        backgroundColor: colorPallet.color_background_1,
        borderColor: AppColors.color_primary,
        borderRadius: unit5,
        paddingVertical: unit12,
        paddingHorizontal: unit20,
        borderTopColor:colorPallet.color_divider_3,
        borderTopWidth: unit1
      }}
    >
      {userName? <View
        style={{
          marginBottom: unit8,
          flexDirection:'row'
        }}
      >
        <AppText
          style={{
            fontSize: unit13,
            color: colorPallet.color_text_gray_3,
          }}
        >
          Đang trả lời {' '}
          <AppText
            style={{
              fontSize: unit14,
              color: colorPallet.color_text_gray_1,
            }}
          >
            {userName}
          </AppText>
        </AppText>
        <PressView
          onPress={onPressCancel}
          style={{
            marginLeft: unit30
          }}
        >
          <AppText
            style={{
              fontSize: unit14,
              color: colorPallet.color_text_gray_3,
            }}
          >
            Hủy
          </AppText>
        </PressView>
      </View> : null

      }
      <View
        style={{
          backgroundColor: colorPallet.color_background_3,
          borderRadius: unit10,
          paddingHorizontal: unit16,
          flexDirection:'row',
          alignItems:'center',
          borderWidth: unit1,
          borderColor: isBlur? colorPallet.color_divider_2 : AppColors.color_primary
        }}
      >
        <TextInput
          ref={refInput}
          style={{
            fontSize: fontSize16,
            fontFamily: AppFonts.regular,
            color: colorPallet.color_text_gray_1,
            flexGrow:1,
            width: dimension.width - unit200,
            paddingVertical: unit5,
          }}
          numberOfLines={2}
          placeholder={language?.placeholder_input}
          placeholderTextColor={colorPallet.color_text_gray_3}
          multiline={true}
          onChangeText={onChangeText}
          onSubmitEditing={Keyboard.dismiss}
          maxLength={200}
          value={value}
          onBlur={() => {
            setBlur(true);
          }}
          onFocus={() => {
            setBlur(false);
            onFocus();
          }}
        />

        <PressView
          onPress={onPressSend}
          disabled={disable}
        >
          <Image
            source={IC_SEND}
            style={{
              width: unit24,
              height: unit24,
              tintColor: disable? colorPallet.color_text_gray_3 : AppColors.color_primary
            }}
          />
        </PressView>

      </View>
    </View>
  );
};


export default AppInput;
