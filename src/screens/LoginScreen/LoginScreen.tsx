import React, { useState } from "react";
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleProp,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import AppStyles from "../../styles/AppStyles";
import { NavigationRef, RootStackParamList } from "../../../App";
import useAuth from "../../hooks/useAuth";
import { unit1, unit12, unit14, unit16, unit20, unit24, unit40, unit6, unit68 } from "../../utils/appUnit";
import { IC_EMAIL, IC_EYE, IC_EYE_SLASH, IC_FACEBOOK, IC_GOOGLE, IC_LOCK } from "../../assets/path";
import { useLanguage } from "../../hooks/useLanguage";
import { useTheme } from "../../hooks/useTheme";
import { fontSize14, fontSize16 } from "../../styles/AppFonts";
import AppText from "../../components/AppText/AppText";
import ValidateEditText from "../../components/ValidateEditText/ValidateEditText";
import AppColors from "../../styles/AppColors";
import AuthenScreenView from "../../components/AuthenScreenView/AuthenScreenView";
import PressView from "../../components/PressView/PressView";
import AppButton from "../../components/AppButton/AppButton";
import AuthenQuestionView from "../../components/AuthenQuestionView/AuthenQuestionView";
import {
  emailValidFn,
  nameValidFn,
  passLengthValidFn,
  passValidFn,
} from "../../components/ValidateEditText/ValidateFunctions";
import { login } from "../../network/AppAPI";
import { showToastError, showToastErrorMessage } from "../../utils/Toaster";
import ApiHelper from "../../utils/ApiHelper";
import useScreenState from "../../hooks/useScreenState";
import AppLoading from "../../components/Loading/AppLoading";

const LoginScreen: React.FC = () => {

  const [email, setEmail] = useState("test12345@gmail.com");
  const [password, setPassword] = useState("12345678");
  const [showPass, setShowPass] = useState(true);
  const [passValid, setPassValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);

  const { signIn } = useAuth();
  const { language } = useLanguage();
  const { colorPallet, theme } = useTheme();

  const { isLoading, setLoading, mounted } = useScreenState();

  async function loadLogin() {
    try {
      setLoading(true);
      const res = await login(email, password);

      if (ApiHelper.isResSuccess(res)) {
        const data = res.data.data;
        signIn({
          user: data.user,
          token: data.token,
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

  return <SafeAreaView
    style={[AppStyles.centerContainer, { backgroundColor: colorPallet.color_background_1 }]}>
    <StatusBar
      barStyle={theme === "light" ? "dark-content" : "light-content"}
      backgroundColor={AppColors.color_transparent}
    />

    {
      isLoading && <AppLoading isOverlay/>
    }

    <KeyboardAvoidingView
      style={{
        justifyContent: "center",
        paddingHorizontal: unit20,
        flex: 1,
      }}
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      keyboardVerticalOffset={ Platform.OS == "ios" ? 0 :150}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
        }}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <AuthenScreenView
            name={language?.login_title}
            slogan={language?.login_slogan}
            style={{
              alignItems: "center",
              marginBottom: unit40,
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
              passValidFn,
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

          <PressView
            onPress={() => {
              NavigationRef.current?.navigate("ForgotPasswordScreen");
            }}
            style={{
              alignItems: "flex-end",
              marginBottom: unit20,
            }}
          >
            <AppText
              fontType={"semiBold"}
              style={{
                textAlign: "center",
                fontSize: fontSize14,
                color: colorPallet.color_text_gray_1,
              }}

            >
              {language?.forgot_password}
            </AppText>
          </PressView>

          <AppButton
            buttonTitle={language?.login}
            onPress={
              loadLogin
            }
          />

          <View
            style={{ paddingVertical: unit68 }}
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
            <View style={{ flexDirection: "row" }}>
              <LoginOptions
                fontType={"bold"}
                title={"Google"}
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
                fontType={"bold"}
                title={"Facebook"}
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
          onPress={() => NavigationRef.current?.navigate("RegisterScreen")}
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
  const { colorPallet, theme } = useTheme();
  return (
    <PressView onPress={onPress}>
      <View
        style={[
          {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: unit14,
            width: (Dimensions.get("screen").width - 65) / 2,
            backgroundColor: colorPallet.color_background_1,
            borderRadius: unit6,
            borderColor: colorPallet.color_divider_2,
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

