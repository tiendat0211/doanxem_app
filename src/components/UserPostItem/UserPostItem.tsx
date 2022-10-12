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
import getVideoDurationInSeconds from "get-video-duration";

interface UserPostItem {
  post: PostModel,
}


const UserProfileItem: React.FC<UserPostItem> = (props) => {
  let { post} = props;
  const { colorPallet, theme } = useTheme()
  const [duration, setDuration] = useState(0);

  function getDuration(){
    if (post?.image?.endsWith('mp4')){
      getVideoDurationInSeconds(
        post?.image
      ).then((duration: any) => {
        console.log(duration)
      })
    }
  }

  useEffect(()=>{
    getDuration()
  })

  return (
    <>
      <PressView
        style={{
          marginRight: unit16,
          marginBottom: unit12
        }}
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
