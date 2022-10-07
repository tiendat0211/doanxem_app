import React from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import LottieView from "lottie-react-native";
import { LOADING_ANIM } from "../../assets/path";
import { unit10, unit100, unit150, unit200, unit50 } from "../../utils/appUnit";
import { useTheme } from "../../hooks/useTheme";
import AppColors from "../../styles/AppColors";

interface AppLoadingProps extends ViewProps {
  isOverlay?: boolean;
}

function AppLoading(props: AppLoadingProps) {
  const { colorPallet } = useTheme();
  const { isOverlay } = props;
  const overlayStyle = isOverlay ? StyleSheet.absoluteFill : undefined;
  return (
    <View
      {...props}
      style={[styles.container, {
        backgroundColor: isOverlay ? AppColors.color_transparent_dark : colorPallet.color_background_1,
      }, overlayStyle]}>
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
    width: unit150,
  },
});

export default React.memo(AppLoading);
