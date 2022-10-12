import React from "react";
import { SafeAreaView, StatusBar} from "react-native";
import { useTheme } from "../../hooks/useTheme";
import AppStyles from "../../styles/AppStyles";
import ImageViewer from 'react-native-image-zoom-viewer';
import AppColors from "../../styles/AppColors";
import { RouteProp, useRoute } from "@react-navigation/native";
import { NavigationRef, RootStackParamList } from "../../../App";
import VideoPlayer from "react-native-video-player";

type DetailImageScreenProps = RouteProp<RootStackParamList, "DetailImage">;

const DetailImage: React.FC = () => {
  const { img_url } = useRoute<DetailImageScreenProps>().params;

  return (
    <>
      <SafeAreaView
        style={[AppStyles.container,{backgroundColor: 'black', justifyContent:'center'}]}>
        <StatusBar
          barStyle={"light-content" }
          backgroundColor={AppColors.color_transparent}
        />
        {
          img_url.endsWith('mp4')
            ? <VideoPlayer
              video={{ uri: img_url}}
              videoWidth={1600}
              videoHeight={1600}
              defaultMuted={true}
              showDuration={true}
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
