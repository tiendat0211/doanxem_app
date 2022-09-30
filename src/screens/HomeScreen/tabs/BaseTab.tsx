import React, { useEffect, useRef, useState } from "react";
import { FlatList, RefreshControl, View } from "react-native";
import AppColors from "../../../styles/AppColors";
import { useTheme } from "../../../hooks/useTheme";
import { useLanguage } from "../../../hooks/useLanguage";
import PressView from "../../../components/PressView/PressView";
import { unit1, unit10, unit12, unit16, unit17, unit20, unit24, unit400 } from "../../../utils/appUnit";
import { NavigationRef } from "../../../../App";
import { IC_BLOCKUSER, IC_DOWNLOAD, IC_HIDE, IC_WARNING } from "../../../assets/path";
import AppText from "../../../components/AppText/AppText";
import { AppFonts, fontSize16 } from "../../../styles/AppFonts";
import StatusItem from "../../../components/StatusItem/StatusItem";
import { PostModel } from "../../../model/ApiModel/PostModel";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import SelectItem from "../../../components/SelectItem/SelectItem";
import RNFetchBlob from "rn-fetch-blob";
import useScreenState from "../../../hooks/useScreenState";


interface BaseTabProps {
  data: PostModel[],
  refreshData: () => void,
  loadMore?: (page: number) => void,
}

const BaseTab: React.FC<BaseTabProps> = (props) => {
  const { colorPallet, theme } = useTheme();
  const { language } = useLanguage();
  const { data, refreshData, loadMore } = props;
  const { isLoading, setLoading, mounted, error, setError } = useScreenState();

  const [page, setPage] = useState(1);
  const [canLoadMore, setCanLoadMore] = useState(true);


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

  function downloadImage() {
    let date = new Date();
    let image_URL = "https://d1hjkbq40fs2x4.cloudfront.net/2016-01-31/files/1045.jpg";
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
      });
  }

  useEffect(() => {
    if (loadMore) {
      loadMore(page);
    }
  }, [page]);

  return (
    <>
      <View
        style={{
          backgroundColor: colorPallet.color_background_3,
          flex: 1,
          paddingBottom: unit20,
        }}
      >
        <FlatList
          style={{
            paddingTop: unit24,
          }}
          showsHorizontalScrollIndicator={false}
          data={data}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={refreshData} />
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
                NavigationRef.current?.navigate("DetailStatusScreen");
              }}
              onPressImage={() => {
                NavigationRef.current?.navigate("DetailStatusScreen");
              }}
              openBottomSheet={openBottomSheet}
            />;
          }}
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
            onPress={downloadImage}
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
