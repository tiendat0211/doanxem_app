import React from "react";
import useAuth from "../../../hooks/useAuth";
import BaseTab from "./BaseTab";
import { StatusModel } from "../../../model/StatusModel";
import { IMG_LOGO, IMG_ONBOARDING, IMG_POST } from "../../../assets/path";

const FakeData : StatusModel[] = [
  {
    post_id: 1,
    user_img: IMG_LOGO,
    user_name: '_designtoichet_',
    time: '4 giờ trước',
    status_content: '@conzoihuypham I thought, what can we do here that’ll make a impact, so @conzoihuypham I thought, what can we do here that’ll make a impact, so @conzoihuypham I thought, what can we do here that’ll make a impact, so',
    status_img: IMG_POST,
    comment_counts: 100,
    reaction_counts: 100,
  },

  {
    post_id: 1,
    user_img: IMG_LOGO,
    user_name: '_designtoichet_',
    time: '4 giờ trước',
    status_content: '@conzoihuypham I thought, what can we do here that’ll make a impact, so @conzoihuypham I thought, what can we do here that’ll make a impact, so @conzoihuypham I thought, what can we do here that’ll make a impact, so',
    status_img: IMG_ONBOARDING,
    comment_counts: 100,
    reaction_counts: 100,
  }
]


const NewTab: React.FC = () => {
  const { authData, signOut } = useAuth();
  const user = authData.user;
  return (
    <>
      <BaseTab
        data={FakeData}
      />
    </>
  )
};

export default NewTab;
