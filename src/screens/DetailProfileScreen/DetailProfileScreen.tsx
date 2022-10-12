import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
} from "react-native";
import AppStyles from "../../styles/AppStyles";
import AppColors from "../../styles/AppColors";
import { useTheme } from "../../hooks/useTheme";
import {
  unit1,
  unit100,
  unit14,
  unit16,
  unit20,
  unit24,
  unit32,
  unit4,
  unit40,
  unit5,
  unit8,
} from "../../utils/appUnit";
import {
  IC_ARROWLEFT,
  IC_CALENDER,
  IC_EDIT_PROFILE,
  IC_EMAIL,
  IC_PHONE,
  IC_USER,
} from "../../assets/path";
import AppText from "../../components/AppText/AppText";
import { useLanguage } from "../../hooks/useLanguage";
import { fontSize12, fontSize14, fontSize16, fontSize18, fontSize20 } from "../../styles/AppFonts";
import PressView from "../../components/PressView/PressView";
import { NavigationRef } from "../../../App";
import AppBar from "../../components/AppBar/AppBar";
import ValidateEditText from "../../components/ValidateEditText/ValidateEditText";
import AppButton from "../../components/AppButton/AppButton";
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from "@gorhom/bottom-sheet";
import { useAppSelector } from "../../store/store";
import ChooseDateView from "./components/ChooseDateView";
import useAuth from "../../hooks/useAuth";
import DatePicker from "react-native-date-picker";
import dayjs from "dayjs";
import {
  checkPhoneValidFirstNumberFn,
  checkPhoneValidFn,
  emailValidFn,
  nameValidFn,
  passLengthValidFn,
} from "../../components/ValidateEditText/ValidateFunctions";


