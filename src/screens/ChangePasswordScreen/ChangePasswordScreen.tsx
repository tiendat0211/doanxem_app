import React, { useEffect, useState } from "react";
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
import { passLengthValidFn } from "../../components/ValidateEditText/ValidateFunctions";
import { changePassword, register } from "../../network/AppAPI";
import ApiHelper from "../../utils/ApiHelper";
import { showToastError, showToastErrorMessage, showToastMsg } from "../../utils/Toaster";
import useScreenState from "../../hooks/useScreenState";
import AppLoading from "../../components/Loading/AppLoading";

const ChangPasswordScreen: React.FC = () => {

  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showOldPass, setShowOldPass] = useState(true);
  const [showNewPass, setShowNewPass] = useState(true);
  const [showConfirm, setShowConfirm] = useState(true);
  const [oldValid, setOldValid] = useState(false);
  const [newValid, setNewValid] = useState(false);
  const [confirmValid, setConfirmValid] = useState(false);
  const [isValid, setValid] = useState(false);

  const { language } = useLanguage();
  const {colorPallet, theme} = useTheme();

  const confirmPassValidFn = (input: string): [boolean, string?] => {
    return [input === newPass, "Mật khẩu không khớp"];
  };

  const confirmNewPassValidFn = (input: string): [boolean, string?] => {
    return [input !== oldPass, "Mật khẩu không được trùng với mật khẩu cũ"];
  };

  const { isLoading, setLoading, mounted } = useScreenState();

  async function changePass() {
    try {
      const res = await changePassword(oldPass,newPass,confirm);
      if (ApiHelper.isResSuccess(res)) {
       showToastMsg(res?.data?.message)
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
    if ( !newValid || !oldValid ||  !confirmValid){
      setValid(false)
    }else {
      setValid(true)
    }
  },[newValid ,oldValid,confirmValid])


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
              passLengthValidFn
            ]}
            leftIcon={IC_OLDPASS}
            tintColorIcon={colorPallet.color_text_gray_3}
            rightIcon={!showOldPass ? IC_EYE_SLASH : IC_EYE}
            onPress={() => {
              setShowOldPass(!showOldPass);
            }}
            secureTextEntry={showOldPass}
            isValid={oldValid}
            setValid={setOldValid}
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
              passLengthValidFn,
              confirmNewPassValidFn,
            ]}
            leftIcon={IC_LOCK}
            tintColorIcon={colorPallet.color_text_gray_3}
            rightIcon={!showNewPass ? IC_EYE_SLASH : IC_EYE}
            onPress={() => {
              setShowNewPass(!showNewPass);
            }}
            secureTextEntry={showNewPass}
            isValid={newValid}
            setValid={setNewValid}
          />

        <ValidateEditText
          colorPallet={colorPallet}
          textValue={confirm}
          setValue={setConfirm}
          contentStyle={{
            marginBottom: unit40,
          }}
          placeholder={language?.newPassAgain}
          checkValidFunctions={[
            confirmPassValidFn,
            passLengthValidFn,
            confirmNewPassValidFn
          ]}
          leftIcon={IC_LOCK}
          tintColorIcon={colorPallet.color_text_gray_3}
          rightIcon={!showConfirm ? IC_EYE_SLASH : IC_EYE}
          onPress={() => {
            setShowConfirm(!showConfirm);
          }}
          secureTextEntry={showConfirm}
          isValid={confirmValid}
          setValid={setConfirmValid}
        />


        <AppButton
          buttonTitle={language?.register}
          style={{
            backgroundColor: isValid? AppColors.color_primary : AppColors.color_opacity,
          }}
          onPress={
            changePass
          }
          disabled={!isValid}
        />

      </ScrollView>

    </KeyboardAvoidingView>

    {
      isLoading? <AppLoading isOverlay/> : null
    }
  </SafeAreaView>;
};

export default ChangPasswordScreen;
