import React, {useEffect, useState} from "react";
import {Dimensions, Image, StyleProp, View, ViewProps, ViewStyle} from "react-native";
import {
  unit1, unit10,
  unit100,
  unit12, unit14, unit15,
  unit16,
  unit18, unit2,
  unit20,
  unit24, unit30, unit4,
  unit40,
  unit43, unit5, unit50,
  unit6, unit60, unit70,
  unit8, unit80,
} from "../../utils/appUnit";
import AppText from "../AppText/AppText";
import { fontSize12, fontSize14, fontSize16 } from "../../styles/AppFonts";
import { useTheme } from "../../hooks/useTheme";
import PressView from "../PressView/PressView";
import {NavigationRef} from "../../../App";;
import useAuth from "../../hooks/useAuth";
import {ReplyModel} from "../../model/ApiModel/ReplyModel";



interface ReplyItemProps extends ViewProps{
  reply: ReplyModel;
}

const ReplyItem: React.FC<ReplyItemProps> = (props) => {

  const { reply } = props;
  const {colorPallet} = useTheme();
  const {authData} = useAuth();
  const user = authData.user;


  return (
    <>
      <View
        style={[{
          flexDirection:'row',
          marginBottom: unit6,
          paddingVertical: unit6,
          backgroundColor: colorPallet.color_background_1,
          paddingLeft: unit15,
          borderRadius: unit20
        }]}
      >
        <PressView
          onPress={() =>{
            NavigationRef?.current?.navigate('AnotherUserScreen',{
              user_uuid:  reply?.user?.user_uuid
            })
          }
          }
        >
          <Image
            source={{
              uri: reply?.user?.avatar
            }}
            style={[{
              width: unit30,
              height: unit30,
              marginRight: unit16,
              borderRadius: unit100,
            }]}
          />
        </PressView>
        <View
          style={{
            flexDirection:'column',
            marginRight: unit80,
          }}
        >
          <PressView
            onPress={() =>{
              NavigationRef?.current?.navigate('AnotherUserScreen',{
                user_uuid:  reply?.user?.user_uuid
              })
            }
            }
            style={{
              flexDirection:'row',
              marginBottom:unit4,
            }}
          >
            <AppText
              fontType={'semiBold'}
              style={{
                fontSize: fontSize12,
                color: colorPallet.color_text_blue_1,
                marginRight: unit24
              }}
            >
              {reply?.user?.name}
            </AppText>

            <AppText
              style={{
                fontSize: fontSize12,
                color: colorPallet.color_text_gray_3
              }}
            >
              {reply?.time}
            </AppText>

          </PressView>

          <AppText
            style={{
              fontSize: fontSize12,
              color: colorPallet.color_text_gray_1,
              lineHeight: unit20
            }}
          >
            {reply?.content}
          </AppText>

        </View>

      </View>
    </>
  )
};

export default ReplyItem;
