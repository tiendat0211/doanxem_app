import React, { useEffect, useState } from "react";
import { Button, FlatList, Image, Platform, SafeAreaView, ScrollView, StatusBar, Text, View } from "react-native";
import AppStyles from "../../styles/AppStyles";
import AppColors from "../../styles/AppColors";
import { useTheme } from "../../hooks/useTheme";
import {
  unit0,
  unit1,
  unit100,
  unit12, unit13, unit16,
  unit20,
  unit200,
  unit24,
  unit30,
  unit32, unit6,
  unit60,
  unit75, unit8,
} from "../../utils/appUnit";
import {
  IC_ARROWLEFT,
  IC_CHECK2,
  IC_DRAWER,
  IC_FILTER,
  IC_FILTERCHECK,
  IC_GAME,
  IC_NEW, IC_QUESTION, IC_STYLE,
  IC_SWORD,
} from "../../assets/path";
import AppText from "../../components/AppText/AppText";
import { useLanguage } from "../../hooks/useLanguage";
import { fontSize14, fontSize16, fontSize20 } from "../../styles/AppFonts";
import PressView from "../../components/PressView/PressView";
import { NavigationRef } from "../../../App";
import AppBar from "../../components/AppBar/AppBar";

const FakeData = [
  {
    id: 0,
    title: 'Game',
    img_src: IC_GAME
  },
  {
    id: 1,
    title: 'Tin tức',
    img_src: IC_NEW
  },
  {
    id: 2,
    title: 'NSFW 18+',
    img_src: IC_SWORD
  },
  {
    id: 3,
    title: 'Tư vấn & Hỏi đáp',
    img_src: IC_QUESTION
  },
  {
    id: 4,
    title: 'Phong cách',
    img_src: IC_STYLE
  }
]

const FilterScreen: React.FC = () => {
  const {colorPallet, theme} = useTheme()
  const { language } = useLanguage();

  const [checkedGrade,setCheckedGrade] = useState(
    new Array(FakeData.length).fill(false)
  )

  const handleGrade = (position:any) => {
    const updatedCheckedState = checkedGrade.map((item, index) =>
      index === position ? !item : item,
    );

    setCheckedGrade(updatedCheckedState);
  }

  return (
    <SafeAreaView
      style={[AppStyles.container,{backgroundColor: colorPallet.color_background_1}]}>
      <StatusBar
        barStyle={ theme === 'light' ? "dark-content" : "light-content"}
        backgroundColor={AppColors.color_transparent}
      />
      <AppBar
        title={language?.filter}
        leftIcon={IC_ARROWLEFT}
        leftIconOnClick={()=>{
          NavigationRef.current?.goBack()
        }}
        titleStyle={{
          color: colorPallet.color_text_blue_1
        }}
        containerStyle={{
          borderBottomColor:colorPallet.color_divider_3
        }}
        rightIcon={IC_FILTERCHECK}
        rightIconOnClick={
          () => setCheckedGrade(Array(FakeData.length).fill(true))
        }
      />


      <FlatList
        style={{
          flexGrow: 0,
          marginHorizontal: unit20,
        }}
        showsHorizontalScrollIndicator={false}
        data={FakeData}
        renderItem={({item, index}) => {
          return <PressView
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
            onPress={() =>{
             handleGrade(index);
            }}
          >
            <Image
              source={item.img_src}
              style={{
                width: unit24,
                height: unit24,
                marginRight: unit16
              }}
            />
            <AppText
              style={{
                fontSize: fontSize16,
                color: colorPallet.color_text_blue_3,
                marginVertical:unit13,
                flexGrow:1
              }}
            >
              {item.title}
            </AppText>

            <Image
              source={IC_CHECK2}
              style={{
                width: unit24,
                height: unit24,
                tintColor: checkedGrade[index] === true ? AppColors.color_primary : colorPallet.color_text_gray_3,
              }}
            />
          </PressView>
        }}
      />
    </SafeAreaView>
  )
};

export default FilterScreen;


