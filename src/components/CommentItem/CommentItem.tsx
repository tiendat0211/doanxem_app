import React, {useEffect, useState} from "react";
import {Image, StyleProp, View, ViewProps, ViewStyle} from "react-native";
import {
  unit100,
  unit16,
  unit20,
  unit24,
  unit30,
  unit4,
  unit43,
  unit5,
  unit6,
  unit8,
  unit80,
} from "../../utils/appUnit";
import AppText from "../AppText/AppText";
import {fontSize14} from "../../styles/AppFonts";
import {useTheme} from "../../hooks/useTheme";
import PressView from "../PressView/PressView";
import {IC_ARROWRIGHT,} from "../../assets/path";
import {CommentModel} from "../../model/ApiModel/CommentModel";
import {NavigationRef} from "../../../App";
import {ReplyModel} from "../../model/ApiModel/ReplyModel";
import ReplyItem from "../ReplyItem/ReplyItem";
import {getListReply} from "../../network/AppAPI";
import ApiHelper from "../../utils/ApiHelper";
import {showToastErrorMessage} from "../../utils/Toaster";
import useScreenState from "../../hooks/useScreenState";
import {AppPusher} from "../../utils/AppConfig";
import {PusherCommment} from "../../model/ApiModel/PusherCommment";

export type CommnetType =
  | "error"
  | "success";

interface CommentItemProps extends ViewProps{
  styleUserImage?: StyleProp<Image>;
  onPressViewMore?: () => void;
  comment: CommentModel;
  onImagePress?:()=>void;
  style?: StyleProp<ViewStyle>;
  type: CommnetType;
  onPressReSend?:()=> void;
  onPressReply?:() => void;
  replyCommentID?: number;
  postUUID?: string;
}

const CommentItem: React.FC<CommentItemProps> = (props) => {
  const { comment,styleUserImage, onPressViewMore, style,type,onPressReSend,onPressReply,replyCommentID,postUUID} = props;
  const {colorPallet} = useTheme();
  const [isOpen,setOpen] = useState(false)
  const [listReply,setListReply] = useState<ReplyModel[]>([])
  const { setError } = useScreenState();
  const [replies,setReplies] = useState(comment?.total_replies)


  async function loadListReply(post_uuid:string, comment_id: number){
    try {
      const res = await getListReply(post_uuid,comment_id);
      if (ApiHelper.isResSuccess(res)) {
        const data = res?.data?.data;
        setListReply(data);
      } else {
        showToastErrorMessage(res.data.message);
      }
    } catch (e) {
      setError(e);
    } finally {
    }
  }

  useEffect(() => {
    const channel = AppPusher.bind(
      "App\\Events\\CommentAndReply",
      async (pusher: PusherCommment)=>{
        const { data , user } = pusher;
        if (data){
          if (data.type === 'reply'){
            if (comment?.id === data?.comment_id ){
              const newReply : ReplyModel = {
                comment_id: data.comment_id,
                content: data.content,
                id: data.reply_id,
                time: data.time,
                type: data.type,
                user: user,
              }
              setListReply(prev=>{
                for (let i = 0; i < prev.length; i++) {
                  if(prev[i].id === newReply.id) {
                    return prev;
                  }
                }
                return[
                  newReply,
                  ...prev,
                ]
              })
              setReplies(data?.total_replies)
            }
          }
        }
      }
    );

    // channel.reinstateSubscription();
    //
    // return () => {
    //   channel.cancelSubscription();
    // };
  }, []);


  return (
    <>
      <View
        style={[{
          flexDirection:'row',
          paddingHorizontal: unit20,
          paddingVertical: unit6,
          backgroundColor:  replyCommentID === comment?.id ? colorPallet.color_background_4 : colorPallet.color_background_1,
          borderRadius: unit20,
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
            marginRight: unit80,
          }}
        >
          <PressView
            onPress={() =>{
              NavigationRef?.current?.navigate('AnotherUserScreen',{
                user_uuid:  comment?.user?.user_uuid
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

          {
            isOpen
              ? listReply.map((item,index)=>{
                return <ReplyItem
                  key={index}
                  reply={item}
                />
              })
              : null
          }

          {
            type === 'success'
              ? <View
                style={{
                  flexDirection: 'row',
                  marginTop: unit5,
                }}
              >
                {/* Reply */}
                <PressView
                  onPress={onPressReply}
                  style={{
                    flexDirection:'row',
                    alignItems:'center',
                    marginRight: unit30
                  }}
                >
                  <Image
                    source={IC_ARROWRIGHT}
                    style={{
                      width: unit16,
                      height: unit16,
                      marginRight: unit8
                    }}
                  />
                  <AppText
                    style={{
                      fontSize: fontSize14,
                      color: colorPallet.color_text_gray_3,
                      lineHeight: unit20
                    }}
                  >
                    Trả lời
                  </AppText>
                </PressView>
                {
                  replies?
                  <PressView
                    onPress={async ()=>{
                      setOpen(!isOpen);
                      await loadListReply(postUUID||'',comment?.id);
                    }}
                  >
                    {
                      isOpen
                        ?  <AppText
                          style={{
                            fontSize: fontSize14,
                            color: colorPallet.color_text_gray_3,
                            lineHeight: unit20
                          }}
                        >
                          Ẩn tất cả phản hồi
                        </AppText>
                        : <AppText
                          style={{
                            fontSize: fontSize14,
                            color: colorPallet.color_text_gray_3,
                            lineHeight: unit20
                          }}
                        >
                          {`Hiển thị ${replies} phản hồi`}
                        </AppText>
                    }
                  </PressView>
                    : null
                }

              </View>
              : null
          }


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
