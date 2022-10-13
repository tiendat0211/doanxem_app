import React, { useEffect, useRef, useState } from "react";
import {
  Alert, Dimensions, FlatList,
  Keyboard, KeyboardAvoidingView, Platform,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  ScrollViewProps,
  StatusBar,
  TextInput,
  View,
} from "react-native";
import AppStyles from "../../styles/AppStyles";
import useAuth from "../../hooks/useAuth";
import AppColors from "../../styles/AppColors";
import { useTheme } from "../../hooks/useTheme";
import {
  IC_ARROWLEFT, IC_BLOCKUSER, IC_DOWNLOAD, IC_HIDE, IC_WARNING,
  IMG_LOGO, IMG_POST,
} from "../../assets/path";
import { useLanguage } from "../../hooks/useLanguage";
import { NavigationRef, RootStackParamList } from "../../../App";
import AppBar from "../../components/AppBar/AppBar";
import { PostModel } from "../../model/ApiModel/PostModel";
import CommentItem from "../../components/CommentItem/CommentItem";
import AppInput from "../../components/AppInput/AppInput";
import { RouteProp, useRoute } from "@react-navigation/native";
import { getPostDetail, postComment, savePost } from "../../network/AppAPI";
import ApiHelper from "../../utils/ApiHelper";
import useScreenState from "../../hooks/useScreenState";
import StatusItem2 from "../../components/StatusItem/StatusItem2";
import AppLoading from "../../components/Loading/AppLoading";
import { CommentModel } from "../../model/ApiModel/CommentModel";
import EmptyView from "../../components/EmptyView/EmptyView";
import EmptyViewForList from "../../components/EmptyViewForList/EmptyViewForList";
import AppText from "../../components/AppText/AppText";
import { fontSize18, fontSize20 } from "../../styles/AppFonts";
import { showToastErrorMessage, showToastMsg } from "../../utils/Toaster";
import PopUp from "../../components/PopUp/PopUp";
import Snackbar from "react-native-snackbar";
import { unit20 } from "../../utils/appUnit";


type DetailStatusScreenProps = RouteProp<RootStackParamList, "DetailPostScreen">;

const DetailPostScreen: React.FC = () => {
  const { postID } = useRoute<DetailStatusScreenProps>().params;
  const { colorPallet, theme } = useTheme()
  const { language } = useLanguage();
  const [listComment, seListComment] = useState<CommentModel[]>([]);
  const [userComment, setUserComment] = useState('');
  const { isLoading, setLoading, error, setError, mounted } = useScreenState();
  const [postDetail, setPostDetail] = useState<PostModel>();
  const scrollViewRef = useRef<ScrollView>(null);
  const [isOpen, setOpen] = useState(false);
  const [isSaved, setSaved] = useState(false);


  async function loadPostDetail(post_uuid = postID) {
    try {
      setLoading(true)
      const res = await getPostDetail(post_uuid);
      if (ApiHelper.isResSuccess(res)) {
        setPostDetail(res?.data?.data);
        seListComment(res?.data?.data?.comments)
      }
      setError(undefined);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false)
    }
  }

  async function loadPostDetail2(post_uuid = postID) {
    try {
      const res = await getPostDetail(post_uuid);
      if (ApiHelper.isResSuccess(res)) {
        setPostDetail(res?.data?.data);
        seListComment(res?.data?.data?.comments)
      }
      setError(undefined);
    } catch (e) {
      setError(e);
    } finally {
    }
  }

  useEffect(() => {
    loadPostDetail().finally(() => {

    });
  }, [])

  async function comment(post_uuid: string, content: string) {
    try {
      const res = await postComment(post_uuid, content);
      if (ApiHelper.isResSuccess(res)) {
        await loadPostDetail2(post_uuid)
      } else {
        showToastErrorMessage(res?.data.message)
      }
    } catch (e) {
      setError(e);
    } finally {
    }
  }

  async function save(post_id: number, action: string) {
    try {
      const res = await savePost(post_id, action);
      if (ApiHelper.isResSuccess(res)) {
        showToastMsg(res?.data?.message)
        await loadPostDetail2();
      } else {
        showToastErrorMessage(res.data.message);
      }
    } catch (e) {
      setError(e);
    } finally {
    }
  }

  return (
    <>
      <KeyboardAvoidingView
        style={{
          justifyContent: "center",
          flex: 1,
        }}
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        keyboardVerticalOffset={ Platform.OS == "ios" ? 0 :150}

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
            leftIconOnClick={() => {
              NavigationRef.current?.goBack()
            }}
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
                  img_url: postDetail?.image || ''
                })
              }}
              onPressComment={() => {
                scrollViewRef.current?.scrollToEnd();
              }}
              onPressSave={() => {
                setOpen(true);
                setSaved(postDetail?.isSaved || false);
              }}
            />

            {/*Comment*/}
            {
              listComment.length
                ? listComment.map((comment) => {
                  return <CommentItem
                    key={comment.id}
                    comment={comment}
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
              await comment(postDetail?.post_uuid || '', userComment);
              scrollViewRef.current?.scrollToEnd();
              Keyboard.dismiss();
            }}
            onChangeText={(text) => setUserComment(text)}
            value={userComment}
          />



        </SafeAreaView>
        {
          isLoading ? <AppLoading isOverlay /> : null
        }

        {
          isOpen ?
            <PopUp
              mess={isSaved ? 'Bạn có muốn bỏ lưu bài viết này?' : 'Bạn có muốn lưu bài viết này?'}
              rightButtonTitle={'Đồng ý'}
              rightButtonPress={async () => {
                if (isSaved) {
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


