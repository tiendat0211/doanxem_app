import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  BackHandler,
  Keyboard, KeyboardAvoidingView, Platform,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StatusBar, TextInput,
  View,
} from "react-native";
import AppStyles from "../../styles/AppStyles";
import useAuth from "../../hooks/useAuth";
import AppColors from "../../styles/AppColors";
import { useTheme } from "../../hooks/useTheme";
import {
  IC_ARROWLEFT,
} from "../../assets/path";
import { useLanguage } from "../../hooks/useLanguage";
import { NavigationRef, RootStackParamList } from "../../../App";
import AppBar from "../../components/AppBar/AppBar";
import { PostModel } from "../../model/ApiModel/PostModel";
import CommentItem from "../../components/CommentItem/CommentItem";
import AppInput from "../../components/AppInput/AppInput";
import { RouteProp, useRoute } from "@react-navigation/native";
import {getListComment, getPostDetail, postComment, postReply, savePost} from "../../network/AppAPI";
import ApiHelper from "../../utils/ApiHelper";
import useScreenState from "../../hooks/useScreenState";
import StatusItem2 from "../../components/StatusItem/StatusItem2";
import AppLoading from "../../components/Loading/AppLoading";
import { CommentModel } from "../../model/ApiModel/CommentModel";
import AppText from "../../components/AppText/AppText";
import { fontSize18, fontSize20 } from "../../styles/AppFonts";
import { showToastErrorMessage, showToastMsg } from "../../utils/Toaster";
import PopUp from "../../components/PopUp/PopUp";
import { unit1, unit20, unit5 } from "../../utils/appUnit";
import AppTracking from "../../tracking/AppTracking";
import { AppPusher } from "../../utils/AppConfig";
import { PusherCommment } from "../../model/ApiModel/PusherCommment";
import {ReplyModel} from "../../model/ApiModel/ReplyModel";


type DetailStatusScreenProps = RouteProp<RootStackParamList, "DetailPostScreen">;
export const refInput = React.createRef<TextInput>();

