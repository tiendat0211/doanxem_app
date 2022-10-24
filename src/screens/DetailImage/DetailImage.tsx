import React from "react";
import {Dimensions, SafeAreaView, StatusBar} from "react-native";
import { useTheme } from "../../hooks/useTheme";
import AppStyles from "../../styles/AppStyles";
import ImageViewer from 'react-native-image-zoom-viewer';
import AppColors from "../../styles/AppColors";
import { RouteProp, useRoute } from "@react-navigation/native";
import { NavigationRef, RootStackParamList } from "../../../App";
import VideoPlayer from "react-native-video-player";
import AppBar from "../../components/AppBar/AppBar";
import { IC_ARROWLEFT } from "../../assets/path";

type DetailImageScreenProps = RouteProp<RootStackParamList, "DetailImage">;

const DetailImage: React.FC = () => {
  const { img_url , thumbnail} = useRoute<DetailImageScreenProps>().params;
  const {colorPallet} = useTheme();

  return (
    <>
      <SafeAreaView
        style={[AppStyles.container,{backgroundColor: 'black', justifyContent:'center'}]}>
        <StatusBar
          barStyle={"light-content" }
          backgroundColor={AppColors.color_transparent}
        />
        <AppBar
        title=""
        leftIcon={IC_ARROWLEFT}
        containerStyle={{
          backgroundColor:AppColors.color_transparent_dark
        }}
        leftIconOnClick={()=>{
          NavigationRef.current?.goBack()
        }}/>
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
