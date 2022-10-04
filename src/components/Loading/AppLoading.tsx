import React from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import LottieView from "lottie-react-native";
import { LOADING_ANIM } from "../../assets/path";
import { unit100 } from "../../utils/appUnit";
import { useTheme } from "../../hooks/useTheme";

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
        backgroundColor: isOverlay ? undefined : colorPallet.color_background_3,
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
    width: unit100,
  },
});

export default React.memo(AppLoading);
