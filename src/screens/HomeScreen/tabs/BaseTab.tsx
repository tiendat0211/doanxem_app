import React, { useState } from "react";
import { Dimensions, FlatList, Image, SafeAreaView, StatusBar, Text, View } from "react-native";
import AppColors from "../../../styles/AppColors";
import { useTheme } from "../../../hooks/useTheme";
import { useLanguage } from "../../../hooks/useLanguage";
import PressView from "../../../components/PressView/PressView";
import {
  unit1,
  unit10,
  unit100, unit12,
  unit16, unit18,
  unit20,
  unit24,
  unit32,
  unit40,
  unit48,
  unit5,
  unit50,
  unit56, unit8,
} from "../../../utils/appUnit";
import { NavigationRef } from "../../../../App";
import {
  IC_COMMENT,
  IC_CREATE,
  IC_OPTION,
  IC_REACTION, IC_SAVE, IC_SHAREPOST,
  IMG_LOGO,
  IMG_ONBOARDING,
  IMG_POST,
} from "../../../assets/path";
import AppText from "../../../components/AppText/AppText";
import { fontSize12, fontSize16 } from "../../../styles/AppFonts";
import FooterItem from "../../../components/FooterItem/FooterItem";
import StatusItem from "../../../components/StatusItem/StatusItem";
import { StatusModel } from "../../../model/StatusModel";


const FakeData : StatusModel[] = [
  {
    post_id: 1,
    user_img: IMG_LOGO,
    user_name: '_designtoichet_',
    time: '4 giờ trước',
    status_content: '@conzoihuypham I thought, what can we do here that’ll make a impact, so @conzoihuypham I thought, what can we do here that’ll make a impact, so @conzoihuypham I thought, what can we do here that’ll make a impact, so',
    status_img: IMG_POST,
    comment_counts: '2,5k',
    reaction_counts: '1,2k',
  },

  {
    post_id: 1,
    user_img: IMG_LOGO,
    user_name: '_designtoichet_',
    time: '4 giờ trước',
    status_content: '@conzoihuypham I thought, what can we do here that’ll make a impact, so @conzoihuypham I thought, what can we do here that’ll make a impact, so @conzoihuypham I thought, what can we do here that’ll make a impact, so',
    status_img: IMG_ONBOARDING,
    comment_counts: '2,5k',
    reaction_counts: '1,2k',
  }
]

interface BaseTabProps {
  type: string;
}

const BaseTab: React.FC<BaseTabProps> = (props) => {
  const {colorPallet, theme} = useTheme()
  const { language } = useLanguage();
  const [viewMore, setViewMore] = useState(true);


  return(
    <>
      <View
        style={{
          backgroundColor: colorPallet.color_background_3,
          flex: 1,
          paddingVertical: unit24
        }}
      >
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={FakeData}
          renderItem={({ item, index }) => {
            return <StatusItem
              key={item.post_id}
              user_img={item.user_img}
              user_name={item.user_name}
              time={item.time}
              status_content={item.status_content}
              status_img={item.status_img}
              comment_counts={item.comment_counts}
              reaction_counts={item.reaction_counts}
            />
          }}
        />

      </View>
    </>
  );
}

export default BaseTab;
