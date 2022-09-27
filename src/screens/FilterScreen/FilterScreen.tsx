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
import { IC_ARROWLEFT, IC_CHECK, IC_DRAWER, IC_FILTER, IC_FILTERCHECK, IC_GAME } from "../../assets/path";
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
    title: 'Game',
    img_src: IC_GAME
  },
  {
    id: 2,
    title: 'Game',
    img_src: IC_GAME
  },
  {
    id: 3,
    title: 'Game',
    img_src: IC_GAME
  },
  {
    id: 4,
    title: 'Game',
    img_src: IC_GAME
  }
]

const FilterScreen: React.FC = () => {
  const {colorPallet} = useTheme()
  const language = useLanguage();
  const [listItem, setListItem]  = useState<number[]>([]);
  const [checkAll, setCheckAll] = useState(false)

  // const allCheck = () =>{
  //   if (checkAll == false){
  //     FakeData.forEach( (value) => {
  //       return listItem?.push(value.id);
  //     })
  //     setListItem(listItem);
  //     setCheckAll(true)
  //     console.log(listItem);
  //   }else {
  //     setListItem([])
  //     setCheckAll(false)
  //   }
  // }
  //
  // useEffect(() =>{
  //   allCheck();
  // },[listItem])

  // function onCheckItem(item : number) {
  //   listItem.forEach((value) =>{
  //    if (item !== value){
  //      return listItem.push(item)
  //    }else {
  //      return  listItem.pop(item)
  //    }
  //   })
  // }


  return (
    <SafeAreaView
      style={[AppStyles.container,{backgroundColor: colorPallet.color_background_1}]}>
      <StatusBar
        barStyle={"dark-content"}
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
              listItem.push(index);
              setListItem(listItem);
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

            {
              listItem?.forEach( (value) => {
               if (index === value){
                 return <Image
                   source={IC_CHECK}
                   style={{
                     width: unit24,
                     height: unit24,
                     tintColor: colorPallet.color_text_gray_3
                   }}
                 />
               } else {
                 return <Image
                   source={IC_CHECK}
                   style={{
                     width: unit24,
                     height: unit24,
                     tintColor: AppColors.color_primary
                   }}
                 />
               }
              })
            }

          </PressView>
        }}
      />


    </SafeAreaView>
  )
};

export default FilterScreen;


