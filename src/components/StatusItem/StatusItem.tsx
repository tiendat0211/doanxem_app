import React, { useEffect, useState } from "react";
import { Dimensions, Image, StyleProp, useWindowDimensions, View, ViewStyle } from "react-native";
import { unit1, unit100, unit12, unit16, unit18, unit20, unit24, unit40, unit8 } from "../../utils/appUnit";
import AppText from "../AppText/AppText";
import { fontSize12, fontSize16 } from "../../styles/AppFonts";
import { useTheme } from "../../hooks/useTheme";
import PressView from "../PressView/PressView";
import { IC_COMMENT, IC_OPTION, IC_SAVE, IC_SAVED, IC_SHAREPOST } from "../../assets/path";
import FooterItem from "../FooterItem/FooterItem";
import { useLanguage } from "../../hooks/useLanguage";
import Reaction from "../../screens/Reaction/Reaction";
import { NavigationRef } from "../../../App";
import { PostModel } from "../../model/ApiModel/PostModel";
import VideoPlayer from "react-native-video-player";
import AppColors from "../../styles/AppColors";
import UserModel from "../../model/ApiModel/UserModel";
import useAuth from "../../hooks/useAuth";

interface StatusItemProps {
  post?: PostModel,
  style?: StyleProp<ViewStyle>,
  onPressComment?: () => void
  onPressImage?: () => void
  openBottomSheet?: () => void
  onPressSave?: () => void
}

const StatusItem: React.FC<StatusItemProps> = (props) => {
  const { post, style, onPressComment, onPressImage, openBottomSheet, onPressSave } = props;
  const { colorPallet } = useTheme();
  const [viewMore, setViewMore] = useState(true);
  const { language } = useLanguage();
  const user = useAuth()?.authData.user

  const { width, height } = useWindowDimensions();
  const imageRef = React.createRef<Image>();


  function getSize() {
    try {
      if (!post?.image?.toLowerCase()?.endsWith("mp4") && !post?.image?.toLowerCase()?.endsWith("mov")) {
        Image.getSize(post?.image || "", (_width, _height) => {
          imageRef.current?.setNativeProps({
            height: (width * _height) / _width,
          });
        });
      }
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    getSize();
  });

  return (
    <>
      <View
        style={[{
          paddingVertical: unit16,
          backgroundColor: colorPallet.color_background_1,
          marginBottom: unit8,
        }, style]}
      >
        {/* User of Status */}
        <PressView
          onPress={() => {
            if(post?.user_id == user?.id){
              NavigationRef.current?.navigate('ProfileScreen',{
                goback:true
              })
            } else{
              NavigationRef?.current?.navigate("AnotherUserScreen",{
                user_uuid: post?.user?.user_uuid
                }
              )
            }
            
          }}
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingBottom: unit8,
            borderBottomWidth: unit1,
            borderBottomColor: colorPallet.color_divider_3,
          }}
        >
          <Image
            source={{
              uri: post?.user?.avatar,
            }}
            style={{
              width: unit40,
              height: unit40,
              borderRadius: unit100,
              marginRight: unit12,
              marginLeft: unit20,
            }}
          />

          <View
            style={{
              flexDirection: "column",
              flexGrow: 1,
            }}
          >
            <AppText
              fontType={"semiBold"}
              style={{
                fontSize: fontSize16,
                color: colorPallet.color_text_blue_3,
              }}
            >
              {post?.user?.name}
            </AppText>
            <AppText
              fontType={"regular"}
              style={{
                fontSize: fontSize12,
                color: colorPallet.color_text_gray_2,
                lineHeight: unit18,
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
                marginRight: unit20,
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
            {post?.title?.length! > 70 &&
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
            post?.image.endsWith("mp4")
              ?
              <VideoPlayer
                removeClippedSubviews={true}
                posterResizeMode={"contain"}
                video={{ uri: post?.image }}
                videoWidth={Dimensions.get("screen").width}
                videoHeight={Dimensions.get("screen").width}
                showDuration={true}
                defaultMuted={true}
                thumbnail={{ uri: post?.thumbnail }}
                endWithThumbnail={false}
                style={{
                  backgroundColor: colorPallet.color_background_1,
                }}
                customStyles={{
                  playArrow: {
                    color: AppColors.color_white,
                  },
                }}
              />
              :
              <Image
                ref={imageRef}
                source={{
                  uri: post?.image,
                }}

                style={{
                  width,
                  height: width,
                }}
                resizeMode={"contain"}
              />
          }
        </PressView>

        {/* Footer */}
        <View
          style={{
            flexDirection: "row",
            marginTop: unit18,
            paddingHorizontal: unit20,
          }}
        >
          <Reaction
            total_reactions={post?.total_reactions}
            post_uuid={post?.post_uuid || ""}
            userReaction={post?.user_action}
            onReaction={() => {
            }}
          />

          <FooterItem
            img={IC_COMMENT}
            title={post?.total_comments.toString()}
            style={{
              marginRight: unit24,
            }}
            onPress={onPressComment}
          />

          <FooterItem
            img={IC_SHAREPOST}
            title={"Chia sẻ"}
            style={{
              flexGrow: 1,
              marginRight: unit24,
            }}
          />

          <FooterItem
            img={post?.isSaved ? IC_SAVED : IC_SAVE}
            onPress={onPressSave}
          />

        </View>

      </View>
    </>
  );
};

export default StatusItem;
