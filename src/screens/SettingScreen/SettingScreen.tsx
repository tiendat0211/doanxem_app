import React from "react";
import { Button, Image, Platform, SafeAreaView, StatusBar, Text, View, ViewStyle } from "react-native";
import AppStyles from "../../styles/AppStyles";
import useAuth from "../../hooks/useAuth";
import AppColors from "../../styles/AppColors";
import { useTheme } from "../../hooks/useTheme";
import { unit14, unit16, unit17, unit20, unit24 } from "../../utils/appUnit";
import { IC_ARROWLEFT, IC_BELL, IC_BLOCKUSER, IC_DETAILPROFILE, IC_LANGUAGE, IC_LOCK, IC_LOGOUT, IC_SHARE, IC_STAR, IC_USER2, IC_VIEWMODE, IMG_LOGO } from "../../assets/path";
import AppText from "../../components/AppText/AppText";
import { useLanguage } from "../../hooks/useLanguage";
import { fontSize16, fontSize18, fontSize20 } from "../../styles/AppFonts";
import PressView from "../../components/PressView/PressView";
import { NavigationRef } from "../../../App";
import AppBar from "../../components/AppBar/AppBar";
import UserProfileItem from "../../components/UserProfileItem/UserProfileItem";
import { ScrollView } from "react-native-gesture-handler";



const data: SettingItemProps[] = [
  {
    iconLeft: IC_DETAILPROFILE,
    title: 'Thông tin tài khoản',
    onPress: () => {
      NavigationRef.current?.navigate("DetailProfileScreen");
    },
  },
  {
    iconLeft: IC_BLOCKUSER,
    title: 'Danh sách chặn',
    onPress: () => {
      NavigationRef.current?.navigate("BlockUserScreen");
    },
  },
  {
    iconLeft: IC_LOCK,
    title: 'Thay đổi mật khẩu',
    onPress: () => {
      NavigationRef.current?.navigate("ChangPasswordScreen");
    },
  },
  {
    iconLeft: IC_LANGUAGE,
    title: 'Ngôn ngữ',
    onPress: () => {
      NavigationRef.current?.navigate("LanguageScreen");
    },
  },
  {
    iconLeft: IC_VIEWMODE,
    title: 'Chế độ hiển thị',
    onPress: () => {
      NavigationRef.current?.navigate("ViewModeScreen");
    },
  },
  {
    iconLeft: IC_BELL,
    title: 'Trung tâm thông báo',
    onPress: () => {
      NavigationRef.current?.navigate('NotiSettingScreen');
    },
  },
  {
    iconLeft: IC_SHARE,
    title: 'Chia sẻ ứng dụng',
    onPress: () => {

    },
  },
  {
    iconLeft: IC_STAR,
    title: 'Đánh giá ứng dụng',
    onPress: () => {

    },
  },
]


const SettingScreen: React.FC = () => {
  const { colorPallet , theme } = useTheme()
  const { language } = useLanguage();
  const { authData, signOut } = useAuth();

  return (
    <SafeAreaView
      style={[AppStyles.container, { backgroundColor: colorPallet.color_background_1 }]}>
      <StatusBar
        barStyle={ theme === 'light' ? "dark-content" : "light-content"}
        backgroundColor={AppColors.color_transparent}
      />
      <AppBar
        title={language?.setting}
        leftIcon={IC_ARROWLEFT}
        leftIconOnClick={() => {
          NavigationRef.current?.goBack()
        }}
        titleStyle={{
          color: colorPallet.color_text_blue_1
        }}
        containerStyle={{
          borderBottomColor: colorPallet.color_divider_3
        }}
      />

      <ScrollView
        style={{flex: 1}}
      >
        <UserProfileItem
          img_src={IMG_LOGO}
          name={"_Nghiencoliemsi_"}
          email={"@ngoclongg2010"}
          style={{
            marginTop: unit14,
          }}
        />
        {
          data.map((value, index) => {
            return <>
              <SettingItem
                key={index}
                iconLeft={value.iconLeft}
                title={value.title}
                onPress={value.onPress}
              />
            </>
          })
        }

        <PressView
          style={{
            flexDirection: 'row',
            marginHorizontal: unit20,
            alignItems: 'center',
            paddingVertical: unit17,
          }}
          onPress={() => {
            signOut();
          }}
        >
          <Image
            source={IC_LOGOUT}
            style={{
              width: unit24,
              height: unit24,
              tintColor: AppColors.color_warning ,
              marginRight: unit16
            }}
          />
          <AppText
            fontType={'regular'}
            style={{
              fontSize: fontSize16,
              color: AppColors.color_warning
            }}
          >
            Đăng xuất
          </AppText>
        </PressView>

      </ScrollView>

    </SafeAreaView>
  )
};

export default SettingScreen;

interface SettingItemProps {
  iconLeft: any,
  title: string,
  onPress?(): any,
}

const SettingItem: React.FC<SettingItemProps> = (props) => {
  const { iconLeft, title, onPress } = props;
  const { colorPallet, theme } = useTheme()
  return (
    <>
      <PressView
        style={{
          flexDirection: 'row',
          marginHorizontal: unit20,
          alignItems: 'center',
          paddingVertical: unit17,
        }}
        onPress={onPress}
      >
        <Image
          source={iconLeft}
          style={{
            width: unit24,
            height: unit24,
            tintColor: AppColors.color_primary ,
            marginRight: unit16
          }}
        />
        <AppText
          fontType={'regular'}
          style={{
            fontSize: fontSize16,
            color: theme === 'light' ? colorPallet.color_text_blue_3 : colorPallet.color_text_gray_1,
          }}
        >
          {title}
        </AppText>
      </PressView>
    </>
  );
}


