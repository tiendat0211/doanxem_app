import { Image, ImageSourcePropType, Platform, Text, TextInput, View, ViewStyle } from "react-native";
import React from "react";
import { AppFonts, dimension, fontSize14, fontSize16, fontSize18 } from "../../styles/AppFonts";
import { useTheme } from "../../hooks/useTheme";

import {
  unit12,
  unit16,
  unit20,
  unit95,
} from "../../utils/appUnit";
import PressView from "../PressView/PressView";


interface UserPostItem {
  img_src: string,
}

const UserProfileItem: React.FC<UserPostItem> = (props) => {
  let { img_src} = props;
  const { colorPallet, theme } = useTheme()
  return (
    <>
      <PressView
        style={{
          marginRight: unit16,
          marginBottom: unit12
        }}
      >
        <Image
          source={{
            uri: img_src
          }}
          style={{
            height: unit95,
            width: unit95,
            borderRadius: unit20
          }}
        />
      </PressView>
    </>
  )

};
export default UserProfileItem;
