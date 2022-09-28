import React, { useState } from "react";
import { SafeAreaView, ScrollView, StatusBar, TextInput, View } from "react-native";
import AppStyles from "../../styles/AppStyles";
import useAuth from "../../hooks/useAuth";
import AppColors from "../../styles/AppColors";
import { useTheme } from "../../hooks/useTheme";
import {
  IC_ARROWLEFT,
  IMG_LOGO, IMG_POST,
} from "../../assets/path";
import { useLanguage } from "../../hooks/useLanguage";
import { NavigationRef } from "../../../App";
import AppBar from "../../components/AppBar/AppBar";
import { StatusModel } from "../../model/StatusModel";
import StatusItem from "../../components/StatusItem/StatusItem";
import AppText from "../../components/AppText/AppText";
import { CommentModle } from "../../model/CommentModle";
import CommentItem from "../../components/CommentItem/CommentItem";
import { unit1, unit14 } from "../../utils/appUnit";
import AppInput from "../../components/AppInput/AppInput";

const FakeData : StatusModel = {
    post_id: 1,
    user_img: IMG_LOGO,
    user_name: '_designtoichet_',
    time: '4 giờ trước',
    status_content: '@conzoihuypham I thought, what can we do here that’ll make a impact, so @conzoihuypham I thought, what can we do here that’ll make a impact, so @conzoihuypham I thought, what can we do here that’ll make a impact, so',
    status_img: IMG_POST,
    comment_counts: 100,
    reaction_counts: 100,
  }
const FakeComment: CommentModle[] = [
  {
    id: 1,
    user_name: 'Prodev198x',
    user_img: IMG_LOGO,
    comment_title: 'Yo bro, WTF are you thinking ?',
    time:'4 giờ trước',
  },
  {
    id: 2,
    user_name: 'Prodev198x',
    user_img: IMG_LOGO,
    comment_title: 'Ảo Tưởng à ??? Thằng em tao 96 học cơ khí bách khóa giờ sang làm design sấp mặt tháng kiếm 4 5 nghìn đô rồi',
    time:'4 giờ trước',
  },
  {
    id: 3,
    user_name: 'Prodev198x',
    user_img: IMG_LOGO,
    comment_title: '4 5 nghìn cái cục cứt, design bên tao mới ra trường đã đc 7 8 nghìn 1 tháng r',
    time:'4 giờ trước',
  },
  {
    id: 4,
    user_name: 'Marketingtoituhomqua',
    user_img: IMG_LOGO,
    comment_title: 'Chắc làm dev là lương cao nhất rồi',
    time:'4 giờ trước',
  },
  {
    id: 5,
    user_name: 'Codetoigia',
    user_img: IMG_LOGO,
    comment_title: 'Ảo Tưởng à ??? Thằng em tao 96 học cơ khí bách khóa giờ sang làm design sấp mặt tháng kiếm 4 5 nghìn đô rồi',
    time:'4 giờ trước',
  },

]

const DetailStatusScreen: React.FC = () => {
  const { authData, signOut } = useAuth();
  const user = authData.user;
  const {colorPallet, theme } = useTheme()
  const { language } = useLanguage();

  const [listComment, seListComment] = useState<CommentModle[]>(FakeComment)
  const [viewMore, setViewMore] = useState(false)
  const [userComment, setUserComment] = useState('')

  return (
    <SafeAreaView
      style={[AppStyles.container,{backgroundColor: colorPallet.color_background_1}]}>
      <StatusBar
        barStyle={ theme === 'light' ? "dark-content" : "light-content"}
        backgroundColor={AppColors.color_transparent}
      />
      <AppBar
        title={language?.detailScreen}
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
      />

      <ScrollView
        style={{
          flex:1,
        }}
      >
        {/*Status*/}
        <StatusItem
          key={FakeData.post_id}
          user_img={FakeData.user_img}
          user_name={FakeData.user_name}
          time={FakeData.time}
          status_content={FakeData.status_content}
          status_img={FakeData.status_img}
          comment_counts={FakeData.comment_counts}
          reaction_counts={FakeData.reaction_counts}
          style={{
            borderBottomColor: colorPallet.color_divider_3,
            borderBottomWidth: unit1
          }}
        />

      {/*Comment*/}
        {
          listComment.map((item) => {
            return <CommentItem
              key={item.id}
              id={item.id}
              user_img={item.user_img}
              comment_title={item.comment_title}
              time={item.time}
              user_name={item.user_name}
            />
          })
        }
      </ScrollView>

      <AppInput
        onPressSend={() => {}}
        onChangeText={ (text) => setUserComment(text) }
        value={userComment}
      />


    </SafeAreaView>
  )
};

export default DetailStatusScreen;


