import React, { useRef, useState } from "react";
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
  unit24, unit300,
  unit32,
  unit40, unit400,
  unit48,
  unit5,
  unit50, unit500,
  unit56, unit8,
} from "../../../utils/appUnit";
import { NavigationRef } from "../../../../App";
import {
  IC_COMMENT,
  IC_CREATE, IC_DOWNLOAD,
  IC_OPTION,
  IC_REACTION, IC_SAVE, IC_SHAREPOST,
  IMG_LOGO,
  IMG_ONBOARDING,
  IMG_POST,
} from "../../../assets/path";
import AppText from "../../../components/AppText/AppText";
import { AppFonts, fontSize12, fontSize16 } from "../../../styles/AppFonts";
import FooterItem from "../../../components/FooterItem/FooterItem";
import StatusItem from "../../../components/StatusItem/StatusItem";
import { StatusModel } from "../../../model/StatusModel";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import SelectItem from "../../../components/SelectItem/SelectItem";


interface BaseTabProps {
  data: StatusModel[],
  fetchContent?: () => void,
}

const BaseTab: React.FC<BaseTabProps> = (props) => {
  const {colorPallet, theme} = useTheme()
  const { language } = useLanguage();
  const [viewMore, setViewMore] = useState(true);

  const {data, fetchContent} = props


  return(
    <>
      <View
        style={{
          backgroundColor: colorPallet.color_background_3,
          flex: 1,
          paddingBottom: unit20
        }}
      >
        <FlatList
          style={{
            paddingTop: unit24,
          }}
          showsHorizontalScrollIndicator={false}
          data={data}
          onRefresh={fetchContent}
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
              onPressComment={() =>{
                NavigationRef.current?.navigate('DetailStatusScreen')
              }}
              onPressImage={() =>{
                NavigationRef.current?.navigate('DetailStatusScreen')
              }}
            />
          }}
        />
      </View>
    </>
  );
}

export default BaseTab;
