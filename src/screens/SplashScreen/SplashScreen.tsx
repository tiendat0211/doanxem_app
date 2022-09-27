import React from "react";
import { SafeAreaView, StatusBar, Text } from "react-native";
import AppStyles from "../../styles/AppStyles";
import AppColors from "../../styles/AppColors";
import { unit18 } from "../../utils/appUnit";

const SplashScreen: React.FC = () => {
  return <SafeAreaView style={[AppStyles.centerContainer, {
    backgroundColor: "green",
  }]}>
    <StatusBar
      translucent
      backgroundColor={AppColors.color_transparent}
      barStyle={"light-content"} />
    <Text style={{
      color: "white",
      fontSize: unit18,
    }}>SPLASH SCREEN</Text>
  </SafeAreaView>;
};

export default SplashScreen;
