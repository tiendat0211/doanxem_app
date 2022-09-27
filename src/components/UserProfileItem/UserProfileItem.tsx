import { Image, ImageSourcePropType, Platform, TextInput, View, ViewStyle } from "react-native";
import React from "react";
import { AppFonts, dimension, fontSize14, fontSize16, fontSize18 } from "../../styles/AppFonts";
import { useTheme } from "../../hooks/useTheme";
import { useLanguage } from "../../hooks/useLanguage";
import AppStyles from "../../styles/AppStyles";
import { unit10, unit100, unit12, unit16, unit20, unit24, unit36, unit6, unit72, unit73 } from "../../utils/appUnit";
import PressView from "../PressView/PressView";
import { IC_SEARCH2, IMG_LOGO } from "../../assets/path";
import AppColors from "../../styles/AppColors";
import AppText from "../AppText/AppText";

interface UserProfileItem {
    img_src: ImageSourcePropType,
    name: string,
    email: string,
    style?: ViewStyle;
}

const UserProfileItem: React.FC<UserProfileItem> = (props) => {
    let { img_src, name, email, style } = props;
    const { colorPallet } = useTheme();
    return (
        <>
            <View
                style={[style, {
                    marginHorizontal: unit20,
                    borderRadius: unit16,
                    backgroundColor: AppColors.color_white,
                    paddingHorizontal: unit20,
                    paddingVertical: unit16,
                    flexDirection: 'row',
                }]}
            >
                <Image
                    source={img_src}
                    style={{
                        height: unit72,
                        width: unit72,
                        marginRight: unit20
                    }}
                />
                <View
                    style={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }}
                >
                    <AppText
                        style={{
                            color: colorPallet.color_text_blue_1,
                            fontSize: fontSize18,
                            paddingBottom: unit6,
                        }}
                    >
                        {name}
                    </AppText>
                    <AppText
                        style={{
                            color: colorPallet.color_text_gray_3,
                            fontSize: fontSize14,
                            paddingBottom: unit6,
                        }}
                    >
                        {email}
                    </AppText>
                </View>
            </View>
        </>
    )

};
export default UserProfileItem;
