import React, { useEffect, useState } from "react";
import {
  Button,
  Dimensions, Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
} from "react-native";
import AppStyles from "../../styles/AppStyles";
import AppBar from "../../components/AppBar/AppBar";
import ValidateEditText from "../../components/ValidateEditText/ValidateEditText";
import { nameLengthValidFn, nameValidFn } from "../../components/ValidateEditText/ValidateFunctions";
import useAuth from "../../hooks/useAuth";
import { useTheme } from "../../hooks/useTheme";
import AuthenScreenView from "../../components/AuthenScreenView/AuthenScreenView";
import {
  unit12,
  unit18,
  unit2,
  unit20,
  unit21,
  unit22,
  unit24,
  unit28,
  unit32,
  unit40,
  unit68,
} from "../../utils/appUnit";
import { useLanguage } from "../../hooks/useLanguage";
import {
  IC_CHECKED,
  IC_EMAIL,
  IC_EYE,
  IC_EYE_SLASH,
  IC_LOCK,
  IC_SECURITY,
  IC_UNCHECK,
  IC_USER,
} from "../../assets/path";
import AppColors from "../../styles/AppColors";
import AppButton from "../../components/AppButton/AppButton";
import AuthenQuestionView from "../../components/AuthenQuestionView/AuthenQuestionView";
import { NavigationRef } from "../../../App";
import AppText from "../../components/AppText/AppText";
import { fontSize14, fontSize16 } from "../../styles/AppFonts";
import PressView from "../../components/PressView/PressView";

const VerifyOTPScreen: React.FC = () => {

  const [email, setEmail] = useState("");
  const [isValid, setValid] = useState(false);
  const [timeFormat, setTimeLeft] = useState(60);
  const [disableClick, setDisableClick] = useState(false);

  const {signIn} = useAuth()
  const {colorPallet} = useTheme()
  const language = useLanguage();

  useEffect(() => {
    if (!timeFormat) return;
    const intervalId = setInterval(() => {
      setTimeLeft(timeFormat - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timeFormat]);



  return <SafeAreaView
    style={[AppStyles.container,{backgroundColor: colorPallet.color_background_1}]}>
    <StatusBar
      barStyle={"dark-content"}
      backgroundColor={AppColors.color_transparent}
    />

    <KeyboardAvoidingView
      style={{
        paddingHorizontal: unit20,
        flex:1,
        marginTop: (Platform.OS === "android" ? StatusBar.currentHeight || 0 : 0) + unit32,
      }}
    >
      <ScrollView>
        <View
          style={{
            marginBottom: unit28,
          }}
        >
          <AuthenScreenView
            name={language?.forgot_password_title}
            slogan={language?.forgot_password_slogan}
            style={{
              alignItems:'center',
              marginBottom:unit40,
            }}
          />

          <ValidateEditText
            colorPallet={colorPallet}
            textValue={email}
            maxLength={10}
            setValue={setEmail}
            contentStyle={{
              marginBottom: unit28,
            }}
            placeholder={language?.placeholder_OTP}
            checkValidFunctions={[
            ]}
            leftIcon={IC_SECURITY}
            tintColorIcon={colorPallet.color_text_gray_3}
            // isValid={phoneValid}
            // setValid={setPhoneValid}
          />

          <AppButton
            buttonTitle={language?.verifyOTP}
            onPress={
              () => {
                NavigationRef.current?.navigate("RestPassWordScreen");
              }
            }
          />
        </View>

        <View
          style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <AppText
            // fontType="medium"
            style={
            {
              color: colorPallet.color_text_blue_3,
              fontSize: fontSize16
            }
          }>
            {language?.haventReceive}
          </AppText>

          <PressView
            disabled={disableClick}
            onPress={() => {
              if (timeFormat === 0) {
                setTimeLeft(60);
              }
            }}>
            <AppText
              style={{
                lineHeight: unit21,
                alignSelf: "center",
                fontSize: fontSize16,
                color:  AppColors.color_primary,
              }}
              fontType={"bold"}>{timeFormat !== 0 ? " Thử lại " : " Thử lại "}</AppText>
          </PressView>
          <AppText
            fontType={"bold"}
            style={{
              lineHeight: unit21,
              alignSelf: "center",
              fontSize: fontSize16,
              color:  AppColors.color_primary,
            }}>{ timeFormat !== 0 ? "(" + timeFormat + "s)" : ""}</AppText>

          </View>
      </ScrollView>

    </KeyboardAvoidingView>


  </SafeAreaView>;
};

export default VerifyOTPScreen;
