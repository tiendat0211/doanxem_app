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
import { emailValidFn, nameValidFn, passLengthValidFn } from "../../components/ValidateEditText/ValidateFunctions";
import useAuth from "../../hooks/useAuth";
import { useTheme } from "../../hooks/useTheme";
import AuthenScreenView from "../../components/AuthenScreenView/AuthenScreenView";
import { unit12, unit18, unit2, unit20, unit22, unit24, unit32, unit40, unit52, unit68 } from "../../utils/appUnit";
import { useLanguage } from "../../hooks/useLanguage";
import { IC_CHECKED, IC_EMAIL, IC_EYE, IC_EYE_SLASH, IC_LOCK, IC_UNCHECK, IC_USER } from "../../assets/path";
import AppColors from "../../styles/AppColors";
import AppButton from "../../components/AppButton/AppButton";
import AuthenQuestionView from "../../components/AuthenQuestionView/AuthenQuestionView";
import { NavigationRef } from "../../../App";
import AppText from "../../components/AppText/AppText";
import { fontSize14 } from "../../styles/AppFonts";
import PressView from "../../components/PressView/PressView";
import { FIRST_PAGE, login, register } from "../../network/AppAPI";
import { showToastError, showToastErrorMessage, showToastMsg } from "../../utils/Toaster";
import AppLoading from "../../components/Loading/AppLoading";
import useScreenState from "../../hooks/useScreenState";
import ApiHelper from "../../utils/ApiHelper";

const RegisterScreen: React.FC = () => {

  const [registerName, setRegisterName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(true);
  const [showRepeatPass, setShowRepeatPass] = useState(true);
  const [check, setCheck] = useState(false);
  const [valid, setValid] = useState(false);

  const [nameValid, setNameValid] = useState(false)
  const [emailValid, setEmailValid] = useState(false)
  const [passValid, setPassValid] = useState(false)
  const [confirmValid, setConfirmValid] = useState(false)

  const {signIn} = useAuth()
  const {colorPallet, theme} = useTheme()
  const { language } = useLanguage();

  const { isLoading, setLoading, mounted } = useScreenState();

  const confirmPassValidFn = (input: string): [boolean, string?] => {
    return [input === password, "Mật khẩu không khớp"];
  };

  async function loadRegister() {
    try {
      const res = await register(email, password, registerName,confirm);
      if (ApiHelper.isResSuccess(res)) {
        const data = res.data.data;
        signIn({
          user: data,
        });
      } else {
        showToastErrorMessage(res.data.message);
      }
    } catch (e) {
      showToastError(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() =>{
    if ( !emailValid || !passValid || !nameValid || !confirmValid || !check){
      setValid(false)
    }else {
      setValid(true)
    }
  },[emailValid ,passValid,nameValid ,confirmValid, check])




  return <SafeAreaView
    style={[AppStyles.container,{backgroundColor: colorPallet.color_background_1}]}>
    <StatusBar
      barStyle={ theme === 'light' ? "dark-content" : "light-content"}
      backgroundColor={AppColors.color_transparent}
    />

    {
      isLoading && <AppLoading isOverlay/>
    }

    <KeyboardAvoidingView
      style={{
        justifyContent: "center",
        paddingHorizontal: unit20,
        flex:1,
        marginTop: (Platform.OS === "android" ? StatusBar.currentHeight || 0 : 0) + unit32,
        marginBottom: unit20
      }}
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      keyboardVerticalOffset={ Platform.OS == "ios" ? 0 :150}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow : 1,
          justifyContent: "center",
        }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            marginBottom: unit40,
          }}
        >
          <AuthenScreenView
            name={language?.register_title}
            slogan={language?.register_slogan}
            style={{
              alignItems:'center',
              marginBottom:unit40,
            }}
          />

          <ValidateEditText
            colorPallet={colorPallet}
            textValue={registerName}
            setValue={setRegisterName}
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

          <ValidateEditText
            colorPallet={colorPallet}
            textValue={email}
            setValue={setEmail}
            contentStyle={{
              marginBottom: unit20,
            }}
            placeholder={language?.placeholder_email}
            checkValidFunctions={[
              emailValidFn,
            ]}
            leftIcon={IC_EMAIL}
            tintColorIcon={colorPallet.color_text_gray_3}
            isValid={emailValid}
            setValid={setEmailValid}
          />

          <ValidateEditText
            colorPallet={colorPallet}
            textValue={password}
            setValue={setPassword}
            contentStyle={{
              marginBottom: unit20,
            }}
            placeholder={language?.placeholder_password}
            checkValidFunctions={[
              passLengthValidFn,
            ]}
            leftIcon={IC_LOCK}
            tintColorIcon={colorPallet.color_text_gray_3}
            rightIcon={!showPass ? IC_EYE_SLASH : IC_EYE}
            onPress={() => {
              setShowPass(!showPass);
            }}
            secureTextEntry={showPass}
            isValid={passValid}
            setValid={setPassValid}
          />

          <ValidateEditText
            colorPallet={colorPallet}
            textValue={confirm}
            setValue={setConfirm}
            contentStyle={{
              marginBottom: unit20,
            }}
            placeholder={language?.placeholder_repeatPass}
            checkValidFunctions={[
              confirmPassValidFn,
              passLengthValidFn,
            ]}
            leftIcon={IC_LOCK}
            tintColorIcon={colorPallet.color_text_gray_3}
            rightIcon={!showRepeatPass ? IC_EYE_SLASH : IC_EYE}
            onPress={() => {
              setShowRepeatPass(!showRepeatPass);
            }}
            secureTextEntry={showRepeatPass}
            isValid={confirmValid}
            setValid={setConfirmValid}
          />

          <View
            style={{
              flexDirection:'row',
              alignItems:'center',
              marginTop: unit2,
              paddingBottom: unit68
          }}
          >
            <PressView
              onPress={() => {
                setCheck(!check);
              }}
              style={{marginRight: unit12}}
            >
              <Image
                source={check? IC_CHECKED : IC_UNCHECK}
                style={{height: unit24, width: unit24}}
              />
            </PressView>

            <View
              style={{flexDirection: 'row'}}
            >
              <AppText
                style={{
                  fontSize: fontSize14,
                  color: colorPallet.color_text_blue_3,
                }}
              >
                {language?.acceptTo}

              </AppText>
              <PressView
                onPress={() => {
                  NavigationRef.current?.navigate('RuleWithLoginScreen');
                }}
              >
                <AppText
                  style={{
                    fontSize: fontSize14,
                    color: AppColors.color_primary,
                  }}
                >
                  {language?.rule}
                </AppText>
              </PressView>
            </View>
          </View>


          <AppButton
            buttonTitle={language?.register}
            style={{
              backgroundColor: valid? AppColors.color_primary : AppColors.color_opacity,
            }}
            onPress={
              loadRegister
           }
            disabled={!valid}
          />
        </View>

        <AuthenQuestionView
          buttonText={language?.toLogin}
          question={language?.questionHaveAccount}
          onPress={() =>  NavigationRef.current?.navigate("LoginScreen")}
        />
      </ScrollView>

    </KeyboardAvoidingView>


  </SafeAreaView>;
};

export default RegisterScreen;
