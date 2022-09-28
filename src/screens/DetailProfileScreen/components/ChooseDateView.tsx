import React, { useState } from "react";
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from "@gorhom/bottom-sheet";
import { useTheme } from "../../../hooks/useTheme";
import { useLanguage } from "../../../hooks/useLanguage";
import DatePicker from "react-native-date-picker";
import { unit200 } from "../../../utils/appUnit";

interface ChooseDateViewProps {
  width: number,
  selectedStartDate: Date,
  setSelectedStartDate: React.Dispatch<React.SetStateAction<Date>>,
  localeCode: string,
  closeBottomSheet: () => void,
}

 function ChooseDateView (props:ChooseDateViewProps) {
  const {
    selectedStartDate,
    setSelectedStartDate,
    closeBottomSheet,
    width,
    localeCode,
  } = props;
   const { colorPallet, theme } = useTheme()
  const [draftSelectedStartDate, setDraftSelectedStartDate] = useState(selectedStartDate);
  const { language } = useLanguage();

  function closeBottom() {
    closeBottomSheet();
    setSelectedStartDate(draftSelectedStartDate);
  }

  return <>
    <DatePicker
      androidVariant={"nativeAndroid"}
      textColor={colorPallet.color_text_gray_3}
      minimumDate={new Date()}
      onDateChange={date => setDraftSelectedStartDate(date)}
      theme={"dark"}
      style={{
        width: width,
        height: unit200,
      }}
      mode={"datetime"}
      minuteInterval={15}
      locale={localeCode}
      date={draftSelectedStartDate ? draftSelectedStartDate : new Date()} />

    {/*<LinearButton*/}
    {/*  titleStyle={styles.confirmBtnTitle}*/}
    {/*  linearStyle={{*/}
    {/*    marginHorizontal: unit16,*/}
    {/*  }}*/}
    {/*  onPress={closeBottom}*/}
    {/*  buttonTitle={language.Confirm} />*/}
  </>;
}
export default ChooseDateView;
