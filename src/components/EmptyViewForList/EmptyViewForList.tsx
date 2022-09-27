import React from "react";
import { Image, View, ViewProps } from "react-native";
import { IMG_EMPTY_LIST } from "../../assets/path";
import AppText from "../AppText/AppText";
import { unit12, unit120, unit16 } from "../../utils/appUnit";

interface EmptyViewProps extends ViewProps {
  refresh?: () => void;
}

const EmptyViewForList: React.FC<EmptyViewProps> = (
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
        padding: unit12,
      }, style]}>
      <Image
        style={{
          width: unit120,
          height: unit120,
        }}
        source={IMG_EMPTY_LIST}
      />

      <AppText
        style={{
          textAlign: "center",
          marginTop: unit16,
        }}>
        {
          "Không tìm thấy dữ liệu"
        }
      </AppText>
    </View>
  );
};

export default EmptyViewForList;
