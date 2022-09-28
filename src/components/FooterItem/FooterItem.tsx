import React from "react";
import { Image, StyleProp, View, ViewStyle } from "react-native";
import { unit20, unit24, unit8 } from "../../utils/appUnit";
import AppText from "../AppText/AppText";
import { fontSize14 } from "../../styles/AppFonts";
import { useTheme } from "../../hooks/useTheme";
import PressView from "../PressView/PressView";


interface FooterItemProps{
  img: any,
  title?: string,
  style?: StyleProp<ViewStyle>,
  onPress?: () => {}
}

const FooterItem: React.FC<FooterItemProps> = (props) => {

  const {img, title,style,onPress} = props
  const {colorPallet} = useTheme()

  return (
    <>
      <PressView
        onPress={onPress}
        style={[{
          flexDirection: 'row',
          alignItems:'center',
      },style]}
      >
        <Image
          source={img}
          style={{
            width: unit24,
            height: unit24,
            marginRight: title?  unit8 : 0,
          }}
        />
        {
          title? <AppText
            fontType={'semiBold'}
            style={{
              fontSize: fontSize14,
              color: colorPallet.color_text_blue_3,
            }}
          >
            {title}
          </AppText>
            : null
        }
      </PressView>
    </>
  )
};

export default FooterItem;
