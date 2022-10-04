import React, { useEffect, useRef, useState } from "react";
import { Alert, SafeAreaView, ScrollView, StatusBar, TextInput, View } from "react-native";
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
import StatusItem from "../../components/StatusItem/StatusItem";
import AppText from "../../components/AppText/AppText";
import { CommentModle } from "../../model/CommentModle";
import CommentItem from "../../components/CommentItem/CommentItem";
import { unit1, unit10, unit12, unit14, unit16, unit17, unit20, unit400 } from "../../utils/appUnit";
import AppInput from "../../components/AppInput/AppInput";
import { RouteProp, useRoute } from "@react-navigation/native";
import {getPostDetail } from "../../network/AppAPI";
import ApiHelper from "../../utils/ApiHelper";
import useScreenState from "../../hooks/useScreenState";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import SelectItem from "../../components/SelectItem/SelectItem";
import { AppFonts, fontSize16 } from "../../styles/AppFonts";
import PressView from "../../components/PressView/PressView";
import RNFetchBlob from "rn-fetch-blob";
import StatusItem2 from "../../components/StatusItem/StatusItem2";

const FakeComment: CommentModle[] = [
  {
    id: 1,
    user_name: 'Prodev198x',
    user_img: IMG_LOGO,
    comment_title: 'Yo bro, WTF are you thinking ?',
    time:'4 giờ trước',
  },
  {
    id: 2,
    user_name: 'Prodev198x',
    user_img: IMG_LOGO,
    comment_title: 'Ảo Tưởng à ??? Thằng em tao 96 học cơ khí bách khóa giờ sang làm design sấp mặt tháng kiếm 4 5 nghìn đô rồi',
    time:'4 giờ trước',
  },
  {
    id: 3,
    user_name: 'Prodev198x',
    user_img: IMG_LOGO,
    comment_title: '4 5 nghìn cái cục cứt, design bên tao mới ra trường đã đc 7 8 nghìn 1 tháng r',
    time:'4 giờ trước',
  },
  {
    id: 4,
    user_name: 'Marketingtoituhomqua',
    user_img: IMG_LOGO,
    comment_title: 'Chắc làm dev là lương cao nhất rồi',
    time:'4 giờ trước',
  },
  {
    id: 5,
    user_name: 'Codetoigia',
    user_img: IMG_LOGO,
    comment_title: 'Ảo Tưởng à ??? Thằng em tao 96 học cơ khí bách khóa giờ sang làm design sấp mặt tháng kiếm 4 5 nghìn đô rồi',
    time:'4 giờ trước',
  },

]

type DetailStatusScreenProps = RouteProp<RootStackParamList, "DetailStatusScreen">;

const DetailStatusScreen: React.FC = () => {
  const { postID } = useRoute<DetailStatusScreenProps>().params;
  const {colorPallet, theme } = useTheme()
  const { language } = useLanguage();
  const [listComment, seListComment] = useState<CommentModle[]>(FakeComment)
  const [viewMore, setViewMore] = useState(false)
  const [userComment, setUserComment] = useState('')
  const { isLoading, setLoading, error, setError, mounted } = useScreenState();
  const [postDetail, setPostDetail] = useState<PostModel>()

  const bottomSheetRef = useRef<BottomSheet>(null);

  function openBottomSheet() {
    bottomSheetRef.current?.snapToIndex(0);
  }

  function closeBottomSheet() {
    bottomSheetRef.current?.close();
  }

  const getExtension = (filename: any) => {
    // To get the file extension
    return /[.]/.exec(filename) ?
      /[^.]+$/.exec(filename) : undefined;
  };

  function downloadImage(img_link: string | undefined) {
    let date = new Date();
    let image_URL = img_link;
    let ext: any = getExtension(image_URL);
    ext = "." + ext[0];
    const { config, fs } = RNFetchBlob;
    let PictureDir = fs?.dirs?.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        // Related to the Android only
        useDownloadManager: true,
        notification: true,
        path:
          PictureDir +
          "/image_" +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          ext,
        description: "Image",
      },
    };
    config(options)
      .fetch("GET", image_URL? image_URL : '' )
      .then((res: any) => {
        // Showing alert after successful downloading
        console.log("res -> ", JSON.stringify(res));
        Alert.alert('Thông báo', res? 'Lưu ảnh thành công' : 'Lưu ảnh thất bại',)
      });
  }

  async function loadPostDetail(post_uuid = postID) {
    try {
      const res = await getPostDetail(post_uuid);
      if (ApiHelper.isResSuccess(res)) {
        setPostDetail(res?.data?.data);
      }
      setError(undefined);
    } catch (e) {
      setError(e);
    } finally {

    }
  }

  useEffect(()=>{
    loadPostDetail().finally(()=>{

    });
  },[])

  return (
    <SafeAreaView
      style={[AppStyles.container,{backgroundColor: colorPallet.color_background_1}]}>
      <StatusBar
        barStyle={ theme === 'light' ? "dark-content" : "light-content"}
        backgroundColor={AppColors.color_transparent}
      />
      <AppBar
        title={language?.detailScreen}
        leftIcon={IC_ARROWLEFT}
        leftIconOnClick={()=>{
          NavigationRef.current?.goBack()
        }}
        titleStyle={{
          color: colorPallet.color_text_blue_1
        }}
        containerStyle={{
          borderBottomColor:colorPallet.color_divider_3
        }}
      />

      <ScrollView
        style={{
          flex:1,
        }}
      >
        {/*Status*/}
        <StatusItem2
          key={postDetail?.id}
          post={postDetail}
        />

      {/*Comment*/}
        {
          listComment.map((item) => {
            return <CommentItem
              key={item.id}
              id={item.id}
              user_img={item.user_img}
              comment_title={item.comment_title}
              time={item.time}
              user_name={item.user_name}
            />
          })
        }
      </ScrollView>

      <AppInput
        onPressSend={() => {}}
        onChangeText={ (text) => setUserComment(text) }
        value={userComment}
      />


    </SafeAreaView>
  )
};

export default DetailStatusScreen;


