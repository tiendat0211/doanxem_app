import { Dimensions, Image, ImageSourcePropType, Platform, Text, TextInput, View, ViewStyle } from "react-native";
import React, { useEffect, useState } from "react";
import { AppFonts, dimension, fontSize14, fontSize16, fontSize18 } from "../../styles/AppFonts";
import { useTheme } from "../../hooks/useTheme";

import {
  unit12,
  unit16,
  unit20, unit32, unit40,
  unit95,
} from "../../utils/appUnit";
import PressView from "../PressView/PressView";
import FastImage from "react-native-fast-image";
import { PostModel } from "../../model/ApiModel/PostModel";

interface UserPostItem {
  post: PostModel,
  onPress:()=>void,
}


const UserProfileItem: React.FC<UserPostItem> = (props) => {
  let { post,onPress} = props;
  const { colorPallet, theme } = useTheme()

  return (
    <>
      <PressView
        style={{
          marginRight: unit16,
          marginBottom: unit12
        }}
        onPress={onPress}
      >
        <FastImage
          source={{
            uri: post?.image
          }}
          style={{
            height: (Dimensions.get('screen').width - unit40 - unit32)/3,
            width:  (Dimensions.get('screen').width - unit40 - unit32)/3,
            borderRadius: unit20
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
      </PressView>
    </>
  )

};
export default UserProfileItem;
