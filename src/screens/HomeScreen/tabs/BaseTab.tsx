import React, { useEffect, useRef, useState } from "react";
import { Alert, Animated, ListRenderItem, RefreshControl, Text, View, Image } from "react-native";
import AppColors from "../../../styles/AppColors";
import { useTheme } from "../../../hooks/useTheme";
import { useLanguage } from "../../../hooks/useLanguage";
import PressView from "../../../components/PressView/PressView";
import {
  unit1,
  unit10,
  unit100,
  unit12,
  unit16,
  unit17,
  unit20,
  unit24,
  unit400,
  unit50, unit60,
} from "../../../utils/appUnit";
import { NavigationRef } from "../../../../App";
import { IC_BLOCKUSER, IC_DOWNLOAD, IC_HIDE, IC_WARNING, LOADING_ANIM } from "../../../assets/path";
import AppText from "../../../components/AppText/AppText";
import { AppFonts, fontSize16 } from "../../../styles/AppFonts";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import SelectItem from "../../../components/SelectItem/SelectItem";
import RNFetchBlob from "rn-fetch-blob";
import useScreenState from "../../../hooks/useScreenState";
import { PostModel } from "../../../model/ApiModel/PostModel";
import StatusItem from "../../../components/StatusItem/StatusItem";
import { blockUser, FIRST_PAGE, getListPost, PostType } from "../../../network/AppAPI";
import ApiHelper from "../../../utils/ApiHelper";
import { showToastErrorMessage, showToastMsg } from "../../../utils/Toaster";
import Snackbar from "react-native-snackbar";
import LottieView from "lottie-react-native";
import { BidirectionalFlatList } from "../../../components/InfiniteFlatList/BidirectionalFlatList";

interface BaseTabProps {
  type: PostType;
}


