import React from "react";
import {Image, ImageSourcePropType, ImageStyle, PressableProps, StyleProp, TextStyle} from "react-native";
import PressView from "../PressView/PressView";
import AppStyles from "../../styles/AppStyles";
import { unit16, unit18 } from "../../utils/appUnit";
import AppText from "../AppText/AppText";
import { useTheme } from "../../hooks/useTheme";
import { fontSize16 } from "../../styles/AppFonts";
import AppColors from "../../styles/AppColors";

interface SelectItemProps extends PressableProps {
  title: string,
  leftImageSource?: ImageSourcePropType,
  leftImageProps?: StyleProp<ImageStyle>,
  rightImageSource?: ImageSourcePropType,
  rightImageProps?: StyleProp<ImageStyle>,
  appTxtStyle?:StyleProp<TextStyle>
}

const SelectItem: React.FC<SelectItemProps> = (
  props,
) => {
  const {
    title,
    leftImageSource,
    leftImageProps,
    rightImageSource,
    rightImageProps,
    appTxtStyle,
  } = props;
  const s = props.style
  const { colorPallet, theme } = useTheme()
  return <PressView
    {...props}
    style={[AppStyles.alignRow, {
      padding: unit18,
    }]}>

    {
      leftImageSource && <Image
        style={[AppStyles.icon24, leftImageProps]}
        source={leftImageSource}
      />
    }

    <AppText
      style={[{
        color: theme === 'light' ? colorPallet.color_text_blue_3 : AppColors.color_text2,
        fontSize: fontSize16 ,
        paddingHorizontal:  leftImageSource?  unit16 : 0,
        flexGrow: 1,
      },appTxtStyle]}>
      {title}
    </AppText>

    {
      rightImageSource && <Image
        style={[AppStyles.icon24, rightImageProps]}
        source={rightImageSource}
      />
    }
  </PressView>;
};

export default SelectItem;
