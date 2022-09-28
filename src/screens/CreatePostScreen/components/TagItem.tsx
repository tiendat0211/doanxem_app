import React from "react";
import { Image, Text, View } from "react-native";
import { IC_CLOSE, IC_DELETE_TAG } from "../../../assets/path";
import AppText from "../../../components/AppText/AppText";
import PressView from "../../../components/PressView/PressView";
import { useTheme } from "../../../hooks/useTheme";
import AppColors from "../../../styles/AppColors";
import { unit12, unit14, unit16, unit2, unit20, unit24, unit3, unit4, unit6, unit75, unit8 } from "../../../utils/appUnit";

interface TagItemProps {
    tag: any,
}


const TagItem: React.FC<TagItemProps> = (props) => {
    const { tag } = props
    const { colorPallet } = useTheme()
    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent:'space-between',
                alignItems:'center',
                paddingVertical: unit4,
                marginEnd: unit8,
                paddingHorizontal: unit4,
                borderRadius: unit75,
                borderColor: '#376AED',
                borderWidth: unit2,
                marginBottom:unit8,
            }}>
            <AppText
                fontType="semiBold"
                style={{
                    marginVertical:unit2,
                    marginStart:unit12,
                    fontSize:unit14,
                    lineHeight:unit20,
                    color: AppColors.color_primary,
                }}>
                {tag.name}
            </AppText>
            <PressView
            onPress={()=>{
                console.log('delete',tag.name)
            }}
            style={{
                marginStart:unit8,
                borderRadius:75,
                backgroundColor:'#F2F8FF',
                width:unit24,
                height:unit24,
                alignItems:'center',
                justifyContent:'center'
            }}>
                <Image
                    style={{
                        margin:unit3,
                        width: unit16,
                        height: unit16
                    }}
                    source={IC_DELETE_TAG}
                />
            </PressView>

        </View>
    )
}

export default TagItem