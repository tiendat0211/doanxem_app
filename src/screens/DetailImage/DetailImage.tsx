import React from "react";
import {Dimensions, SafeAreaView, StatusBar, View} from "react-native";
import { useTheme } from "../../hooks/useTheme";
import AppStyles from "../../styles/AppStyles";
import ImageViewer from 'react-native-image-zoom-viewer';
import AppColors from "../../styles/AppColors";
import { RouteProp, useRoute } from "@react-navigation/native";
import { NavigationRef, RootStackParamList } from "../../../App";
import VideoPlayer from "react-native-video-player";
import AppBar from "../../components/AppBar/AppBar";
import { IC_ARROWLEFT } from "../../assets/path";
import {unit100, unit150} from "../../utils/appUnit";

type DetailImageScreenProps = RouteProp<RootStackParamList, "DetailImage">;

const DetailImage: React.FC = () => {
  const { img_url , thumbnail} = useRoute<DetailImageScreenProps>().params;
  const {colorPallet} = useTheme();

  return (
    <>
      <SafeAreaView
        style={[AppStyles.container,{backgroundColor: 'black'}]}>
        <StatusBar
          barStyle={"light-content" }
          backgroundColor={AppColors.color_transparent}
        />
        <AppBar
        title=""
        leftIcon={IC_ARROWLEFT}
        containerStyle={{
          backgroundColor:AppColors.color_transparent_dark,
          borderBottomWidth:0
        }}
        leftIconOnClick={()=>{
          NavigationRef.current?.goBack()
        }}
        leftIconStyle={{
          tintColor: AppColors.color_white
        }}
        />
          {
            img_url?.endsWith('mp4')
              ? <VideoPlayer
                video={{ uri: img_url}}
                videoWidth={Dimensions.get('screen').width}
                videoHeight={Dimensions.get('screen').width}
                showDuration={true}
                defaultMuted={true}
                thumbnail={{uri: thumbnail}}
                customStyles={{
                  playArrow: {
                    color: AppColors.color_white,
                  }
                }}
                style={{marginTop: unit100}}
              />:
              <ImageViewer
                imageUrls={[{
                  url: img_url||''
                }]}
                //renderHeader={}
                onSwipeDown={()=>{
                  NavigationRef.current?.goBack()
                }}

              />
          }


      </SafeAreaView>
    </>
  )
};

export default DetailImage;
