import React, { useState } from "react";
import { Button, FlatList, Image, ImageSourcePropType, Platform, RefreshControl, SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import AppStyles from "../../styles/AppStyles";
import useAuth from "../../hooks/useAuth";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AppColors from "../../styles/AppColors";
import { useTheme } from "../../hooks/useTheme";
import { unit12, unit16, unit18, unit20, unit24, unit32, unit4, unit76, unit8 } from "../../utils/appUnit";
import { IC_CUP, IC_DRAWER, IC_FILTER, IC_NOTI, IC_SAD } from "../../assets/path";
import AppText from "../../components/AppText/AppText";
import { useLanguage } from "../../hooks/useLanguage";
import { dimension, fontSize12, fontSize14, fontSize16, fontSize20 } from "../../styles/AppFonts";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerActions, NavigationContainer } from "@react-navigation/native";
import PressView from "../../components/PressView/PressView";
import { NavigationRef } from "../../../App";
import AppBar from "../../components/AppBar/AppBar";
import { ScrollView } from "react-native-gesture-handler";
import EmptyViewForList from "../../components/EmptyViewForList/EmptyViewForList";
import useScreenState from "../../hooks/useScreenState";


const NotificationScreen: React.FC = () => {
  const { colorPallet } = useTheme()
  const language = useLanguage();

  const dataNotification = 
  {
    today:[
      {
        id: 1,
        noti_type: 'string',
        created_at: '7:00, 28/09/2022',
        read_at: 'any',
        type_translation: 'string',
        title:'Bài đăng của bạn đã lên top thịnh hành',
        content_trans: 'Culpa cillum consectetur labore nulla nulla magna irure. Id veniam culpa officia aute dolor amet deserunt ex proident commodo',
        screen: 'string',
        data: 'Data',
        seen:false,
        icon: IC_CUP,
        pivot: 'Pivot',
        data_translation: 'string'
      },
      {
        id: 2,
        noti_type: 'string',
        created_at: '8:00, 28/09/2022',
        read_at: 'any',
        type_translation: 'string',
        title:'Rất tiếc ! Bài đăng của bạn đã vi phạm chính sách cộng đồng',
        content_trans: 'Culpa cillum consectetur labore nulla nulla magna irure. Id veniam culpa officia aute dolor amet deserunt ex proident commodo nothing',
        screen: 'string',
        seen:true,
        data: 'Data',
        icon: IC_SAD,
        pivot: 'Pivot',
        data_translation: 'string'
      },
    ],
    yesterday:[
      {
        id: 3,
        noti_type: 'string',
        created_at: '7:00, 28/09/2022',
        read_at: 'any',
        type_translation: 'string',
        title:'Bài đăng của bạn đã lên top thịnh hành',
        content_trans: 'Culpa cillum consectetur labore nulla nulla magna irure. Id veniam culpa officia aute dolor amet deserunt ex proident commodo',
        screen: 'string',
        data: 'Data',
        seen:false,
        icon: IC_CUP,
        pivot: 'Pivot',
        data_translation: 'string'
      },
      {
        id: 4,
        noti_type: 'string',
        created_at: '8:00, 28/09/2022',
        read_at: 'any',
        type_translation: 'string',
        title:'Rất tiếc ! Bài đăng của bạn đã vi phạm chính sách cộng đồng',
        content_trans: 'Culpa cillum consectetur labore nulla nulla magna irure. Id veniam culpa officia aute dolor amet deserunt ex proident commodo nothing',
        screen: 'string',
        seen:false,
        data: 'Data',
        icon: IC_SAD,
        pivot: 'Pivot',
        data_translation: 'string'
      },
    ],
    otherDays:[
      {
        id:5,
        noti_type: 'string',
        created_at: '7:00, 28/09/2022',
        read_at: 'any',
        type_translation: 'string',
        title:'Bài đăng của bạn đã lên top thịnh hành',
        content_trans: 'Culpa cillum consectetur labore nulla nulla magna irure. Id veniam culpa officia aute dolor amet deserunt ex proident commodo',
        screen: 'string',
        data: 'Data',
        seen:false,
        icon: IC_CUP,
        pivot: 'Pivot',
        data_translation: 'string'
      },
      {
        id: 6,
        noti_type: 'string',
        created_at: '8:00, 28/09/2022',
        read_at: 'any',
        type_translation: 'string',
        title:'Rất tiếc ! Bài đăng của bạn đã vi phạm chính sách cộng đồng',
        content_trans: 'Culpa cillum consectetur labore nulla nulla magna irure. Id veniam culpa officia aute dolor amet deserunt ex proident commodo nothing',
        screen: 'string',
        seen:false,
        data: 'Data',
        icon: IC_SAD,
        pivot: 'Pivot',
        data_translation: 'string'
      },
    ]
  }
  

  return (
    <SafeAreaView
      style={[AppStyles.container, { backgroundColor: colorPallet.color_background_3 }]}>
      <StatusBar
        barStyle={"dark-content"}
        backgroundColor={AppColors.color_transparent}
      />
      <AppBar
        title={language?.Notification}
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
      <ScrollView
      style={{
        paddingTop:unit16
      }}>
        <AppText 
        fontType="semiBold"
        style={{
          marginStart:unit20,
          marginBottom:unit4,
          fontSize:fontSize14,
          color:colorPallet.color_text_gray_2
        }}>
          {'Hôm nay'}
        </AppText>
        <NotiFollowDayItem
        data={dataNotification.today}
        />
         <AppText
         fontType="semiBold"
         style={{
           marginStart:unit20,
           marginBottom:unit4,
           fontSize:fontSize14,
           color:colorPallet.color_text_gray_2
         }}>
          {'Hôm qua'}
        </AppText>
        <NotiFollowDayItem
        data={dataNotification.yesterday}
        />
         <AppText
         fontType="semiBold"
         style={{
           marginStart:unit20,
           marginBottom:unit4,
           fontSize:fontSize14,
           color:colorPallet.color_text_gray_2
         }}>
          {'Trước đó'}
        </AppText>
        <NotiFollowDayItem
        data={dataNotification.otherDays}
        />
      </ScrollView>



    </SafeAreaView>
  )
};

