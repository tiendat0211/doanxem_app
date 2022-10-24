import React, { useState } from "react";
import {Dimensions, Image, StyleProp, View, ViewProps, ViewStyle} from "react-native";
import {
  unit1, unit10,
  unit100,
  unit12, unit14,
  unit16,
  unit18,
  unit20,
  unit24, unit4,
  unit40,
  unit43, unit5, unit50,
  unit6, unit60, unit70,
  unit8, unit80,
} from "../../utils/appUnit";
import AppText from "../AppText/AppText";
import { fontSize12, fontSize14, fontSize16 } from "../../styles/AppFonts";
import { useTheme } from "../../hooks/useTheme";
import PressView from "../PressView/PressView";
import {
  IC_ARROWRIGHT,
  IC_COMMENT,
  IC_OPTION,
  IC_REACTION,
  IC_SAVE,
  IC_SHAREPOST,
  IC_VIEWMORE,
  IMG_LOGO, LOADING_ANIM,
} from "../../assets/path";
import { CommentModel } from "../../model/ApiModel/CommentModel";
import LottieView from "lottie-react-native";
import {NavigationRef} from "../../../App";
import AppColors from "../../styles/AppColors";

export type CommnetType =
  | "error"
  | "success";

interface StatusItemProps {
  styleUserImage?: StyleProp<Image>;
  onPressViewMore?: () => void;
  comment: CommentModel;
  onImagePress?:()=>void;
  style?: StyleProp<ViewStyle>;
  type: CommnetType;
  onPressReSend?:()=> void;
}

const CommentItem: React.FC<StatusItemProps> = (props) => {

  const { comment,styleUserImage, onPressViewMore, style,type,onPressReSend} = props;
  const {colorPallet} = useTheme();

  return (
    <>
      <View
        style={[{
          flexDirection:'row',
          paddingLeft: unit20,
          paddingVertical: unit6,
        },style]}
      >
        <PressView
          onPress={() =>{
            NavigationRef?.current?.navigate('AnotherUserScreen',{
              user_uuid:  comment?.user?.user_uuid
            })
          }
          }
        >
          <Image
            source={{
              uri: comment?.user?.avatar
            }}
            style={[{
              width: unit43,
              height: unit43,
              marginRight: unit16,
              borderRadius: unit100,
            }]}
          />
        </PressView>
        <View
          style={{
            flexDirection:'column',
            marginRight: unit80
          }}
        >
          <PressView
            style={{
              flexDirection:'row',
              marginBottom:unit4
          }}
          >
            <AppText
              fontType={'semiBold'}
              style={{
                fontSize: fontSize14,
                color: colorPallet.color_text_blue_1,
                marginRight: unit24
              }}
            >
              {comment?.user?.name}
            </AppText>

            <AppText
              style={{
                fontSize: fontSize14,
                color: colorPallet.color_text_gray_3
              }}
            >
              {comment?.time}
            </AppText>

          </PressView>

          <AppText
            style={{
              fontSize: fontSize14,
              color: colorPallet.color_text_gray_1,
              lineHeight: unit20
            }}
          >
            {comment?.content}
          </AppText>

          {type === 'error' ?
            <PressView
              onPress={onPressReSend}
            >
              <AppText
                style={{
                  fontSize: fontSize14,
                  color: colorPallet.color_text_gray_3,
                  lineHeight: unit20
                }}
              >
                Đăng lại
              </AppText>
            </PressView>
             : null}

        </View>
      </View>
    </>
  )
};

export default CommentItem;
