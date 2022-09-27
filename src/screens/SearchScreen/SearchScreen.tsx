import React, { useState } from "react";
import { Button, FlatList, Image, Platform, SafeAreaView, ScrollView, StatusBar, Text, View } from "react-native";
import AppStyles from "../../styles/AppStyles";
import useAuth from "../../hooks/useAuth";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AppColors from "../../styles/AppColors";
import { useTheme } from "../../hooks/useTheme";
import {
  unit0,
  unit1,
  unit100,
  unit12, unit16,
  unit20,
  unit200,
  unit24,
  unit30,
  unit32, unit6,
  unit60,
  unit75, unit8,
} from "../../utils/appUnit";
import { IC_DRAWER, IC_FILTER } from "../../assets/path";
import AppText from "../../components/AppText/AppText";
import { useLanguage } from "../../hooks/useLanguage";
import { fontSize14, fontSize16, fontSize20 } from "../../styles/AppFonts";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerActions, NavigationContainer } from "@react-navigation/native";
import PressView from "../../components/PressView/PressView";
import { NavigationRef } from "../../../App";
import AppBar from "../../components/AppBar/AppBar";
import SearchBar from "../../components/SearchBar/SearchBar";

const FakeData = ['Bài viết','Người dùng',
  'Tag',
  'Tag',
  'Tag',
  'Tag',
  'Tag',
  'Tag',
  'Tag',
  'Tag',
  'Tag',
  'Tag',
  'Tag',
  'Tag',
  'Tag',
  'Tag',
  'Tag',
  'Tag',
  'Tag',
  'Tag',
  'Tag',
  'Tag',
]

const SearchScreen: React.FC = () => {
  const {colorPallet} = useTheme()
  const { language } = useLanguage();
  const [searchWord, setSearchWord] = useState("");

  return (
    <SafeAreaView
      style={[AppStyles.container,{backgroundColor: colorPallet.color_background_1}]}>
      <StatusBar
        barStyle={"dark-content"}
        backgroundColor={AppColors.color_transparent}
      />
      <AppBar
        title={language?.Search}
        leftIcon={IC_DRAWER}
        leftIconOnClick={()=>{
          NavigationRef.current?.dispatch(DrawerActions.openDrawer)
        }}
        titleStyle={{
          color: colorPallet.color_text_blue_1
        }}
        containerStyle={{
          borderBottomColor:colorPallet.color_divider_3
        }}
      />

      <SearchBar
        onSearchPress={() => {
        }}
        setSearchWord={setSearchWord}
        searchWord={searchWord} />

      <FlatList
        horizontal={true}
        style={{
          backgroundColor: colorPallet.color_background_3,
          paddingVertical: unit20,
          flexGrow: 0,
          marginLeft: unit12,
        }}
        showsHorizontalScrollIndicator={false}
       data={FakeData}
        renderItem={({item, index}) => {
          return <PressView

          >
            <AppText
              style={{
                borderRadius: unit75,
                borderColor: AppColors.color_primary,
                borderWidth: unit1,
                fontSize: fontSize14,
                color: AppColors.color_primary,
                paddingHorizontal: unit16,
                paddingVertical: unit6,
                marginHorizontal: unit8
              }}
            >
              {item}
            </AppText>
          </PressView>
        }}
      />


      <View
        style={{
          flexGrow:1,
        }}
      >

      </View>

    </SafeAreaView>
  )
};

export default SearchScreen;


