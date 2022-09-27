import React, { useRef, useState } from "react";
import { Dimensions, FlatList, Image, SafeAreaView, ScrollView, StatusBar, Text, View, ViewStyle } from "react-native";
import AppStyles from "../../styles/AppStyles";
import AppColors from "../../styles/AppColors";
import { useTheme } from "../../hooks/useTheme";
import {
  unit100,
  unit12,
  unit14,
  unit16,
  unit17, unit18,
  unit20,
  unit24, unit300,
  unit32,
  unit36, unit4, unit40,
  unit5,
  unit8,
} from "../../utils/appUnit";
import {
  IC_ARROWLEFT,
  IC_CALENDER,
  IC_CHECK2, IC_EDIT_PROFILE,
  IC_EMAIL,
  IC_ENGLISH, IC_LOCK, IC_PHONE,
  IC_TRASH,
  IC_VIETNAM,
  IMG_LOGO,
} from "../../assets/path";
import AppText from "../../components/AppText/AppText";
import { useLanguage } from "../../hooks/useLanguage";
import { fontSize14, fontSize16, fontSize18, fontSize20 } from "../../styles/AppFonts";
import PressView from "../../components/PressView/PressView";
import { NavigationRef } from "../../../App";
import AppBar from "../../components/AppBar/AppBar";
import ValidateEditText from "../../components/ValidateEditText/ValidateEditText";
import AppButton from "../../components/AppButton/AppButton";
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from "@gorhom/bottom-sheet";
import ChooseDateView from "./components/ChooseDateView";
import { useAppSelector } from "../../store/store";


const DetailProfileScreen: React.FC = () => {
  const { colorPallet } = useTheme()
  const { language } = useLanguage();
  const bottomSheetRef = useRef<BottomSheet>();
  const [startDateTime, setStartDateTime] = useState<Date>();
  const [email,setEmail] = useState("nguyenvana@gmai.com");
  const [phone,setPhone] = useState("0583978668");
  const [name,setName] = useState("Doitraicolieu");
  const localeCode = useAppSelector(state => state.setting.lang);

  function openBottomSheet() {
    bottomSheetRef.current?.snapToIndex(0);
  }

  function updateStartDate(newStartDate: any) {
    if (newStartDate) {
      setStartDateTime(newStartDate);
    }
  }

  function closeBottomSheet() {
    bottomSheetRef.current?.close();
    const newStartDate = new Date();
    updateStartDate(newStartDate);
  }

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

            <ScrollView
                style={{
                    marginTop: unit24,
                    marginHorizontal: unit20
                }}
            >

              <View
                style={{
                  alignItems: "center",
                  alignSelf: "center",
                  marginBottom: unit32
                }}
              >
                <Image
                  source={IMG_LOGO}
                  style={{
                    width: unit100,
                    height: unit100,
                    borderRadius: unit20,
                  }}/>

                <PressView  style={{
                  padding: unit4,
                  alignSelf: "center",
                  marginTop: -unit16,
                  borderRadius: unit100,
                  marginBottom: unit8
                }}>
                  <Image
                    source={IC_EDIT_PROFILE}
                    style={{
                      width: unit24,
                      height: unit24
                    }}
                  />
                </PressView>
                <AppText
                  style={{
                    fontSize: fontSize16,
                  }}
                >
                  @ngoclongg2010
                </AppText>
              </View>


            <ValidateEditText
                colorPallet={colorPallet}
                textValue={name}
                setValue={setName}
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
              <PressView
                onPress={openBottomSheet}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  borderColor: colorPallet.color_divider_2,
                  borderRadius: unit5,
                  borderWidth: 1,
                  paddingVertical: unit14,
                  paddingHorizontal: unit16,
                  marginBottom: unit20
                }}
              >
                <Image
                  source={IC_CALENDER}
                  style={{
                    width: unit24,
                    height: unit24,
                    tintColor: colorPallet.color_text_gray_3,
                    marginRight: unit8
                  }}
                />
                <AppText
                  style={{
                    color:colorPallet.color_text_gray_3,
                    fontSize: fontSize14
                  }}
                >
                  {language?.DateTime}
                </AppText>

              </PressView>

              <ValidateEditText
                colorPallet={colorPallet}
                maxLength={10}
                textValue={phone}
                setValue={setPhone}
                contentStyle={{
                  marginBottom: unit20,
                }}
                placeholder={language?.placeholder_email}
                checkValidFunctions={[
                ]}
                leftIcon={IC_PHONE}
                // isValid={phoneValid}
                // setValid={setPhoneValid}
              />

              <ValidateEditText
                colorPallet={colorPallet}
                textValue={email}
                setValue={setEmail}
                contentStyle={{
                  marginBottom: unit40,
                }}
                placeholder={language?.placeholder_email}
                checkValidFunctions={[
                ]}
                leftIcon={IC_LOCK}
                // isValid={phoneValid}
                // setValid={setPhoneValid}
              />

              <AppButton
                buttonTitle={language?.save}
                onPress={() => {}}
              />
            </ScrollView>

          {/*<BottomSheet*/}
          {/*  backgroundStyle={{*/}
          {/*    backgroundColor: colorPallet.color_background_3,*/}
          {/*  }}*/}
          {/*  backdropComponent={(props) =>*/}
          {/*    <BottomSheetBackdrop*/}
          {/*      {...props}*/}
          {/*      enableTouchThrough={false}*/}
          {/*      disappearsOnIndex={-1}*/}
          {/*      appearsOnIndex={0}*/}
          {/*      pressBehavior={"close"}*/}
          {/*    />*/}
          {/*  }*/}
          {/*  ref={bottomSheetRef}*/}
          {/*  index={-1}*/}
          {/*  snapPoints={[unit300]}>*/}
          {/*  <BottomSheetView*/}
          {/*    style={AppStyles.bottomSheetView}>*/}

          {/*    <ChooseDateView*/}
          {/*      selectedStartDate={startDateTime}*/}
          {/*      setSelectedStartDate={setStartDateTime}*/}
          {/*      closeBottomSheet={closeBottomSheet}*/}
          {/*      width={Dimensions.get("screen").width}*/}
          {/*      localeCode={localeCode}*/}
          {/*    />*/}

          {/*  </BottomSheetView>*/}
          {/*</BottomSheet>*/}

        </SafeAreaView>
    )
};

export default DetailProfileScreen;
