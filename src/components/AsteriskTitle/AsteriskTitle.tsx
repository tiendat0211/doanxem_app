import React from 'react';
import AppColors from "../../styles/AppColors";
import {unit14, unit20, unit4} from "../../utils/appUnit";
import {StyleProp, StyleSheet, View, ViewProps, ViewStyle} from "react-native";
import AppStyles from "../../styles/AppStyles";
import AppText from "../AppText/AppText";
import { useTheme } from "../../hooks/useTheme";


interface AsteriskTitleProps extends ViewProps{
  title:string,
  asterisk?:boolean,
  style? : StyleProp<ViewStyle>
}
const AsteriskTitle:React.FC<AsteriskTitleProps> =(
  {
    title,asterisk, style
  }
) =>{
  const {colorPallet} = useTheme();
  return (
    <View style={[AppStyles.alignRow, style]}>
      <AppText fontType="bold" style={[styles.titleStyle,{color:colorPallet.color_text_blue_3}]}>{title}</AppText>
      {asterisk&&<AppText fontType="bold" style={[styles.titleStyle,{marginStart:unit4,color:AppColors.color_warning}]}>*</AppText>}
    </View>
  )
}
export default AsteriskTitle

const styles = StyleSheet.create({
  titleStyle:{
    fontSize:unit14,
    lineHeight:unit20,
  },
})
