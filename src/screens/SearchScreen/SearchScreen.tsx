import React, { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  View,
} from "react-native";
import AppStyles from "../../styles/AppStyles";
import AppColors from "../../styles/AppColors";
import { useTheme } from "../../hooks/useTheme";
import {
  unit12,
  unit20,
} from "../../utils/appUnit";
import { IC_DRAWER} from "../../assets/path";
import { useLanguage } from "../../hooks/useLanguage";
import { DrawerActions,} from "@react-navigation/native";
import { NavigationRef } from "../../../App";
import AppBar from "../../components/AppBar/AppBar";
import SearchBar from "../../components/SearchBar/SearchBar";
import SearchComponent from "./components/SearchComponent";
import { FakeTabs} from "../../utils/fakeData";
import BaseTab from "../HomeScreen/tabs/BaseTab";


const SearchScreen: React.FC = () => {
  const { colorPallet, theme } = useTheme()
  const { language } = useLanguage();
  const [searchWord, setSearchWord] = useState("");
  const [typeSearch, setTypeSearch] = useState(FakeTabs[0].type)


  return (
    <SafeAreaView
      style={[AppStyles.container, { backgroundColor: colorPallet.color_background_2 }]}>
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
        backgroundColor: colorPallet.color_background_1,
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
          paddingLeft: unit12,
        }}
        showsHorizontalScrollIndicator={false}
        data={FakeTabs}
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
      <View
        style={{
          flex: 1
        }}
      >
        {
          typeSearch === 'post' ?
              <BaseTab
                type={'posts'}
              />
           : null
        }
        {/*{*/}
        {/*  typeSearch === 'user' &&*/}
        {/*  <FlatList*/}
        {/*    showsVerticalScrollIndicator={false}*/}
        {/*    data={fakeUserLists}*/}
        {/*    renderItem={({ item, index }) => {*/}
        {/*      return (*/}
        {/*        <UserProfileItem*/}
        {/*          key={item.id}*/}
        {/*          img_src={item.avatar}*/}
        {/*          name={item.name}*/}
        {/*          email={item.user_name}*/}
        {/*          style={{*/}
        {/*            marginBottom: unit12,*/}
        {/*          }}*/}
        {/*        />*/}
        {/*      )*/}
        {/*    }}*/}
        {/*  />*/}
        {/*}*/}
      </View>




    </SafeAreaView>
  )
};

export default SearchScreen;


