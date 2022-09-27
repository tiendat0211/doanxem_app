import React from "react";
import { Image, StyleProp, View, ViewStyle } from "react-native";
import lightColors from "../../styles/theme/lightColors";
import { fontSize14, fontSize16, fontSize18, fontSize36 } from "../../styles/AppFonts";
import { unit12, unit16, unit20, unit24, unit32, unit40, unit8 } from "../../utils/appUnit";
import AppText from "../AppText/AppText";
import { useTheme } from "../../hooks/useTheme";
import { IMG_LOGO } from "../../assets/path";


interface AuthenScreenViewProps {
  name: string;
  slogan: string;
  style?: ViewStyle;
  contentStyle?: StyleProp<ViewStyle>;
}

const AuthenScreenView: React.FC<AuthenScreenViewProps> = ({
                                                             name,
                                                             slogan,
                                                             style,
                                                             contentStyle
                                                           }) => {
  const {colorPallet} = useTheme()
  return (
    <View style={style}>
      <Image
        source={IMG_LOGO}
        style={{
          width:72,
          height:72,
          marginBottom: unit20,
        }}
      />

      <AppText
        style={{
          textAlign: "center",
          fontSize: fontSize18,
          color: colorPallet.color_text_blue_1,
        }}
      >
        {name}
      </AppText>
      <AppText

        style={{
          textAlign: "center",
          fontSize: fontSize14,
          color: colorPallet.color_text_gray_2,
          marginTop:unit8,
        }}>
        {slogan}
      </AppText>
    </View>
  );
};

export default AuthenScreenView;
