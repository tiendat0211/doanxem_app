import React, { useEffect, useRef, useState } from "react";
import { Dimensions, Image, ImageProps, StyleProp, Text, View, ViewStyle } from "react-native";
import {
  unit1,
  unit100,
  unit12,
  unit150,
  unit16,
  unit18,
  unit20,
  unit24,
  unit300,
  unit40, unit5,
  unit8,
} from "../../utils/appUnit";
import AppText from "../AppText/AppText";
import { fontSize12, fontSize14, fontSize16 } from "../../styles/AppFonts";
import { useTheme } from "../../hooks/useTheme";
import PressView from "../PressView/PressView";
import {
  IC_COMMENT,
  IC_OPTION,
  IC_REACTION,
  IC_SAVE,
  IC_SAVED,
  IC_SHAREPOST,
  IMG_LOGO,
  IMG_NO_PICTURE,
} from "../../assets/path";
import FooterItem from "../FooterItem/FooterItem";
import { useLanguage } from "../../hooks/useLanguage";
import Reaction from "../../screens/Reaction/Reaction";
import { NavigationRef } from "../../../App";
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from "@gorhom/bottom-sheet";
import AppStyles from "../../styles/AppStyles";
import { PostModel } from "../../model/ApiModel/PostModel";
import VideoPlayer from "react-native-video-player";
import FastImage from "react-native-fast-image";
import PopUp from "../PopUp/PopUp";
import AppColors from "../../styles/AppColors";

interface StatusItemProps{
  post?: PostModel,
  style?: StyleProp<ViewStyle>,
  onPressComment?: () => void
  onPressImage?: () => void
  openBottomSheet?: () => void
  onPressSave?: () => void
}

const StatusItem: React.FC<StatusItemProps> = (props) => {

  const { post, style,onPressComment,onPressImage,openBottomSheet,onPressSave} = props;
  const {colorPallet} = useTheme();
  const [viewMore, setViewMore] = useState(true);
  const { language } = useLanguage();
  // const [imgWidth, setImgWidth] = useState(0)
  // const [imgHeight, setImgHeight] = useState(0)
  //
  // function getSize(){
  //   if ( !post?.image?.endsWith('mp4')){
  //     Image.getSize(post?.image || '',(width, height) => {
  //       setImgWidth(width);
  //       setImgHeight(height);
  //     })
  //   }
  //
  // }
  //
  // useEffect(()=>{
  //   getSize();
  // })

  return (
    <>
      <View
        style={[{
          paddingVertical: unit16,
          backgroundColor: colorPallet.color_background_1,
          marginBottom: unit8
        },style]}
      >
        {/* User of Status */}
        <PressView
          onPress={() => {
            NavigationRef?.current?.navigate("AnotherUserScreen",{
              user_uuid: post?.user?.user_uuid || ""
              }
            )
          }}
          style={{
            flexDirection: 'row',
            alignItems:'center',
            paddingBottom: unit8,
            borderBottomWidth: unit1,
            borderBottomColor: colorPallet.color_divider_3
          }}
        >
          <Image
            source={{
              uri: post?.user?.avatar
            }}
            style={{
              width: unit40,
              height: unit40,
              borderRadius: unit100,
              marginRight: unit12,
              marginLeft: unit20
            }}
          />

          <View
            style={{
              flexDirection:'column',
              flexGrow:1,
            }}
          >
            <AppText
              fontType={'semiBold'}
              style={{
                fontSize: fontSize16,
                color: colorPallet.color_text_blue_3
              }}
            >
              {post?.user?.name}
            </AppText>
            <AppText
              fontType={'regular'}
              style={{
                fontSize:fontSize12,
                color: colorPallet.color_text_gray_2,
                lineHeight: unit18
              }}
            >
              {post?.time}
            </AppText>
          </View>

          <PressView
            onPress={openBottomSheet}
          >
            <Image
              source={IC_OPTION}
              style={{
                width: unit24,
                height: unit24,
                marginRight: unit20
              }}
            />
          </PressView>

        </PressView>

        {/* Content */}
        <PressView
          onPress={onPressImage}
          style={{
            flex: 1,
            marginHorizontal: unit20,
            marginTop: unit8,
            marginBottom: unit12,
          }}
        >
          <AppText
            style={{
              color: colorPallet.color_text_gray_1,
              fontSize: fontSize16,
            }}>
            {viewMore ? `${post?.title.slice(0, 71)} ` : post?.title}
            {post?.title?.length! >70 &&
              <AppText
                onPress={() => setViewMore(prev => !prev)}
                style={{
                  color: colorPallet.color_text_gray_3,
                  fontSize: fontSize16,
                }}>
                {viewMore ? `...${language?.viewMore}` : ``}
              </AppText>
            }


          </AppText>

        </PressView>

        {/* Images or Videos */}
        <PressView
          onPress={onPressImage}
        >
          {
            post?.image.endsWith('mp4')
              ?
              <VideoPlayer
                video={{ uri: post?.image}}
                videoWidth={1600}
                videoHeight={1600}
                showDuration={true}
                defaultMuted={true}
                thumbnail={{uri: post?.image}}
                style={{
                  backgroundColor: AppColors.color_transparent_dark
                }}
                customStyles={{
                  playArrow: {
                    color: AppColors.color_white,
                  }
                }}
              />
            :
              <FastImage
                source={{
                  uri: post?.image
                }}
                style={{
                  width: Dimensions.get('screen').width,
                  height: Dimensions.get('screen').width,
                }}
                resizeMode={FastImage.resizeMode.contain}
              />
          }
        </PressView>

        {/* Footer */}
        <View
          style={{
            flexDirection:'row',
            marginTop: unit18,
            paddingHorizontal: unit20
          }}
        >
          <Reaction
            total_reactions={post?.total_reactions}
            post_uuid={post?.post_uuid || ''}
            userReaction={post?.user_action}
          />

          <FooterItem
            img={IC_COMMENT}
            title={post?.comments_count.toString()}
            style={{
              marginRight: unit24
            }}
            onPress={onPressComment}
          />

          <FooterItem
            img={IC_SHAREPOST}
            title={'Chia sẻ'}
            style={{
              flexGrow: 1,
              marginRight: unit24
            }}
          />

          <FooterItem
            img={ post?.isSaved?  IC_SAVED : IC_SAVE}
            onPress={onPressSave}
          />

        </View>

      </View>
    </>
  )
};

export default StatusItem;
