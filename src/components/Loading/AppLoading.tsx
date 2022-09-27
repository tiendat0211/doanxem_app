import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { LOADING_ANIM } from "../../assets/path";
import LottieView from "lottie-react-native";
import AppColors from "../../styles/AppColors";
import { unit100 } from "../../utils/appUnit";

function AppLoading() {
  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor={AppColors.color_transparent}
        barStyle={"dark-content"}
      />
      <LottieView
        style={styles.loadingView}
        source={LOADING_ANIM}
        autoPlay
        loop
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingView: {
    width: unit100,
  },
});

export default React.memo(AppLoading);
