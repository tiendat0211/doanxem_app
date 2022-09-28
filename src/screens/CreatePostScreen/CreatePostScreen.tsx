import React, { useState } from "react";
import { SafeAreaView, StatusBar, TextInput, View, ViewProps } from "react-native";
import AppStyles from "../../styles/AppStyles";
import AppColors from "../../styles/AppColors";
import { useTheme } from "../../hooks/useTheme";
import { IC_ARROWLEFT, IC_CLOSE, IC_DRAWER, IC_FILTER, IC_HOTTAB, IC_NEWTAB, IC_TOPTAB } from "../../assets/path";
import { useLanguage } from "../../hooks/useLanguage";
import { DrawerActions, NavigationContainer } from "@react-navigation/native";
import { NavigationRef } from "../../../App";
import AppBar from "../../components/AppBar/AppBar";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { unit1, unit12, unit132, unit14, unit144, unit16, unit20, unit22, unit40, unit8 } from "../../utils/appUnit";
import AppText from "../../components/AppText/AppText";
import { dimension } from "../../styles/AppFonts";
import { fakeTags } from "../../utils/fakeData";
import TagItem from "./components/TagItem";


interface CreatePostScreenProps extends ViewProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onApply?: () => void;
}

const CreatePostScreen: React.FC<CreatePostScreenProps> = (props) => {
  const { setOpen, open, onApply } = props;
  const { colorPallet, theme } = useTheme()
  const { language } = useLanguage();
  const [script, setScript] = useState('')

  if (!open) {
    return null;
  }

  return (
    <SafeAreaView
      style={[AppStyles.container, { backgroundColor: colorPallet.color_background_1 }]}>
      <StatusBar
        barStyle={theme === 'light' ? "dark-content" : "light-content"}
        backgroundColor={AppColors.color_transparent}
      />
      <AppBar
        title={'Mang vui vẻ tới cho đời'}
        leftIcon={IC_CLOSE}
        leftIconOnClick={() => {
          setOpen(false)
        }}
        titleStyle={{
          color: colorPallet.color_text_blue_1
        }}
        containerStyle={{
          borderBottomColor: colorPallet.color_divider_3
        }}
      />
      <ScrollView
        style={{
          paddingTop: unit12,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: unit20
          }}>
          <AppText
            fontType="bold"
            style={{
              fontSize: unit14,
              lineHeight: unit20
            }}
          >
            {'Mô tả'}
          </AppText>
          <AppText
            style={{
              fontSize: unit14,
              lineHeight: unit20
            }}
          >
            {script.length}/320
          </AppText>
        </View>
        <TextInput
          multiline={true}
          style={{
            marginTop: unit8,
            paddingBottom: unit12,
            paddingHorizontal: unit20,
            borderBottomWidth: unit1,
            borderBottomColor: colorPallet.color_divider_2,
            fontSize: unit16,
            lineHeight: unit22,
            color: colorPallet.color_text_gray_2,
            height: script.length > 200 ? 'auto' : unit144,
          }}
          maxLength={320}
          onChangeText={(text) => {
            setScript(text)
          }}
          value={script}
        />
        <View
          style={{
            justifyContent: 'space-between',
            paddingHorizontal: unit20,
            marginVertical: unit8,
            paddingBottom: unit12,
          }}>
          <AppText
          fontType="bold"
          style={{
            color:colorPallet.color_text_blue_3,
            fontSize:unit14,
            lineHeight:unit20
          }}>
            {'Gắn thẻ'}
          </AppText>
        </View>
        <View
        style={{
          flexDirection:'row',
          paddingStart:unit20,
          flexWrap:'wrap',
        }}>
        {
          fakeTags.map((item,index)=>{
            return(
              <TagItem tag={item}/>
            )
          })
        }
        </View>
      </ScrollView>
    </SafeAreaView>
  )
};

export default CreatePostScreen;