const DetailProfileScreen: React.FC = () => {
  const { colorPallet, theme } = useTheme()
  const { language } = useLanguage();
  const { authData } = useAuth()
  const user = authData?.user;
  const [email,setEmail] = useState(user?.email);
  const [phone,setPhone] = useState('');
  const [name,setName] = useState(user?.name);
  const [isopen,setOpen] = useState(false);
  const [birthDay, setBirthDay] = useState<Date>()
  const [nameValid, setNameValid] = useState(false);
  const [phoneValid, setPhoneValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [isValid, setValid] = useState(false);

  useEffect(() =>{
    if ( !emailValid || !nameValid || !phoneValid){
      setValid(false)
    }else {
      setValid(true)
    }
  },[emailValid ,nameValid ,phoneValid])

  return (
        <SafeAreaView
            style={[AppStyles.container, { backgroundColor: colorPallet.color_background_1 }]}>
            <StatusBar
              barStyle={ theme === 'light' ? "dark-content" : "light-content"}
                backgroundColor={AppColors.color_transparent}
            />
            <AppBar
                title={language?.infoUser}
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

          <KeyboardAvoidingView
            style={{
              justifyContent: "center",
              flex:1
            }}
            keyboardVerticalOffset={150}
          >
            <ScrollView
              style={{
                marginTop: unit24,
                marginHorizontal: unit20,
                flex:1,
              }}
              showsVerticalScrollIndicator={false}
            >

              <View
                style={{
                  alignItems: "center",
                  alignSelf: "center",
                  marginBottom: unit32
                }}
              >
                <Image
                  source={{
                    uri: user?.avatar
                  }}
                  style={{
                    width: unit100,
                    height: unit100,
                    borderRadius: unit20,
                  }}/>

                <PressView  style={{
                  padding: unit4,
                  alignSelf: "center",
                  marginTop: -unit16,
                  borderRadius: unit100,
                  marginBottom: unit8
                }}>
                  <Image
                    source={IC_EDIT_PROFILE}
                    style={{
                      width: unit24,
                      height: unit24
                    }}
                  />
                </PressView>
                <AppText
                  fontType={'regular'}
                  style={{
                    fontSize: fontSize16,
                    color:colorPallet.color_text_blue_3
                  }}
                >
                  {user?.email}
                </AppText>
              </View>


              <ValidateEditText
                colorPallet={colorPallet}
                textValue={name||''}
                setValue={setName}
                contentStyle={{
                  marginBottom: unit20,
                }}
                placeholder={language?.placeholder_name}
                checkValidFunctions={[
                  nameValidFn,
                ]}
                leftIcon={IC_USER}
                tintColorIcon={colorPallet.color_text_gray_3}
                isValid={nameValid}
                setValid={setNameValid}
              />
              <PressView
                onPress={()=>{
                  setOpen(true)
                }}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  borderColor: colorPallet.color_divider_2,
                  borderRadius: unit5,
                  borderWidth: 1,
                  paddingVertical: unit14,
                  paddingHorizontal: unit16,
                  marginBottom: unit20
                }}
              >
                <Image
                  source={IC_CALENDER}
                  style={{
                    width: unit24,
                    height: unit24,
                    tintColor: colorPallet.color_text_gray_3,
                    marginRight: unit8
                  }}
                />
                <AppText
                  fontType={'semiBold'}
                  style={{
                    color:birthDay? colorPallet.color_text_blue_3 : colorPallet.color_text_gray_3,
                    fontSize: fontSize14
                  }}
                >
                  { birthDay? dayjs(birthDay).format("DD/MM/YYYY") : language?.DateTime}
                </AppText>

              </PressView>

              <ValidateEditText
                colorPallet={colorPallet}
                maxLength={10}
                textValue={phone}
                setValue={setPhone}
                contentStyle={{
                  marginBottom: unit20,
                }}
                placeholder={language?.placeholder_phone}
                checkValidFunctions={[
                  checkPhoneValidFirstNumberFn,
                  checkPhoneValidFn,
                ]}
                leftIcon={IC_PHONE}
                isValid={phoneValid}
                setValid={setPhoneValid}
              />

              <ValidateEditText
                colorPallet={colorPallet}
                textValue={email||''}
                setValue={setEmail}
                contentStyle={{
                  marginBottom: unit40,
                }}
                placeholder={language?.placeholder_email}
                checkValidFunctions={[
                  emailValidFn,
                ]}
                leftIcon={IC_EMAIL}
                isValid={emailValid}
                setValid={setEmailValid}
              />

              <AppButton
                buttonTitle={language?.save}
                style={{
                  backgroundColor: isValid? AppColors.color_primary : AppColors.color_opacity,
                }}
                onPress={()=>{}}
                disabled={!isValid}
              />
            </ScrollView>
          </KeyboardAvoidingView>

          {
            isopen?
              <View
                style={[AppStyles.centerContainer, {
                  position: "absolute",
                  backgroundColor: AppColors.color_transparent_dark,
                  width: Dimensions.get("screen").width,
                  height: Dimensions.get("screen").height,
                }]}
              >
                <View
                  style={[{
                    backgroundColor: colorPallet.color_background_1,
                    alignItems: "center",
                    justifyContent: "center",
                    paddingVertical: unit16,
                  }]}
                >
                  <AppText
                    fontType={'bold'}
                    style={{
                      fontSize: fontSize20,
                      color: colorPallet.color_text_blue_1
                    }}
                  >
                    Vui lòng chọn
                  </AppText>

                  <DatePicker
                    mode={'date'}
                    date={birthDay||new Date()}
                    androidVariant={"nativeAndroid"}
                    onDateChange={date => setBirthDay(date)}
                    confirmText={'Xác nhận'}
                    title={'Chọn ngày sinh'}
                    textColor={colorPallet.color_text_gray_1}
                    theme={"dark"}
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      paddingTop: unit20
                    }}
                  >
                    <PressView
                      style={{
                        borderColor: colorPallet.color_background_2,
                        borderWidth: unit1,
                        paddingVertical: unit8,
                        paddingHorizontal: unit20,
                        borderRadius: unit4
                      }}
                      onPress={()=>{
                        setOpen(false);
                      }}
                    >
                      <AppText
                        fontType={'semiBold'}
                        style={{
                          color: colorPallet.color_text_blue_2,
                          fontSize: fontSize12
                        }}
                      >
                        Hủy
                      </AppText>
                    </PressView>

                    <PressView
                      style={{
                        backgroundColor: AppColors.color_primary,
                        paddingVertical: unit8,
                        paddingHorizontal: unit20,
                        borderRadius: unit4,
                        marginLeft: unit16
                      }}
                      onPress={()=>{
                        if (birthDay){
                          setOpen(false)
                        }else {
                          setOpen(false);
                          setBirthDay(new Date());
                        }

                      }}
                    >
                      <AppText
                        fontType={'semiBold'}
                        style={{
                          color: AppColors.color_white,
                          fontSize: fontSize12
                        }}
                      >
                        Xác nhận
                      </AppText>
                    </PressView>
                  </View>

                </View>

              </View>
             : null
          }



        </SafeAreaView>
    )
};

export default DetailProfileScreen;
