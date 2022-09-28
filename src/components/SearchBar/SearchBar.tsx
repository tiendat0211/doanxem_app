import { Image, Platform, TextInput, View } from "react-native";
import React from "react";
import { AppFonts, dimension, fontSize14, fontSize16 } from "../../styles/AppFonts";
import { useTheme } from "../../hooks/useTheme";
import { useLanguage } from "../../hooks/useLanguage";
import AppStyles from "../../styles/AppStyles";
import { unit10, unit100, unit12, unit16, unit20, unit24, unit36, unit73 } from "../../utils/appUnit";
import PressView from "../PressView/PressView";
import { IC_SEARCH2 } from "../../assets/path";

interface SearchBarProps {
  searchWord: string,
  setSearchWord: React.Dispatch<React.SetStateAction<string>>,
  onSearchPress: () => void,
}

const SearchBar: React.FC<SearchBarProps> = (props) => {
  let { searchWord, setSearchWord, onSearchPress } = props;
  const width = dimension.width;
  const { colorPallet, theme } = useTheme();
  const { language } = useLanguage()
  return <View style={[AppStyles.alignRow, {
    marginVertical: unit12,
    marginHorizontal: unit20,
    paddingHorizontal: unit20,
    paddingVertical: unit12,
    borderRadius: unit10,
    backgroundColor: colorPallet.color_background_3 ,
  }]}>
    <PressView
      onPress={onSearchPress}>
      <Image
        source={IC_SEARCH2}
        style={{
          width:unit24,
          height: unit24
        }
        } />
    </PressView>
    <TextInput
      placeholder={language.enterKeyWord}
      placeholderTextColor={colorPallet.color_text_gray_3}

      value={searchWord}
      onChangeText={(text) => setSearchWord(text)}
      style={{
        flexGrow: 1,
        padding: Platform.OS === "android" ? 0 : 0,
        color: colorPallet.color_text_blue_3,
        width: width - unit73 - unit36,
        paddingStart: unit12,
        fontSize: fontSize16,
        //fontFamily: AppFonts.semiBold,

        includeFontPadding: false,
      }} />

  </View>;

};
export default SearchBar;
