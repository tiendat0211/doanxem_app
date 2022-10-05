import React, { useEffect, useRef, useState } from "react";
import { Alert, FlatList, ListRenderItem, RefreshControl, View } from "react-native";
import AppColors from "../../../styles/AppColors";
import { useTheme } from "../../../hooks/useTheme";
import { useLanguage } from "../../../hooks/useLanguage";
import PressView from "../../../components/PressView/PressView";
import { unit1, unit10, unit12, unit16, unit17, unit20, unit24, unit400 } from "../../../utils/appUnit";
import { NavigationRef } from "../../../../App";
import { IC_BLOCKUSER, IC_DOWNLOAD, IC_HIDE, IC_WARNING } from "../../../assets/path";
import AppText from "../../../components/AppText/AppText";
import { AppFonts, fontSize16 } from "../../../styles/AppFonts";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import SelectItem from "../../../components/SelectItem/SelectItem";
import RNFetchBlob from "rn-fetch-blob";
import useScreenState from "../../../hooks/useScreenState";
import { PostModel } from "../../../model/ApiModel/PostModel";
import StatusItem from "../../../components/StatusItem/StatusItem";
import InfiniteFlatList from "../../../components/InfiniteFlatList/InfiniteFlatList";
import { blockUser, FIRST_PAGE, getListPost, PostType } from "../../../network/AppAPI";
import ApiHelper from "../../../utils/ApiHelper";
import { useFocusEffect } from "@react-navigation/native";
import AppLoading from "../../../components/Loading/AppLoading";
import { showToastErrorMessage, showToastMsg } from "../../../utils/Toaster";
import Snackbar from "react-native-snackbar";
import PopUp from "../../../components/PopUp/PopUp";

interface BaseTabProps {
  type: PostType;
}

const BaseTab: React.FC<BaseTabProps> = (props) => {
  const { colorPallet, theme } = useTheme();
  const { language } = useLanguage();
  const {type} = props;
  const { isLoading, setLoading, mounted, error, setError } = useScreenState();
  const [page, setPage] = useState(1);
  const [canLoadMore, setCanLoadMore] = useState(true);
  const [imgSrc, setImgSrc] = useState('');
  const [pots, setPost] = useState<PostModel[]>([])
  const [blockID, setBlockID] = useState(0)

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

  async function loadPosts(page = FIRST_PAGE) {
    try {
      setLoading(true);
      const res = await getListPost(page,type);

      if (ApiHelper.isResSuccess(res)) {
        const posts = res?.data?.data;
        if (page === FIRST_PAGE) {
          setPost(posts);
        } else {
          setPost(prev => [...prev, ...posts]);
        }
      } else {
        showToastErrorMessage(res.data.message);
      }
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      loadPosts().finally(() => {
      });
    }, []),
  );

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

  // useEffect(() => {
  //   if (loadMore) {
  //     loadMore(page);
  //   }
  // }, [page]);

  return (
    <>
      <View
        style={{
          backgroundColor: colorPallet.color_background_3,
          flex: 1,
          paddingBottom: unit20,
        }}
      >
        {
          isLoading && <AppLoading isOverlay/>
        }
        <FlatList
          style={{
            paddingTop: unit24,
          }}
          showsHorizontalScrollIndicator={false}
          data={pots}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={loadPosts} />
          }
          onEndReached={() => {
            setPage(prev => prev + 1);
          }}
          onEndReachedThreshold={1}
          renderItem={({ item, index }) => {
            return <StatusItem
              key={item.id}
              post={item}
              onPressComment={() => {
                NavigationRef.current?.navigate("DetailStatusScreen",{
                  postID: item?.post_uuid
                });
              }}
              onPressImage={() => {
                NavigationRef.current?.navigate("DetailStatusScreen",{
                  postID: item?.post_uuid
                });
              }}
              openBottomSheet={()=>{
                openBottomSheet();
                setImgSrc(item?.image)
                setBlockID(item?.user?.id)
              }
              }
            />;
          }}
        />

        {/*<InfiniteFlatList*/}
        {/*  getLoadMore={loadMore}*/}
        {/*  getRefresh={refreshData}*/}
        {/*  renderItem={data}*/}
        {/*/>*/}

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
    </>
  );
};

export default BaseTab;
