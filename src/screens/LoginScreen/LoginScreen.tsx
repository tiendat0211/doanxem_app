import React, { useState } from "react";
import {
  Button,
  Dimensions,
  Image, KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleProp,
  Text, TextStyle,
  View, ViewStyle,
} from "react-native";
import AppStyles from "../../styles/AppStyles";
import { NavigationRef } from "../../../App";
import useAuth from "../../hooks/useAuth";
import {
  unit1,
  unit12, unit14,
  unit16,
  unit18,
  unit20, unit24,
  unit28,
  unit35, unit36,
  unit38,
  unit40, unit5,
  unit50,
  unit52, unit6,
  unit68,
  unit8,
} from "../../utils/appUnit";
import {
  IC_BUTTON_NEXT,
  IC_EMAIL,
  IC_EYE,
  IC_EYE_SLASH,
  IC_FACEBOOK,
  IC_GOOGLE,
  IC_LOCK,
  IMG_LOGO,
} from "../../assets/path";
import { useLanguage } from "../../hooks/useLanguage";
import { useTheme } from "../../hooks/useTheme";
import { fontSize14, fontSize16, fontSize18, fontSize24 } from "../../styles/AppFonts";
import AppText from "../../components/AppText/AppText";
import ValidateEditText from "../../components/ValidateEditText/ValidateEditText";
import AppColors from "../../styles/AppColors";
import AuthenScreenView from "../../components/AuthenScreenView/AuthenScreenView";
import PressView from "../../components/PressView/PressView";
import AppButton from "../../components/AppButton/AppButton";
import AuthenQuestionView from "../../components/AuthenQuestionView/AuthenQuestionView";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const LoginScreen: React.FC = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(true);


  const { signIn } = useAuth();
  const { language } = useLanguage();
  const {colorPallet} = useTheme()


  return <SafeAreaView
    style={[AppStyles.centerContainer,{backgroundColor: colorPallet.color_background_1}]}>
    <StatusBar
      barStyle={"dark-content"}
      backgroundColor={AppColors.color_transparent}
    />
    <KeyboardAvoidingView
      style={{
        justifyContent: "center",
        paddingHorizontal: unit20,
        flex:1
    }}
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      keyboardVerticalOffset={150}
    >
        <ScrollView
          contentContainerStyle={{
            flexGrow : 1,
            justifyContent: "center",
          }}
        >
          <View>
            <AuthenScreenView
              name={language?.login_title}
              slogan={language?.login_slogan}
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

            <PressView
              onPress={() => {
                NavigationRef.current?.navigate("LoginScreen");
              }}
              style={{
                alignItems: "flex-end",
                marginBottom: unit20,
              }}
            >
              <AppText
                fontType={"regular"}
                style={{
                  textAlign: "center",
                  fontSize: fontSize14,
                  color: colorPallet.color_text_gray_1
                }}
                onPress={ () => {
                  NavigationRef.current?.navigate('ForgotPasswordScreen')
                }
                }
              >
                {language?.forgot_password}
              </AppText>
            </PressView>

            <AppButton
              buttonTitle={language?.login}
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

            <View
              style={{paddingVertical: unit68}}
            >
              <AppText
                fontType={"bold"}
                style={{
                  textAlign: "center",
                  fontSize: fontSize16,
                  color: colorPallet.color_text_gray_1,
                }}
              >
                {language?.optionLogin}
              </AppText>
              <View style={{flexDirection:'row'}}>
                <LoginOptions
                  title={'Google'}
                  imageSource={IC_GOOGLE}
                  contentStyle={{
                    marginTop: unit16,
                    marginRight: unit16,
                  }}
                  textStyle={{
                    color: colorPallet.color_text_blue_3,
                  }}
                />
                <LoginOptions
                  title={'Facebook'}
                  imageSource={IC_FACEBOOK}
                  contentStyle={{
                    marginTop: unit16,
                  }}
                  textStyle={{
                    color: colorPallet.color_text_blue_3,
                  }}
                />
              </View>

            </View>
          </View>
          <AuthenQuestionView
            buttonText={language?.signUp}
            question={language?.questionRegister}
            onPress={() =>  NavigationRef.current?.navigate("RegisterScreen")}
          />
        </ScrollView>

    </KeyboardAvoidingView>
  </SafeAreaView>;
};

export default LoginScreen;

interface LoginOptionsProps {
  title: string;
  imageSource: any;
  contentStyle: StyleProp<ViewStyle> | undefined;
  textStyle: TextStyle;
  onPress?: () => void;
  fontType?: any;
}

const LoginOptions: React.FC<LoginOptionsProps> = ({
                                                     title,
                                                     imageSource,
                                                     fontType,
                                                     textStyle,
                                                     contentStyle,
                                                     onPress,
                                                   }) => {
  const {colorPallet} = useTheme()
  return (
    <PressView onPress={onPress}>
      <View
        style={[
          {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: unit14,
            width: (Dimensions.get('screen').width - 65)/2,
            backgroundColor: AppColors.color_white,
            borderRadius: unit6,
            borderColor:  colorPallet.color_divider_2,
            borderWidth: unit1,
          },
          contentStyle,
        ]}>
        <Image
          source={imageSource}
          style={{
            width: unit24,
            height: unit24,
            marginEnd: unit12,
          }}
        />
        <AppText
          fontType={fontType}
          style={[
            {
              fontSize: fontSize16,
            },
            textStyle,
          ]}>
          {title}
        </AppText>
      </View>
    </PressView>
  );
};

LoginOptions.defaultProps = {
  fontType: "semiBold",
};

