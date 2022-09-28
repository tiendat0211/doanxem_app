import React from "react";
import AppText from "../../../components/AppText/AppText";
import PressView from "../../../components/PressView/PressView";
import { useTheme } from "../../../hooks/useTheme";
import AppColors from "../../../styles/AppColors";
import { fontSize14 } from "../../../styles/AppFonts";
import { unit75, unit1, unit16, unit6, unit8 } from "../../../utils/appUnit";


interface SearchComponentProps {
    item: any,
    selectedType: string,
    setSelectedType: React.Dispatch<React.SetStateAction<string>>
}

const SearchComponent: React.FC<SearchComponentProps> = (
    props
) => {
    const {colorPallet} = useTheme()
    const { item, selectedType, setSelectedType } = props

    return (
        <PressView
            style={{
                borderRadius: unit75,
                borderColor: AppColors.color_primary,
                borderWidth: unit1,
                paddingHorizontal: unit16,
                paddingVertical: unit6,
                marginHorizontal: unit8,
                backgroundColor : selectedType === item.type ? 'blue' : undefined
            }}
            onPress={ () => setSelectedType(item.type)}
        >
            <AppText
            fontType="semiBold"
                style={{
                    fontSize: fontSize14,
                    color: selectedType === item.type ? colorPallet.color_background_1 : AppColors.color_primary,
                }}
            >
                {item.script}
            </AppText>
        </PressView>
    )
}
export default SearchComponent