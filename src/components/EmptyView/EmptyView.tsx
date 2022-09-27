import React from "react";
import { Image, View, ViewProps } from "react-native";
import { IMG_EMPTY_VIEW } from "../../assets/path";
import AppText from "../AppText/AppText";
import { unit218, unit8 } from "../../utils/appUnit";

interface EmptyViewProps extends ViewProps {
  refresh?: () => void;
}

const EmptyView: React.FC<EmptyViewProps> = (
  {
    style,
  },
) => {
  return (
    <View
      style={[{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }, style]}>
      <Image
        style={{
          width: unit218,
          height: unit218,
        }}
        source={IMG_EMPTY_VIEW}
      />
      <AppText
        style={{}}>
        Không tìm thấy dữ liệu
      </AppText>

      <AppText
        style={{
          textAlign: "center",
          marginTop: unit8,
        }}>
        {
          "Vui lòng thử lại sau"
        }
      </AppText>
    </View>
  );
};

export default EmptyView;
