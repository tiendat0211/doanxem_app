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
import { nameLengthValidFn, nameValidFn } from "../../components/ValidateEditText/ValidateFunctions";
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

const RegisterScreen: React.FC = () => {

  const [registerName, setRegisterName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [showPass, setShowPass] = useState(true);
  const [showRepeatPass, setShowRepeatPass] = useState(true);
  const [check, setCheck] = useState(false);

  const [isValid, setValid] = useState(false);
  const {signIn} = useAuth()
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
        justifyContent: "center",
        paddingHorizontal: unit20,
        flex:1,
        marginTop: (Platform.OS === "android" ? StatusBar.currentHeight || 0 : 0) + unit32,
      }}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow : 1,
          justifyContent: "center",
        }}
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
            ]}
            leftIcon={IC_USER}
            tintColorIcon={colorPallet.color_text_gray_3}
            // isValid={phoneValid}
            // setValid={setPhoneValid}
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
            ]}
            leftIcon={IC_EMAIL}
            tintColorIcon={colorPallet.color_text_gray_3}
            // isValid={phoneValid}
            // setValid={setPhoneValid}
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
            ]}
            leftIcon={IC_LOCK}
            tintColorIcon={colorPallet.color_text_gray_3}
            rightIcon={!showPass ? IC_EYE_SLASH : IC_EYE}
            onPress={() => {
              setShowPass(!showPass);
            }}
            secureTextEntry={showPass}
            // isValid={phoneValid}
            // setValid={setPhoneValid}
          />

          <ValidateEditText
            colorPallet={colorPallet}
            textValue={repeatPassword}
            setValue={setRepeatPassword}
            contentStyle={{
              marginBottom: unit20,
            }}
            placeholder={language?.placeholder_repeatPass}
            checkValidFunctions={[
            ]}
            leftIcon={IC_LOCK}
            tintColorIcon={colorPallet.color_text_gray_3}
            rightIcon={!showRepeatPass ? IC_EYE_SLASH : IC_EYE}
            onPress={() => {
              setShowRepeatPass(!showRepeatPass);
            }}
            secureTextEntry={showRepeatPass}
            // isValid={phoneValid}
            // setValid={setPhoneValid}
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
            onPress={
              () => {
                signIn({
                  user: {
                    username: registerName
                  }
                })
              }
            }
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