export default NotificationScreen;


interface NotiFollowDay {
  data : any[]
}
 
export const NotiFollowDayItem :React.FC<NotiFollowDay> = (props) => {

  const { isLoading, setLoading, setError, mounted } = useScreenState();

  return (
    <FlatList
    style={{
      flex: 1,
    }}
    ListEmptyComponent={<EmptyViewForList />}
    keyExtractor={(item, index) => String(JSON.stringify(item) + index)}
    overScrollMode={"never"}
    showsVerticalScrollIndicator={false}
    data={props.data}
    refreshControl={
      <RefreshControl
        refreshing={isLoading}
        onRefresh={async () => {
          // await getListNoti();
        }} />
    }
    contentContainerStyle={[
      {},
    ]}
    renderItem={({ item }) =>
      <NotiView
        id={item.id}
        iconSrc={item?.icon }
        title={item?.title}
        script={item?.content_trans}
        time={item?.created_at}
        data={item?.data}
        // listNotificationUnRead={listNotificationUnRead!}
        // listNotificationUnReadOffline={listNotificationUnReadOffline!}
        // updateListOffline={updateListOffline!}
        // updateList={updateList!}
        seen={item?.seen}
        // readAllNotifications={readAllNotifications}
      />
    } />
  )
}

interface NotiViewProps {
  id: number,
  iconSrc: ImageSourcePropType,
  title:string
  script: string,
  time: string,
  seen:boolean,
  data: any
  // listNotificationUnRead: number[];
  // listNotificationUnReadOffline: number[];
  // updateListOffline: (listNotificationUnRead: Partial<ListNotificationUnreadSlice>) => void;
  // updateList: (listNotificationUnRead: Partial<ListNotificationUnreadSlice>) => void;
  // readAllNotifications: (data:any) => void;
}

export const NotiView: React.FC<NotiViewProps> = (props) => {
  let {
    id,
    iconSrc,
    title,
    script,
    time,
    seen,
    data,
    // listNotificationUnRead,
    // listNotificationUnReadOffline,
    // updateList,
    // readAllNotifications,
    
  } = props;
  const { colorPallet } = useTheme();
  const [seenNoti,setSeenNoti] = useState<boolean>(seen)
  return (
    <PressView
      onPress={() => {
        setSeenNoti(!seenNoti)
        // const listUpdateOffline = listNotificationUnReadOffline ? [...listNotificationUnReadOffline] : [];
        // listUpdateOffline.push(id);
        // const listUnreadUpdate = listNotificationUnRead.filter(i => i !== id);
        // updateList({ listNotificationUnRead: listUnreadUpdate, listNotificationUnReadOffline: listUpdateOffline });
        // if (data?.screen && data) {
        //   if (listUnreadUpdate.length === 0) {
        //     readAllNotifications && readAllNotifications(data);
        //   } else {
        //     NavigationRef.current?.navigate(data?.screen, { ...data });
        //     console.log("OK", data);
        //   }
        // } else {
        //   if (listUnreadUpdate.length === 0) {
        //     readAllNotifications && readAllNotifications(data);
        //   }
        // }
      }}
      style={{
        paddingHorizontal: unit20,
        paddingVertical: unit16,
        marginBottom: unit8,
        backgroundColor: !seenNoti ? '#F2F8FF': colorPallet.color_background_1,
      }}>
      <View
        style={{
          flexDirection: "row",
        }}>
        <Image
          source={iconSrc}
          style={styles.icon24} />
        <View
          style={{
            marginStart: unit12,
            width: dimension.width - unit76,
          }}>
          <AppText
            fontType="semiBold"
            style={{
              fontSize: fontSize14,
              lineHeight: unit20,
              marginBottom: unit8,
              color: colorPallet.color_text_blue_1,
            }}>
            {title}
          </AppText>
          <AppText
            fontType="regular"
            style={{
              fontSize: fontSize14,
              lineHeight: unit20,
              marginBottom: unit8,
              color: colorPallet.color_text_gray_3
            }}>
            {script}
          </AppText>
          <AppText
            fontType="regular"
            style={{
              fontSize: fontSize12,
              lineHeight: unit18,
              color: colorPallet.color_text_blue_1,
            }}>
             {`Vào lúc ${time}`}
          </AppText>
        </View>
      </View>
    </PressView>
  );
};


const styles = StyleSheet.create({
  icon32: {
    width: unit32,
    height: unit32,
  },
  icon24: {
    width: unit24,
    height: unit24,
  },
});

