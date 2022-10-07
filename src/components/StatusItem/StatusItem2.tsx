import React, { useRef, useState } from "react";
import { Dimensions, Image, ImageProps, StyleProp, View, ViewStyle } from "react-native";
import { unit1, unit100, unit12, unit16, unit18, unit20, unit24, unit300, unit40, unit8 } from "../../utils/appUnit";
import AppText from "../AppText/AppText";
import { fontSize12, fontSize14, fontSize16 } from "../../styles/AppFonts";
import { useTheme } from "../../hooks/useTheme";
import PressView from "../PressView/PressView";
import { IC_CLOSE, IC_COMMENT, IC_OPTION, IC_REACTION, IC_SAVE, IC_SHAREPOST, IMG_LOGO } from "../../assets/path";
import FooterItem from "../FooterItem/FooterItem";
import { useLanguage } from "../../hooks/useLanguage";
import Reaction from "../../screens/Reaction/Reaction";
import { NavigationRef } from "../../../App";
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from "@gorhom/bottom-sheet";
import AppStyles from "../../styles/AppStyles";
import { PostModel } from "../../model/ApiModel/PostModel";
import VideoPlayer from "react-native-video-player";
import FastImage from "react-native-fast-image";



interface StatusItemProps{
  post?: PostModel,
  style?: StyleProp<ViewStyle>,
  onPressComment?: () => void
  onPressImage?: () => void
}

const StatusItem: React.FC<StatusItemProps> = (props) => {

  const { post, style,onPressComment,onPressImage} = props;
  const {colorPallet} = useTheme();
  const [viewMore, setViewMore] = useState(true);
  const { language } = useLanguage();

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
        <View
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
              style={{
                fontSize:fontSize12,
                color: colorPallet.color_text_gray_2
              }}
            >
              {post?.time}
            </AppText>
          </View>

        </View>

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
              ? <VideoPlayer
                video={{ uri: post?.image}}
                videoWidth={1600}
                videoHeight={1600}
                defaultMuted={true}
                showDuration={false}
              />:
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
            img={IC_SAVE}
          />

        </View>

      </View>
    </>
  )
};

export default StatusItem;
