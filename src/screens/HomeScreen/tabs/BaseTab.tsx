import React from "react";
import { SafeAreaView, StatusBar, View } from "react-native";
import AppColors from "../../../styles/AppColors";
import { useTheme } from "../../../hooks/useTheme";
import { useLanguage } from "../../../hooks/useLanguage";

interface BaseTabProps {
  type: string;
}

const BaseTab: React.FC<BaseTabProps> = (props) => {
  const {colorPallet, theme} = useTheme()
  const { language } = useLanguage();
  return(
    <>
      <View
        style={{
          backgroundColor: colorPallet.color_background_3
        }}
      >

      </View>
    </>
  );
}

export default BaseTab;
