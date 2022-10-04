import React, { useState } from "react";
import { Dimensions, Image, StyleProp, View, ViewStyle } from "react-native";
import {
  unit1,
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
  IMG_LOGO,
} from "../../assets/path";

import { useLanguage } from "../../hooks/useLanguage";

import { CommentModle } from "../../model/CommentModle";

interface StatusItemProps extends  CommentModle{
  styleUserImage?: StyleProp<Image>
  onPressViewMore?: () => void
}

const CommentItem: React.FC<StatusItemProps> = (props) => {

  const { user_img,id, comment_title,time, user_name,styleUserImage, onPressViewMore} = props;
  const {colorPallet} = useTheme();

  return (
    <>
      <View
        style={{
          flexDirection:'row',
          marginLeft: unit20,
          paddingVertical: unit6,
        }}
      >
        <Image
          source={user_img}
          style={[{
            width: unit43,
            height: unit43,
            marginRight: unit16,
            borderRadius: unit100,
          }]}
        />

        <View
          style={{
            flexDirection:'column',
            marginRight: unit80
          }}
        >
          <View
            style={{
              flexDirection:'row',
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
              {user_name}
            </AppText>

            <AppText
              style={{
                fontSize: fontSize14,
                color: colorPallet.color_text_gray_3
              }}
            >
              {time}
            </AppText>

          </View>

          <AppText
            style={{
              fontSize: fontSize14,
              color: colorPallet.color_text_gray_1,
            }}
          >
            {comment_title}
          </AppText>

          <View
            style={{
              flexDirection:'row',
              paddingTop:unit5,
              alignItems: 'center'
            }}
          >
            <Image
              source={IC_ARROWRIGHT}
              style={{
                width: unit16,
                height: unit16,
              }}
            />
            <AppText
              fontType={'regular'}
              style={{
                fontSize: unit12,
                color: colorPallet.color_text_gray_3,
                marginLeft: unit8,
                paddingRight: unit12
              }}
            >
              Trả lời
            </AppText>

            <Image
              source={IC_VIEWMORE}
              style={{
                width: unit16,
                height: unit16,
              }}
            />

            <PressView
              onPress={onPressViewMore}
            >
              <AppText
                fontType={'regular'}
                style={{
                  fontSize: unit12,
                  color: colorPallet.color_text_gray_3,
                  marginLeft: unit4,
                }}
              >
                Thêm
              </AppText>
            </PressView>


          </View>
        </View>
      </View>
    </>
  )
};

export default CommentItem;
