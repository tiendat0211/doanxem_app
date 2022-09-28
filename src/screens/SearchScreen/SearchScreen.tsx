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
import { IC_DRAWER, IC_FILTER, IMG_LOGO } from "../../assets/path";
import AppText from "../../components/AppText/AppText";
import { useLanguage } from "../../hooks/useLanguage";
import { fontSize14, fontSize16, fontSize20 } from "../../styles/AppFonts";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerActions, NavigationContainer } from "@react-navigation/native";
import PressView from "../../components/PressView/PressView";
import { NavigationRef } from "../../../App";
import AppBar from "../../components/AppBar/AppBar";
import SearchBar from "../../components/SearchBar/SearchBar";
import SearchComponent from "./components/SearchComponent";

const FakeData = [
  {
    script: 'Bài viết',
    type: 'post'
  },
  {
    script: 'Người dùng',
    type: 'user'
  },
  {
    script: 'Tag',
    type: 'tag'
  },
  {
    script: 'Bộ lạc 1',
    type: 'bolac1'
  },
]

const fakePost = [
  {
    id :1 ,
    time :4 ,
    user : {
      name : '_designtoichet_',
      avatar : IMG_LOGO
    },
    title: '@conzoihuypham I thought, what can we do here that’ll make a impact, so ...xem thêm',
    image: IMG_LOGO,
    comments : '2,5k',
    likes : '1,2k'
  },
  {
    id :2 ,
    time :4 ,
    user : {
      name : '_designtoichet_',
      avatar : IMG_LOGO
    },
    title: '@conzoihuypham I thought, what can we do here that’ll make a impact, so ...xem thêm',
    image: IMG_LOGO,
    comments : '2,5k',
    likes : '1,2k'
  },
]

const SearchScreen: React.FC = () => {
  const { colorPallet, theme } = useTheme()
  const { language } = useLanguage();
  const [searchWord, setSearchWord] = useState("");
  const [typeSearch, setTypeSearch] = useState(FakeData[0].type)

  return (
    <SafeAreaView
      style={[AppStyles.container, { backgroundColor: colorPallet.color_background_1 }]}>
      <StatusBar
        barStyle={theme === 'light' ? "dark-content" : "light-content"}
        backgroundColor={AppColors.color_transparent}
      />
      <AppBar
        title={language?.Search}
        leftIcon={IC_DRAWER}
        leftIconOnClick={() => {
          NavigationRef.current?.dispatch(DrawerActions.openDrawer)
        }}
        titleStyle={{
          color: colorPallet.color_text_blue_1
        }}
        containerStyle={{
          borderBottomColor: colorPallet.color_divider_3
        }}
      />
      <View style={{
        shadowColor: AppColors.color_primary,
        shadowOffset: {
          width: 0,
          height: unit12,
        },
        shadowOpacity: 0.58,
        shadowRadius: unit16,
        elevation: unit24,
        }}>
        <SearchBar
          onSearchPress={() => {
          }}
          setSearchWord={setSearchWord}
          searchWord={searchWord} />
      </View>

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
        renderItem={({ item, index }) => {
          return (
            <SearchComponent
              item={item}
              selectedType={typeSearch}
              setSelectedType={setTypeSearch}
            />
          )
        }}
      />
      <ScrollView
        style={{
          paddingHorizontal : typeSearch === 'user' ? unit20 : undefined
        }}
      >
        {/* {
          typeSearch === 'post' && {

          }
        } */}
      </ScrollView>


    </SafeAreaView>
  )
};

export default SearchScreen;


