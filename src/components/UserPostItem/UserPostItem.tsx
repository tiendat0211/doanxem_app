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
import AppColors from "../../styles/AppColors";
import VideoPlayer from "react-native-video-player";
import { IMG_NO_PICTURE } from "../../assets/path";

interface UserPostItem {
  post: PostModel,
}


const UserProfileItem: React.FC<UserPostItem> = (props) => {
  let { post } = props;
  const { colorPallet, theme } = useTheme()

  function renderVideoOrImg(post: any) {
    if (post.image!.endsWith('mp4') || post.type == 'video/mp4') {
      return <VideoPlayer
        customStyles={{
          wrapper: {
            backgroundColor:'red',
            height: (Dimensions.get('screen').width - unit40 - unit32) / 3,
            width: (Dimensions.get('screen').width - unit40 - unit32) / 3,
            borderRadius: unit20
          }
        }
        }
        video={{ uri: post.image }}
        videoWidth={1600}
        videoHeight={900}
        style={{
          marginTop: unit12,
          backgroundColor: AppColors.color_transparent_dark,
        }}
        showDuration={true}
        defaultMuted={true}
      // thumbnail={{ uri: IC_CLOSE }}
      />;
    } else {
      <FastImage
        source={{
          uri: post?.image
        }}
        style={{
          height: (Dimensions.get('screen').width - unit40 - unit32) / 3,
          width: (Dimensions.get('screen').width - unit40 - unit32) / 3,
          borderRadius: unit20
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
    }
  }

  return (
    <>
      <PressView
        onPress={() => {
          console.log('post', post);
        }}
        style={{
          marginRight: unit16,
          marginBottom: unit12
        }}
      >
        {/* {renderVideoOrImg(post)} */}
        <FastImage
          source={{
            uri: post?.image.endsWith('mp4') ? 'https://www.techsmith.com/blog/wp-content/uploads/2019/06/YouTube-Thumbnail-Sizes.png' : post?.image
          }}
          style={{
            height: (Dimensions.get('screen').width - unit40 - unit32) / 3,
            width: (Dimensions.get('screen').width - unit40 - unit32) / 3,
            borderRadius: unit20
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
      </PressView>
    </>
  )

};
export default UserProfileItem;
