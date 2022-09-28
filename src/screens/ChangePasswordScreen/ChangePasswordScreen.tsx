import React, { useState } from "react";
import {
 KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,

} from "react-native";
import AppStyles from "../../styles/AppStyles";
import { NavigationRef } from "../../../App";
import useAuth from "../../hooks/useAuth";
import {
  unit16,
  unit20,
  unit24, unit40, unit5,
} from "../../utils/appUnit";
import {
  IC_ARROWLEFT,
  IC_EYE,
  IC_EYE_SLASH,
  IC_LOCK,
  IC_OLDPASS,
} from "../../assets/path";
import { useLanguage } from "../../hooks/useLanguage";
import { useTheme } from "../../hooks/useTheme";
import ValidateEditText from "../../components/ValidateEditText/ValidateEditText";
import AppColors from "../../styles/AppColors";

import AppBar from "../../components/AppBar/AppBar";
import AppButton from "../../components/AppButton/AppButton";
import PressView from "../../components/PressView/PressView";
import AppText from "../../components/AppText/AppText";
import { fontSize18 } from "../../styles/AppFonts";

const ChangPasswordScreen: React.FC = () => {

  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [newPassAgain, setNewPassAgain] = useState("");
  const [showOldPass, setShowOldPass] = useState(true);
  const [showNewPass, setShowNewPass] = useState(true);
  const [showNewPassAgain, setShowNewPassAgain] = useState(true);

  const { language } = useLanguage();
  const {colorPallet, theme} = useTheme()


  return <SafeAreaView
    style={[AppStyles.centerContainer,{backgroundColor: colorPallet.color_background_1}]}>
    <StatusBar
      barStyle={ theme === 'light' ? "dark-content" : "light-content"}
      backgroundColor={AppColors.color_transparent}
    />

    <AppBar
      title={language?.changPass}
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
        paddingHorizontal: unit20,
        flex:1,
      }}
      keyboardVerticalOffset={150}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow : 1,
          marginVertical: unit24,
        }}
      >
          <ValidateEditText
            colorPallet={colorPallet}
            textValue={oldPass}
            setValue={setOldPass}
            contentStyle={{
              marginBottom: unit20,
            }}
            placeholder={language?.oldPass}
            checkValidFunctions={[
            ]}
            leftIcon={IC_OLDPASS}
            tintColorIcon={colorPallet.color_text_gray_3}
            rightIcon={!showOldPass ? IC_EYE_SLASH : IC_EYE}
            onPress={() => {
              setShowOldPass(!showOldPass);
            }}
            secureTextEntry={showOldPass}
            // isValid={phoneValid}
            // setValid={setPhoneValid}
          />

          <ValidateEditText
            colorPallet={colorPallet}
            textValue={newPass}
            setValue={setNewPass}
            contentStyle={{
              marginBottom: unit20,
            }}
            placeholder={language?.newPass}
            checkValidFunctions={[
            ]}
            leftIcon={IC_LOCK}
            tintColorIcon={colorPallet.color_text_gray_3}
            rightIcon={!showNewPass ? IC_EYE_SLASH : IC_EYE}
            onPress={() => {
              setShowNewPass(!showNewPass);
            }}
            secureTextEntry={showNewPass}
            // isValid={phoneValid}
            // setValid={setPhoneValid}
          />

        <ValidateEditText
          colorPallet={colorPallet}
          textValue={newPassAgain}
          setValue={setNewPassAgain}
          contentStyle={{
            marginBottom: unit40,
          }}
          placeholder={language?.newPassAgain}
          checkValidFunctions={[
          ]}
          leftIcon={IC_LOCK}
          tintColorIcon={colorPallet.color_text_gray_3}
          rightIcon={!showNewPassAgain ? IC_EYE_SLASH : IC_EYE}
          onPress={() => {
            setShowNewPassAgain(!showNewPassAgain);
          }}
          secureTextEntry={showNewPassAgain}
          // isValid={phoneValid}
          // setValid={setPhoneValid}
        />

        <PressView
          style={{
            backgroundColor: AppColors.color_primary,
            borderColor: AppColors.color_primary,
            borderRadius: unit5,
            opacity: 0.3,
          }}
        >
          <AppText
            fontType={"bold"}
            style={{
              color: AppColors.color_white,
              textAlign: "center",
              fontSize: fontSize18,
              paddingVertical: unit16
            }}>
            {language?.save}
          </AppText>
        </PressView>

      </ScrollView>

    </KeyboardAvoidingView>
  </SafeAreaView>;
};

export default ChangPasswordScreen;
