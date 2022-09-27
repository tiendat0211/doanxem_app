import React, { useState } from "react";
import { FlatList, Image, SafeAreaView, StatusBar, Text, View, ViewStyle } from "react-native";
import AppStyles from "../../styles/AppStyles";
import AppColors from "../../styles/AppColors";
import { useTheme } from "../../hooks/useTheme";
import { unit100, unit12, unit16, unit17, unit20, unit24, unit32, unit36, unit5 } from "../../utils/appUnit";
import { IC_ARROWLEFT, IC_CHECK2, IC_EMAIL, IC_ENGLISH, IC_TRASH, IC_VIETNAM, IMG_LOGO, } from "../../assets/path";
import AppText from "../../components/AppText/AppText";
import { useLanguage } from "../../hooks/useLanguage";
import { fontSize16, fontSize18, fontSize20 } from "../../styles/AppFonts";
import PressView from "../../components/PressView/PressView";
import { NavigationRef } from "../../../App";
import AppBar from "../../components/AppBar/AppBar";
import ValidateEditText from "../../components/ValidateEditText/ValidateEditText";


const DetailProfileScreen: React.FC = () => {
    const { colorPallet } = useTheme()
    const language = useLanguage();

    const [email,setEmail] = useState("Doitraicolieu");

    return (
        <SafeAreaView
            style={[AppStyles.container, { backgroundColor: colorPallet.color_background_1 }]}>
            <StatusBar
                barStyle={"dark-content"}
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

            <View 
                style={{
                    marginTop: unit32,
                    marginHorizontal: unit20
                }}
            >
            <ValidateEditText
                colorPallet={colorPallet}
                textValue={email}
                maxLength={10}
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
            </View>

          

        </SafeAreaView>
    )
};

export default DetailProfileScreen;
