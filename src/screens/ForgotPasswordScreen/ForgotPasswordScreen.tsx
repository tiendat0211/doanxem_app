import React, { useState } from "react";
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
import { useTheme } from "../../hooks/useTheme";
import AuthenScreenView from "../../components/AuthenScreenView/AuthenScreenView";
import { unit12, unit18, unit2, unit20, unit22, unit24, unit28, unit32, unit40, unit68 } from "../../utils/appUnit";
import { useLanguage } from "../../hooks/useLanguage";
import { IC_CHECKED, IC_EMAIL, IC_EYE, IC_EYE_SLASH, IC_LOCK, IC_UNCHECK, IC_USER } from "../../assets/path";
import AppColors from "../../styles/AppColors";
import AppButton from "../../components/AppButton/AppButton";
import AuthenQuestionView from "../../components/AuthenQuestionView/AuthenQuestionView";
import { NavigationRef } from "../../../App";
import AppText from "../../components/AppText/AppText";
import { fontSize14 } from "../../styles/AppFonts";
import PressView from "../../components/PressView/PressView";
import { emailValidFn } from "../../components/ValidateEditText/ValidateFunctions";

const ForgotPasswordScreen: React.FC = () => {

  const [email, setEmail] = useState("");

  const [isValid, setValid] = useState(false);
  const {colorPallet, theme} = useTheme()
  const { language } = useLanguage();


  return <SafeAreaView
    style={[AppStyles.container,{backgroundColor: colorPallet.color_background_1}]}>
    <StatusBar
      barStyle={ theme === 'light' ? "dark-content" : "light-content"}
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
            setValue={setEmail}
            contentStyle={{
              marginBottom: unit28,
            }}
            placeholder={language?.email}
            checkValidFunctions={[
              emailValidFn
            ]}
            leftIcon={IC_EMAIL}
            tintColorIcon={colorPallet.color_text_gray_3}
            isValid={isValid}
            setValid={setValid}
          />

          <AppButton
            buttonTitle={language?.receiveOTP}
            onPress={
              () => { NavigationRef.current?.navigate('VerifyOTPScreen')}
            }
            style={{
              backgroundColor: isValid? AppColors.color_primary : AppColors.color_opacity,
            }}
            disabled={!isValid}
          />
        </View>

        <AuthenQuestionView
          buttonText={language?.loginAgain}
          question={language?.questionLoginAgain}
          onPress={() =>  NavigationRef.current?.navigate("LoginScreen")}
        />
      </ScrollView>

    </KeyboardAvoidingView>


  </SafeAreaView>;
};

export default ForgotPasswordScreen;
