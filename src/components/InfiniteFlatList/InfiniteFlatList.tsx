import React, { useEffect, useState } from "react";
import { FlatList, FlatListProps, ListRenderItem, RefreshControl, StyleSheet, Text } from "react-native";
import { LOADING_ANIM } from "../../assets/path";
import LottieView from "lottie-react-native";
import { ErrorHandler } from "../../utils/ErrorHandler";
import { unit100 } from "../../utils/appUnit";

interface InfiniteFlatListProps<ItemType> extends Partial<FlatListProps<ItemType>> {
  getLoadMore: (page: number) => Promise<ItemType[]>,
  /**
   * default is 0
   * */
  start?: number,
  getRefresh: () => Promise<ItemType[]>,
  renderItem: ListRenderItem<ItemType> | null | undefined,
}

const DEFAULT_FIRST_PAGE = 0;

export default function InfiniteFlatList<ItemType>(props: InfiniteFlatListProps<ItemType>) {
  let { renderItem, getLoadMore, start, getRefresh } = props;

  // default props
  start = start || DEFAULT_FIRST_PAGE;

  const [page, setPage] = useState(start);
  const [isRefresh, setRefresh] = useState(false);
  const [isLoadMore, setLoadMore] = useState(false);
  const [isHasMore, setHasMore] = useState(true);
  const [listData, setListData] = useState<ItemType[]>([]);

  function renderFooterView() {
    if (!isHasMore) {
      return <Text>Không còn dữ liệu</Text>;
    }

    if (!isLoadMore) {
      return <Text>Kéo để load thêm</Text>;
    }

    return <LottieView
      style={styles.loadingView}
      source={LOADING_ANIM}
      autoPlay
      loop
    />;
  }

  const onLoadMore = async () => {
    setLoadMore(true);
    try {
      const moreData = await getLoadMore(page + 1) || [];
      if (!moreData) {
        // false or no more data
        setHasMore(false);
      } else {
        setListData((prevList) => {
          return [...prevList, ...moreData];
        });
        setPage((prev) => {
          return prev + 1;
        });
      }
    } catch (e) {
      ErrorHandler.showError(e);
    } finally {
      setLoadMore(false);
    }
  };

  const onRefresh = async () => {
    setRefresh(true);

    setPage(start || DEFAULT_FIRST_PAGE);
    try {
      const refreshData = await getRefresh() || [];
      setListData(refreshData);
    } catch (e) {
      ErrorHandler.showError(e);
    } finally {
      setRefresh(false);
    }
  };

  useEffect(() => {
    onRefresh().finally(() => {
      console.log("Initiated first page");
    });
  }, []);

  return <FlatList
    {...props}
    maxToRenderPerBatch={10}
    ListFooterComponent={renderFooterView()}
    data={listData}
    renderItem={renderItem}
    onEndReachedThreshold={0.9}
    refreshControl={
      <RefreshControl
        refreshing={isRefresh}
        onRefresh={onRefresh} />
    }
    onEndReached={onLoadMore}
  />;
}


const styles = StyleSheet.create({
  loadingView: {
    height: unit100,
    alignSelf: "center",
  },
});
