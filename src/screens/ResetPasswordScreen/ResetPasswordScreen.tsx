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
import AppText from "../../components/AppText/AppText";
import { fontSize14, fontSize16 } from "../../styles/AppFonts";


const ResetPasswordScreen: React.FC = () => {

  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [showPass, setShowPass] = useState(true);
  const [showRepeatPass, setShowRepeatPass] = useState(true);
  const [isValid, setValid] = useState(false);

  const {signIn} = useAuth()
  const {colorPallet} = useTheme()
  const language = useLanguage();



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
            name={language?.resetPass_title}
            slogan={language?.resetPass_slogan}
            style={{
              alignItems:'center',
              marginBottom:unit40,
            }}
          />

          <ValidateEditText
            colorPallet={colorPallet}
            textValue={password}
            maxLength={10}
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
            maxLength={10}
            setValue={setRepeatPassword}
            contentStyle={{
              marginBottom: unit28,
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

          <AppButton
            buttonTitle={language?.toHome}
            onPress={
              () => {
                signIn({
                  user: {
                    username: "Dung Nguyen BKA"
                  }
                })
              }
            }
          />
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  </SafeAreaView>;
};

export default ResetPasswordScreen;
