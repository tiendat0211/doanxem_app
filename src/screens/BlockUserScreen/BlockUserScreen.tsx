import React from "react";
import { FlatList, Image, SafeAreaView, StatusBar, Text, View, ViewStyle } from "react-native";
import AppStyles from "../../styles/AppStyles";
import AppColors from "../../styles/AppColors";
import { useTheme } from "../../hooks/useTheme";
import { unit100, unit12, unit16, unit17, unit20, unit24, unit32, unit36, unit5 } from "../../utils/appUnit";
import { IC_ARROWLEFT, IC_CHECK2, IC_ENGLISH, IC_TRASH, IC_VIETNAM, IMG_LOGO, } from "../../assets/path";
import AppText from "../../components/AppText/AppText";
import { useLanguage } from "../../hooks/useLanguage";
import { fontSize16, fontSize18, fontSize20 } from "../../styles/AppFonts";
import PressView from "../../components/PressView/PressView";
import { NavigationRef } from "../../../App";
import AppBar from "../../components/AppBar/AppBar";


const Fakedata: BlockItemProps[] = [
    {
        img_src: IMG_LOGO,
        name: 'dmcuocdoi',
        onPress: () => {

        },
    },
    {
        img_src: IMG_LOGO,
        name: 'songtiepdi',
        onPress: () => {

        },
    },
]

const BlockUserScreen: React.FC = () => {
    const { colorPallet } = useTheme()
    const language = useLanguage();

    return (
        <SafeAreaView
            style={[AppStyles.container, { backgroundColor: colorPallet.color_background_1 }]}>
            <StatusBar
                barStyle={"dark-content"}
                backgroundColor={AppColors.color_transparent}
            />
            <AppBar
                title={language?.blockUser}
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
                rightIcon={IC_TRASH}
                rightIconStyle={{
                    tintColor: colorPallet.color_text_blue_1,
                }}
            />

            <FlatList
                showsHorizontalScrollIndicator={false}
                data={Fakedata}
                renderItem={({ item, index }) => {
                    return <BlockItem
                        img_src={item.img_src}
                        name={item.name}
                        onPress={item.onPress}
                    />
                }}
            />

        </SafeAreaView>
    )
};

export default BlockUserScreen;

interface BlockItemProps {
    img_src: any,
    name: string,
    onPress?(): any,
}

const BlockItem: React.FC<BlockItemProps> = (props) => {
    const { img_src, name, onPress } = props;
    const { colorPallet } = useTheme()
    return (
        <>
            <PressView
                style={{
                    flexDirection: 'row',
                    marginHorizontal: unit20,
                    alignItems: 'center',
                    paddingVertical: unit12,
                }}
                onPress={onPress}
            >
                <Image
                    source={img_src}
                    style={{
                        width: unit36,
                        height: unit36,
                        marginRight: unit16,
                        borderRadius: unit100,
                    }}
                />
                <AppText
                    style={{
                        fontSize: fontSize16,
                        color: colorPallet.color_text_blue_3,
                        flexGrow: 1,
                    }}
                >
                    {name}
                </AppText>
                <Image
                    source={IC_TRASH}
                    style={{
                        width: unit24,
                        height: unit24,
                        tintColor: colorPallet.color_text_gray_3,
                    }}
                />
            </PressView>
        </>
    );
}


