import React, { useCallback, useEffect, useRef, useState } from "react";
import { Alert, FlatList, ListRenderItem, RefreshControl, View } from "react-native";
import AppColors from "../../../styles/AppColors";
import { useTheme } from "../../../hooks/useTheme";
import { useLanguage } from "../../../hooks/useLanguage";
import PressView from "../../../components/PressView/PressView";
import { unit1, unit10, unit12, unit16, unit17, unit20, unit24, unit400 } from "../../../utils/appUnit";
import { NavigationRef } from "../../../../App";
import { IC_BLOCKUSER, IC_DOWNLOAD, IC_HIDE, IC_WARNING, IMG_LOGO, IMG_POST } from "../../../assets/path";
import AppText from "../../../components/AppText/AppText";
import { AppFonts, fontSize16 } from "../../../styles/AppFonts";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetVirtualizedList,
} from "@gorhom/bottom-sheet";
import SelectItem from "../../../components/SelectItem/SelectItem";
import RNFetchBlob from "rn-fetch-blob";
import useScreenState from "../../../hooks/useScreenState";
import { PostModel } from "../../../model/ApiModel/PostModel";
import StatusItem from "../../../components/StatusItem/StatusItem";
import { FIRST_PAGE, getUserPosts, UserPostType } from "../../../network/AppAPI";
import ApiHelper from "../../../utils/ApiHelper";
import { useFocusEffect } from "@react-navigation/native";
import UserPostItem from "../../../components/UserPostItem/UserPostItem";

interface BaseProfileTabProps {
  type: UserPostType;
}

const BaseProfileTab: React.FC<BaseProfileTabProps> = (props) => {
  const { colorPallet, theme } = useTheme();
  const { language } = useLanguage();
  const {type} = props;
  const { isLoading, setLoading, mounted, error, setError } = useScreenState();
  const [userPosts, setUserPosts] = useState<PostModel[]>([])

  async function loadUserPosts() {
    try {
      const res = await getUserPosts(type);
      if (ApiHelper.isResSuccess(res)) {
        const posts = res?.data?.data;
        setUserPosts(posts)
      }
      setError(undefined);
    } catch (e) {
      setError(e);
    } finally {

    }
  }

  useFocusEffect(
    React.useCallback(() => {
      loadUserPosts().finally(() => {
      });
    }, []),
  );
  // render
  const renderItem = useCallback(
    ({ item, index }) => (
      <View
        style={{
          flexDirection:'row'
        }}
      >
        <UserPostItem
          key={item.id}
          post={item}
        />
      </View>

    ),
    []
  );


  return (
    <>
      <View
        style={{
          backgroundColor: colorPallet.color_background_1,
          flex: 1,
          paddingTop: unit20,
          paddingHorizontal: unit20
        }}
      >
        <BottomSheetFlatList
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={loadUserPosts} />
          }
          data={userPosts}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) =>{
            return <UserPostItem
              key={item.id}
              post={item}
            />
          }}
          numColumns={3}
        />

      </View>

    </>
  );
};

export default BaseProfileTab;
