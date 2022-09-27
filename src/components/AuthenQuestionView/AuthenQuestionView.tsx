import { unit12, unit20, unit8 } from "../../utils/appUnit";
import {fontSize16} from '../../styles/AppFonts';
import {StyleSheet, View, ViewStyle} from 'react-native';
import AppColors from '../../styles/AppColors';
import React from 'react';
import {NavigationRef} from '../../../App';
import AppText from '../AppText/AppText';
import PressView from '../PressView/PressView';
import { useTheme } from "../../hooks/useTheme";
interface AuthenQuestionViewProps {
  question: string;
  buttonText: string;
  onPress: () => void;
  style?: ViewStyle;
}

const AuthenQuestionView: React.FC<AuthenQuestionViewProps> = ({
  question,
  style,
  buttonText,
  onPress,
}) => {
  const {colorPallet, theme} = useTheme();
  return (
    <View style={style}>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <AppText
          fontType="regular"
          style={
            {
              color: theme === 'light' ? colorPallet.color_text_blue_3 : colorPallet.color_text_gray_1,
              fontSize: fontSize16
            }
          }>
          {question}
        </AppText>
        <PressView onPress={onPress}>
          <AppText
            fontType="bold"
            style={{
              color: AppColors.color_primary,
              marginLeft: unit12,
              fontSize: fontSize16
            }}
          >
            {buttonText}
          </AppText>
        </PressView>
      </View>
    </View>
  );
};


export default AuthenQuestionView;