const BaseTab: React.FC<BaseTabProps> = (props) => {
  const { colorPallet, theme } = useTheme();
  const { language } = useLanguage();
  const {type} = props;
  const { isLoading, setLoading, mounted, error, setError } = useScreenState();
  const [page, setPage] = useState(FIRST_PAGE);
  const [imgSrc, setImgSrc] = useState('');
  const [posts, setPosts] = useState<PostModel[]>([])
  const [blockID, setBlockID] = useState(0)
  const [isHasMore, setHasMore] = useState(true);
  const [postID, setPostID] = useState(true);

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

  function downloadImage(img_link: string) {
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
      .fetch("GET", image_URL)
      .then((res: any) => {
        // Showing alert after successful downloading
        console.log("res -> ", JSON.stringify(res));
        Snackbar.show({
          text: `Tải xuống thành công`,
          duration: Snackbar.LENGTH_SHORT,
        });
      });
  }

  async function loadPosts() {
    try {
      setLoading(true);
      setPage(FIRST_PAGE);
      const res = await getListPost(FIRST_PAGE,type);
      if (ApiHelper.isResSuccess(res)) {
        const data = res?.data?.data;
        setPosts(data)
      } else {
        showToastErrorMessage(res.data.message);
      }
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }

  async function loadMore() {
    try {
      const res = await getListPost(page +1, type) || [];
      if (ApiHelper.isResSuccess(res)) {
        const moreData = res?.data?.data;
        if (!moreData) {
          // false or no more data
          setHasMore(false);
        } else {
          setPosts((prevList) => {
            return [...prevList, ...moreData];
          });
          setPage(page+1);
          console.log(page)
        }
      } else {
        showToastErrorMessage(res.data.message);
      }
    } catch (e) {
      setError(e);
    } finally {
    }
  }

  useEffect(() =>{
    loadPosts().finally(()=>{})
    },[]);

  async function blockUserByID( id: number) {
    try {
      const res = await blockUser(id);

      if (ApiHelper.isResSuccess(res)) {
        Snackbar.show({
          text: `Chặn người dùng thành công`,
          duration: Snackbar.LENGTH_SHORT,
        });
      } else {
        showToastErrorMessage(res.data.message);
      }
    } catch (e) {
      setError(e);
    } finally {
    }
  }

  function renderFooterView() {
    if (!isHasMore) {
      return <Text>Không còn dữ liệu</Text>;
    }

    return <LottieView
      style={{
        height: unit60,
        alignSelf: "center",
      }}
      source={LOADING_ANIM}
      autoPlay
      loop
    />;
  }


  return (
    <>
      <View
        style={{
          backgroundColor: colorPallet.color_background_3,
          flex: 1,
        }}
      >
        <BidirectionalFlatList
          style={{
            paddingTop: unit24,
          }}
          data={posts}
          keyExtractor={(item, index) => String(item.id + "index" + index)}
          onEndReached={async () => {
             await loadMore()
          }}
          FooterLoadingIndicator={renderFooterView}
          onEndReachedThreshold={0.5}
          renderItem={({ item, index }) => {
            return <StatusItem
              key={index}
              post={item}
              onPressComment={() => {
                NavigationRef.current?.navigate("DetailPostScreen",{
                  postID: item?.post_uuid
                });
              }}
              onPressImage={() => {
                NavigationRef.current?.navigate("DetailPostScreen",{
                  postID: item?.post_uuid
                });
              }}
              openBottomSheet={()=>{
                openBottomSheet();
                setImgSrc(item?.image)
                setBlockID(item?.user?.id)
              }}
            />;
          }}
          onStartReached={async ()=>{}}
          refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={loadPosts}
          />
        }
          />

      </View>

      {/* BottomSheet */}
      <BottomSheet
        backgroundStyle={{
          backgroundColor: colorPallet.color_background_3,
        }}
        handleIndicatorStyle={{
          backgroundColor: colorPallet.color_background_3,
        }}
        ref={bottomSheetRef}
        backdropComponent={(props) =>
          <BottomSheetBackdrop
            {...props}
            enableTouchThrough={false}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
            pressBehavior={"close"}
          />
        }
        index={-1}
        snapPoints={[unit400]}>
        <View
          style={{
            backgroundColor: colorPallet.color_background_1,
            borderRadius: unit10,
            marginHorizontal: unit20,
            marginBottom: unit12,
          }}>
          <SelectItem
            title={"Lưu ảnh vào bộ nhớ"}
            rightImageSource={IC_DOWNLOAD}
            rightImageProps={{ tintColor: colorPallet.color_text_blue_3 }}
            appTxtStyle={{
              fontFamily: AppFonts.semiBold,
              fontSize: unit16,
            }}
            onPress={() => {
              downloadImage(imgSrc);
              closeBottomSheet()
            }}
          />
        </View>

        <View
          style={{
            backgroundColor: colorPallet.color_background_1,
            borderRadius: unit10,
            marginHorizontal: unit20,
            marginBottom: unit12,
          }}
        >
          <SelectItem
            title={"Báo cáo bài viết"}
            rightImageSource={IC_WARNING}
            rightImageProps={{ tintColor: colorPallet.color_text_blue_3 }}

            appTxtStyle={{
              fontFamily: AppFonts.semiBold,
              fontSize: unit16,
            }}
          />
        </View>

        <View
          style={{
            backgroundColor: colorPallet.color_background_1,
            borderRadius: unit10,
            marginHorizontal: unit20,
            marginBottom: unit12,
          }}
        >
          <SelectItem
            title={"Chặn người dùng này"}
            rightImageSource={IC_BLOCKUSER}
            rightImageProps={{ tintColor: colorPallet.color_text_blue_3 }}
            appTxtStyle={{
              fontFamily: AppFonts.semiBold,
              fontSize: unit16,
            }}
            onPress={async ()=>{
              await blockUserByID(blockID);
              closeBottomSheet();
              await loadPosts();
            }}
          />
        </View>

        <View
          style={{
            backgroundColor: colorPallet.color_background_1,
            borderRadius: unit10,
            marginHorizontal: unit20,
            marginBottom: unit12,
          }}
        >
          <SelectItem
            title={"Ẩn bài viết này"}
            rightImageSource={IC_HIDE}
            rightImageProps={{ tintColor: colorPallet.color_text_blue_3 }}
            appTxtStyle={{
              fontFamily: AppFonts.semiBold,
              fontSize: unit16,
            }}
          />
        </View>

        <PressView
          onPress={closeBottomSheet}
          style={{
            backgroundColor: colorPallet.color_background_1,
            borderRadius: unit10,
            marginHorizontal: unit20,
            marginBottom: unit12,
            alignItems: "center",
            paddingVertical: unit17,
            borderWidth: unit1,
            borderColor: colorPallet.color_divider_2,
          }}
        >
          <AppText
            fontType={"semiBold"}
            style={{
              fontSize: fontSize16,
              color: AppColors.color_warning,
            }}
          >
            Đóng
          </AppText>
        </PressView>
      </BottomSheet>

      {/*{*/}
      {/*  isLoading && <AppLoading isOverlay/>*/}
      {/*}*/}

    </>
  );
};

export default BaseTab;
