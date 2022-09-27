import React from "react";
import { PressableProps } from "react-native";
import AppColors from "../../styles/AppColors";
import { unit32, unit4, unit16, unit20, unit8, unit12 } from "../../utils/appUnit";
import AppText from "../AppText/AppText";
import PressView from "../PressView/PressView";
import { useTheme } from "../../hooks/useTheme";
import { fontSize16 } from "../../styles/AppFonts";


interface SelectItemProps extends PressableProps {
  title: string,
  focused: boolean
}

const SelectItem: React.FC<SelectItemProps> = (props) => {
  let { title, focused } = props;
  const { colorPallet } = useTheme();
  return <PressView
    {...props}
    style={[{
      borderWidth: 1,
      borderColor: focused ? AppColors.color_primary : colorPallet.color_divider_2,
      backgroundColor: focused ? AppColors.color_primary : undefined,
      borderRadius: unit32,
      paddingVertical: unit4,
      paddingHorizontal: unit16,
      marginTop: unit12,
      marginEnd: unit8,
    }, props.style as {}]}
  >
    <AppText
      style={{
        fontSize: fontSize16,
        color: focused ? AppColors.color_white : AppColors.color_primary,
      }}>
      {title}
    </AppText>
  </PressView>;
};
export default SelectItem;
