import React, { useCallback, useEffect, useRef, useState } from "react";
import { Alert, FlatList, ListRenderItem, RefreshControl, View } from "react-native";
import { useTheme } from "../../../hooks/useTheme";
import { useLanguage } from "../../../hooks/useLanguage";
import { unit20, } from "../../../utils/appUnit";
import BottomSheet, {
  BottomSheetFlatList,
} from "@gorhom/bottom-sheet";
import useScreenState from "../../../hooks/useScreenState";
import { PostModel } from "../../../model/ApiModel/PostModel";
import { FIRST_PAGE, getUserPosts, UserPostType } from "../../../network/AppAPI";
import ApiHelper from "../../../utils/ApiHelper";
import { useFocusEffect } from "@react-navigation/native";
import UserPostItem from "../../../components/UserPostItem/UserPostItem";
import {NavigationRef} from "../../../../App";

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

  return (
    <>
      <View
        style={{
          backgroundColor: colorPallet.color_background_1,
          flex: 1,
          //marginTop: unit20,
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
              onPress={()=>{
                if (type === 'saved' || type === 'approved'){
                  NavigationRef.current?.navigate("DetailPostScreen",{
                    postID: item?.post_uuid,
                    onUpdatePost:()=>{}
                  })
                }
              }}
            />
          }}
          numColumns={3}
        />

      </View>

    </>
  );
};

export default BaseProfileTab;
