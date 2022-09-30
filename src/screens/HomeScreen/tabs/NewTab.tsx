import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import BaseTab from "./BaseTab";
import { PostModel } from "../../../model/ApiModel/PostModel";
import { FIRST_PAGE, getNewPost } from "../../../network/AppAPI";
import ApiHelper from "../../../utils/ApiHelper";
import useScreenState from "../../../hooks/useScreenState";


const NewTab: React.FC = () => {
  const { authData, signOut } = useAuth();
  const user = authData.user;
  const [newPostData, setNewPostData] = useState<PostModel[]>([]);
  const { isLoading, setLoading, error, setError, mounted } = useScreenState();

  async function loadNewPost(page = FIRST_PAGE) {
    try {
      const res = await getNewPost(page);
      if (ApiHelper.isResSuccess(res)) {
        const posts = res?.data?.data;
        if (page === FIRST_PAGE) {
          setNewPostData(posts);
        } else {
          setNewPostData(prev => [...prev, ...posts]);
        }
      }
      setError(undefined);
    } catch (e) {
      setError(e);
    } finally {

    }
  }

  useEffect(() => {
    // init
    loadNewPost().finally(() => {
    });
  }, []);

  return (
    <>
      <BaseTab
        data={newPostData}
        refreshData={loadNewPost}
        loadMore={async (page) => {
          await loadNewPost(page);
        }}
      />
    </>
  );
};

export default NewTab;
