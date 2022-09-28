import React, { useRef, useState } from "react";
import { Dimensions, Image, StyleProp, View, ViewStyle } from "react-native";
import { unit1, unit100, unit12, unit16, unit18, unit20, unit24, unit300, unit40, unit8 } from "../../utils/appUnit";
import AppText from "../AppText/AppText";
import { fontSize12, fontSize14, fontSize16 } from "../../styles/AppFonts";
import { useTheme } from "../../hooks/useTheme";
import PressView from "../PressView/PressView";
import { IC_COMMENT, IC_OPTION, IC_REACTION, IC_SAVE, IC_SHAREPOST, IMG_LOGO } from "../../assets/path";
import FooterItem from "../FooterItem/FooterItem";
import { useLanguage } from "../../hooks/useLanguage";
import Reaction from "../../screens/Reaction/Reaction";
import { NavigationRef } from "../../../App";
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from "@gorhom/bottom-sheet";
import AppStyles from "../../styles/AppStyles";



interface StatusItemProps{
  user_img: any,
  user_name: string,
  time: string,
  status_content: string,
  status_img: any,
  comment_counts: number,
  reaction_counts: number,
  style?: StyleProp<ViewStyle>,
  onPressComment?: () => void
  onPressImage?: () => void
  openBottomSheet?: () => void
}

const StatusItem: React.FC<StatusItemProps> = (props) => {

  const { user_img,user_name,time,style,onPressComment,onPressImage,status_content,status_img, comment_counts,reaction_counts, openBottomSheet} = props;
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
            source={user_img}
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
              {user_name}
            </AppText>
            <AppText
              style={{
                fontSize:fontSize12,
                color: colorPallet.color_text_gray_2
              }}
            >
              {time}
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
            {viewMore
              ? `${status_content.slice(0, 71)}${status_content?.length! > 63 ? "..." : ""
              } `
              : `${status_content} `}
              <AppText
                onPress={() => setViewMore(prev => !prev)}
                style={{
                  color: colorPallet.color_text_gray_3,
                  fontSize: fontSize16,
                }}>
                {viewMore ? `${language?.viewMore}` : ``}
              </AppText>

          </AppText>

        </PressView>

        {/* Images or Videos */}
        <PressView
          onPress={onPressImage}
        >
          <Image
            source={status_img}
            style={{
              width: Dimensions.get('screen').width
            }}
          />
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
            total_reactions={reaction_counts}
            post_uuid={1}
          />

          <FooterItem
            img={IC_COMMENT}
            title={comment_counts.toString()}
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