const DetailPostScreen: React.FC = () => {
  const { postID, onUpdatePost } = useRoute<DetailStatusScreenProps>().params;
  const { colorPallet, theme } = useTheme()
  const { language } = useLanguage();
  const [listComment, setListComment] = useState<CommentModel[]>([]);
  const [userComment, setUserComment] = useState('');
  const { isLoading, setLoading, error, setError, mounted } = useScreenState();
  const [postDetail, setPostDetail] = useState<PostModel>();
  const scrollViewRef = useRef<ScrollView>(null);
  const [isOpen, setOpen] = useState(false);
  const [saved, setISSaved] = useState(false);
  const { authData } = useAuth()
  const user = authData.user;
  const [valid, setValid] = useState(false);
  const [commentID,setCommentID] = useState(0)
  const [userName,setUserName] = useState('')
  const [totalComment,setTotalComment] = useState(0);

  async function loadPostDetail(post_uuid = postID) {
    try {
      const res = await getPostDetail(post_uuid);
      if (ApiHelper.isResSuccess(res)) {
        setPostDetail(res?.data?.data);
        setTotalComment(res?.data?.data.total_comments);
      }
      setError(undefined);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false)
    }
  }

  async function loadComment(post_uuid = postID) {
    try {
      const res = await getListComment(post_uuid);
      if (ApiHelper.isResSuccess(res)) {
        setListComment(res?.data?.data);
      }
      setError(undefined);
    } catch (e) {
      setError(e);
    } finally {
    }
  }


  useEffect(() => {
    setLoading(true)
    const screenStartTime = new Date();
    loadPostDetail().finally(() => {

    });
    loadComment().finally(()=>{

    });

    AppTracking.logCustomEvent("view_post", {
      post_id: String(postID),
    });

    return () => {
      const screenEndTime = new Date();
      const totalOnScreenTime = screenEndTime.getTime() - screenStartTime.getTime();

      AppTracking.logCustomEvent("view_post_time", {
        post_id: String(postID),
        duration_millisecond: totalOnScreenTime,
      });
    };
  }, [])

  async function comment(post_uuid: string, content: string) {
    const now = new Date();
    const fakeId = now.getTime();

    const newComment: CommentModel = {
      id: fakeId,
      user_id: user?.id,
      content: userComment,
      upvote: 0,
      downvote: 0,
      user: user,
      total_replies:0,
      type:'comment'
    }

    setListComment(prev => {
      return [
        newComment,
        ...prev,
      ]
    })

    try {
      const res = await postComment(post_uuid, content);

      if (ApiHelper.isResSuccess(res)) {
        const dataSuccess = res.data.data;
        setListComment(prev => {
          const newList = [...prev].filter((cmt) => {
            return cmt.id !== fakeId;
          });
          return [
            dataSuccess,
            ...newList
          ]
        })
        await loadPostDetail()
      } else {
        showToastErrorMessage(res?.data.message)
        setListComment(prev => {
          return prev.filter((item) => {
            return item.id !== now.getTime()
          })
        })
      }
    } catch (e) {
      setError(e);
      setListComment(prev => {
        return prev.filter((item) => {
          return item.id !== now.getTime()
        })
      })
    }
  }

  async function reply(post_uuid: string, comment_id:number ,content: string) {
    try {
      const res = await postReply(post_uuid,comment_id ,content);
      if (ApiHelper.isResSuccess(res)) {
        await loadPostDetail()
      } else {
        showToastErrorMessage(res?.data.message)
      }
    } catch (e) {
      setError(e);
    }
  }

  async function save(post_id: number, action: string) {
    try {
      const res = await savePost(post_id, action);
      if (ApiHelper.isResSuccess(res)) {
        showToastMsg(res?.data?.message)
        await loadPostDetail();
      } else {
        showToastErrorMessage(res.data.message);
      }
    } catch (e) {
      setError(e);
    } finally {
    }
  }

  useEffect(() => {
    const channel = AppPusher.subscribe(`post.${postID}`).bind(
      "App\\Events\\CommentAndReply",
      async (pusher: PusherCommment)=>{
        const { data , user } = pusher;
        if (data){
          if (user.user_uuid !== authData?.user?.user_uuid){
            if (data.type === 'comment'){
              const newComment : CommentModel = {
                id: data.comment_id,
                user_id: user?.id ,
                content: data.content,
                upvote: 0,
                downvote: 0,
                user: user,
                time: data.time,
                total_replies:0,
                type:data.type
              }
              setListComment(prev=>{
                return[
                  newComment,
                  ...prev,
                ]
              })
              setTotalComment(data?.total_comments);
              await loadPostDetail();
            }
            if (data.type === 'reply'){
              setTotalComment(data?.total_comments);
            }
          }
        }
      }
    );

    channel.reinstateSubscription();

    return () => {
      channel.cancelSubscription();
    };
  }, []);


  function handleBackButtonClick() {
    NavigationRef?.current?.goBack();
    // call when go back
    onUpdatePost(postDetail);
    AppPusher.unsubscribe(`post.${postID}`)
    return true;
  }

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
    };
  }, [postDetail]);


  return (
    <>
      <KeyboardAvoidingView
        style={{
          justifyContent: "center",
          flex: 1,
        }}
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS == "ios" ? 0 : 0}
      >
        <SafeAreaView
          style={[AppStyles.container, { backgroundColor: colorPallet.color_background_1 }]}>
          <StatusBar
            barStyle={theme === 'light' ? "dark-content" : "light-content"}
            backgroundColor={AppColors.color_transparent}
          />
          <AppBar
            title={language?.detailScreen}
            leftIcon={IC_ARROWLEFT}
            leftIconOnClick={handleBackButtonClick}
            titleStyle={{
              color: colorPallet.color_text_blue_1
            }}
            containerStyle={{
              borderBottomColor: colorPallet.color_divider_3
            }}
          />

          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={isLoading}
                onRefresh={loadPostDetail} />
            }
            style={{
              flex: 1,
            }}
            ref={scrollViewRef}
          >
            {/*Status*/}
            <StatusItem2
              key={postDetail?.id}
              post={postDetail}
              onPressImage={() => {
                NavigationRef.current?.navigate("DetailImage", {
                  img_url: postDetail?.image,
                  thumbnail: postDetail?.thumbnail,
                })
              }}
              onPressComment={() => {
                refInput?.current?.focus();
              }}
              onPressSave={() => {
                setOpen(true);
                setISSaved(postDetail?.isSaved || false);
              }}
              total_comment={totalComment}
            />

            {/*Comment*/}
            {
              listComment?.length
                ? listComment.map((comment) => {
                  return <CommentItem
                      key = {comment.id}
                      comment={comment}
                      type={"success"}
                      replyCommentID={commentID}
                      onPressReply={()=>{
                        setCommentID(comment?.id);
                        setUserName(comment?.user?.name||'');
                        refInput?.current?.focus();
                      }}
                      postUUID={postDetail?.post_uuid}
                    />
                })
                :
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <AppText
                    fontType={'semiBold'}
                    style={{
                      fontSize: fontSize18,
                      color: colorPallet.color_text_gray_3
                    }}
                  >
                    Chưa có bình luận nào
                  </AppText>
                </View>

            }

          </ScrollView>
          <AppInput
            onPressSend={async () => {
              setUserComment('');
              if (commentID){
                await reply(postDetail?.post_uuid || '', commentID,userComment)
              }else {
                await comment(postDetail?.post_uuid || '', userComment);
              }
              Keyboard.dismiss();
            }}
            onChangeText={
            (text) => {
              setUserComment(text);
              if (text.length){
                setValid(true);
              }else {
                setValid(false);
              }

            }
          }
            value={userComment}
            disable={!valid}
            userName={userName}
            onPressCancel={()=>{
              setUserName('')
              setCommentID(0)
            }}
          />

        </SafeAreaView>
        {
          isLoading ? <AppLoading isOverlay /> : null
        }

        {
          isOpen ?
            <PopUp
              mess={saved ? 'Bạn có muốn bỏ lưu bài viết này?' : 'Bạn có muốn lưu bài viết này?'}
              rightButtonTitle={'Đồng ý'}
              rightButtonPress={async () => {
                if (saved) {
                  setOpen(false);
                  await save(postDetail?.id || 0, 'unsave');
                } else {
                  setOpen(false);
                  await save(postDetail?.id || 0, 'save');
                }

              }}
              leftButtonTitle={'Từ chối'}
              leftButtonPress={() => {
                setOpen(false);
              }}
            />
            : null
        }
      </KeyboardAvoidingView>

    </>
  )
};

export default DetailPostScreen;


