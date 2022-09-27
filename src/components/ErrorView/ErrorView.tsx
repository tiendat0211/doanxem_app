import React from "react";
import { Image, StatusBar, StyleSheet, View, ViewProps } from "react-native";
import LinearButton from "../LinearButton/LinearButton";
import AppText from "../AppText/AppText";
import { IMG_ERROR } from "../../assets/path";
import AppColors from "../../styles/AppColors";
import { unit12, unit15, unit218, unit24, unit30, unit44, unit8, unit9 } from "../../utils/appUnit";
import { Colors } from "react-native/Libraries/NewAppScreen";

interface ErrorView extends ViewProps {
  onRefresh?: () => void;
  onBack?: () => void;
  errorText?: string;
  errorDesc?: string;
}

const ErrorView: React.FC<ErrorView> = (
  {
    onRefresh,
    errorDesc,
    errorText,
    style,
    onBack,
  },
) => {
  return (
    <View style={[styles.container, style]}>
      <StatusBar
        translucent={true}
        barStyle={"dark-content"}
        backgroundColor={AppColors.color_transparent}
      />
      <Image source={IMG_ERROR} style={{ width: unit218, height: unit218 }} />
      <AppText style={styles.title}>
        {errorText}
      </AppText>
      <AppText style={styles.descTxt}>{errorDesc}</AppText>

      <LinearButton
        style={styles.styleButton}
        containerStyle={styles.styleButtonContainer}
        titleStyle={styles.titleButtonContainer}
        title={"Tải lại dữ liệu"}
        onPress={onRefresh}
      />

      {onBack && (
        <LinearButton
          style={[
            styles.styleButton,
            {
              marginTop: unit12,
            },
          ]}
          containerStyle={styles.styleButtonContainer}
          titleStyle={styles.titleButtonContainer}
          title={"Go back"}
          onPress={onBack}
        />
      )}
    </View>
  );
};

ErrorView.defaultProps = {
  errorText: "Đã có lỗi xảy ra",
  errorDesc: "Có vẻ như đã có lỗi không mong muốn\nVui lòng thử lại sau",
};

export default ErrorView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.color_white,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    color: Colors.color_3A3A3C,
    lineHeight: unit30,
  },
  descTxt: {
    textAlign: "center",
    color: Colors.color_3A3A3C,
    lineHeight: unit24,
    marginTop: unit8,
  },
  styleButton: {
    width: "50%",
    marginTop: unit44,
  },
  styleButtonContainer: {
    paddingVertical: unit9,
  },
  titleButtonContainer: {
    textAlign: "center",
    color: "white",
    fontSize: unit15,
  },
});
