import React, { useEffect, useState } from "react";
import { FlatList, Image, RefreshControl, SafeAreaView, StatusBar, Text, View, ViewStyle } from "react-native";
import AppStyles from "../../styles/AppStyles";
import AppColors from "../../styles/AppColors";
import { useTheme } from "../../hooks/useTheme";
import { unit100, unit12, unit16, unit17, unit20, unit24, unit32, unit36, unit5 } from "../../utils/appUnit";
import { IC_ARROWLEFT, IC_CHECK2, IC_ENGLISH, IC_TRASH, IC_VIETNAM, IMG_LOGO, } from "../../assets/path";
import AppText from "../../components/AppText/AppText";
import { useLanguage } from "../../hooks/useLanguage";
import { fontSize16, fontSize18, fontSize20 } from "../../styles/AppFonts";
import PressView from "../../components/PressView/PressView";
import { NavigationRef } from "../../../App";
import AppBar from "../../components/AppBar/AppBar";
import { blockUser, getBlockList, login, unBlockUser } from "../../network/AppAPI";
import ApiHelper from "../../utils/ApiHelper";
import { showToastError, showToastErrorMessage } from "../../utils/Toaster";
import useScreenState from "../../hooks/useScreenState";
import UserModel from "../../model/ApiModel/UserModel";
import Snackbar from "react-native-snackbar";
import PopUp from "../../components/PopUp/PopUp";
import AppLoading from "../../components/Loading/AppLoading";


const Fakedata: BlockItemProps[] = [
    {
        img_src: IMG_LOGO,
        name: 'dmcuocdoi',
        onPress: () => {

        },
    },
    {
        img_src: IMG_LOGO,
        name: 'songtiepdi',
        onPress: () => {

        },
    },
]

const BlockUserScreen: React.FC = () => {
  const { colorPallet, theme} = useTheme();
  const { language } = useLanguage();

  const { isLoading, setLoading, mounted, setError } = useScreenState();

  const [listBlocks, setListBlocks] = useState<UserModel[]>([]);
  const [isOpen, setOpen] = useState(false);
  const [blockID, setBlockID] = useState(0)

  async function loadBlockList() {
    try {
      setLoading(true)
      const res = await getBlockList();
      if (ApiHelper.isResSuccess(res)) {
        const data = res.data.data;
        setListBlocks(data)
      } else {
        showToastErrorMessage(res.data.message);
      }
    } catch (e) {
      showToastError(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(()=>{
    loadBlockList().finally(()=>{})
  },[])

  async function unBlockUserByID( id: number) {
    try {
      const res = await unBlockUser(id);

      if (ApiHelper.isResSuccess(res)) {
        Snackbar.show({
          text: `Mở khoá người dùng thành công`,
          duration: Snackbar.LENGTH_SHORT,
        });
      } else {
        showToastErrorMessage(res.data.message);
      }
    } catch (e) {
      setError(e);
    } finally {
    }
  }

    return (
      <>
        <SafeAreaView
          style={[AppStyles.container, {
            backgroundColor: colorPallet.color_background_1 ,
          }]}>
          <StatusBar
            barStyle={ theme === 'light' ? "dark-content" : "light-content"}
            backgroundColor={AppColors.color_transparent}
          />

          {
            isLoading && <AppLoading isOverlay/>
          }
          <AppBar
            title={language?.blockUser}
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
            rightIcon={IC_TRASH}
            rightIconStyle={{
              tintColor: colorPallet.color_text_blue_1,
            }}
          />

          <FlatList
            showsHorizontalScrollIndicator={false}
            data={listBlocks}
            refreshControl={
              <RefreshControl
                refreshing={isLoading}
                onRefresh={loadBlockList} />
            }
            renderItem={({ item, index }) => {
              return <BlockItem
                img_src={item.avatar}
                name={item.name}
                onPress={() =>{
                  setOpen(true);
                  setBlockID(item.id)
                }}
              />
            }}
          />

        </SafeAreaView>

        {
          isOpen ?
            <PopUp
              rightButtonPress={async ()=> {
                await unBlockUserByID(blockID);
                setOpen(false);
                await loadBlockList();
              }}
              rightButtonTitle={'Đồng ý'}
              mess={'Bạn muốn bỏ chặn người dùng này?'}
              leftButtonTitle={'Từ chối'}
              leftButtonPress={()=>{
                setOpen(false);
              }}
            />
            : null
        }
      </>


    )
};

export default BlockUserScreen;

interface BlockItemProps {
    img_src: any,
    name: string,
    onPress?(): any,
}

const BlockItem: React.FC<BlockItemProps> = (props) => {
    const { img_src, name, onPress } = props;
    const { colorPallet,theme } = useTheme()
    return (
        <>
            <PressView
                style={{
                    flexDirection: 'row',
                    marginHorizontal: unit20,
                    alignItems: 'center',
                    paddingVertical: unit12,
                }}
                onPress={onPress}
            >
                <Image
                    source={{
                      uri: img_src
                    }}
                    style={{
                        width: unit36,
                        height: unit36,
                        marginRight: unit16,
                        borderRadius: unit100,
                    }}
                />
                <AppText
                  fontType={"regular"}
                    style={{
                        fontSize: fontSize16,
                        color: theme === 'light' ?  colorPallet.color_text_blue_3 : AppColors.color_text2,
                        flexGrow: 1,
                    }}
                >
                    {name}
                </AppText>
                <Image
                    source={IC_TRASH}
                    style={{
                        width: unit24,
                        height: unit24,
                        tintColor: theme === 'light' ?  colorPallet.color_text_gray_3 : colorPallet.color_text_gray_4,
                    }}
                />
            </PressView>
        </>
    );
}


