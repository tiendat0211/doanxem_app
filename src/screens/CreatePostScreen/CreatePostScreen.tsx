import React, { useCallback, useEffect, useState } from "react";
import { Alert, Dimensions, Image, PermissionsAndroid, Platform, SafeAreaView, StatusBar, Text, TextInput, View, ViewProps } from "react-native";
import AppStyles from "../../styles/AppStyles";
import AppColors from "../../styles/AppColors";
import { useTheme } from "../../hooks/useTheme";
import { IC_ARROWLEFT, IC_CLOSE, IC_DRAWER, IC_FILTER, IC_HOTTAB, IC_NEWTAB, IC_TOPTAB, IMG_LOGO, IMG_NO_PICTURE } from "../../assets/path";
import { useLanguage } from "../../hooks/useLanguage";
import { DrawerActions, NavigationContainer } from "@react-navigation/native";
import { NavigationRef } from "../../../App";
import AppBar from "../../components/AppBar/AppBar";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import {
  unit1,
  unit10, unit100,
  unit12,
  unit132,
  unit14,
  unit144,
  unit16,
  unit20,
  unit22,
  unit25, unit30, unit4,
  unit40,
  unit8,
} from "../../utils/appUnit";
import AppText from "../../components/AppText/AppText";
import { dimension, fontSize12 } from "../../styles/AppFonts";
import { Asset, CameraOptions, launchCamera, launchImageLibrary } from "react-native-image-picker";
import { showToastError, showToastErrorMessage, showToastMsg } from "../../utils/Toaster";
import ModalFileSelect from "./components/ModalFileSelect";
import PressView from "../../components/PressView/PressView";
import FastImage from "react-native-fast-image";
import useScreenState from "../../hooks/useScreenState";
import useAuth from "../../hooks/useAuth";
import VideoPlayer from "react-native-video-player";
import { createPost } from "../../network/AppAPI";
import AppButton from "../../components/AppButton/AppButton";
import Snackbar from "react-native-snackbar";
import AppLoading from "../../components/Loading/AppLoading";
import RNFetchBlob from "rn-fetch-blob";

const options = {
  mediaType: 'mixed',
  quality: 0.3,
  storageOptions: {
    skipBackup: true,
  },
  noData: false,
};

const widthWD = Dimensions.get('window').width
const heightWD = Dimensions.get('window').height

interface CreatePostScreenProps extends ViewProps {

  onApply?: () => void;
}

const CreatePostScreen: React.FC<CreatePostScreenProps> = (props) => {
  const { onApply } = props;
  const { colorPallet, theme } = useTheme()
  const { language } = useLanguage();
  const [script, setScript] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [heightImgOrVid, setHeightImgOrVid] = useState(300);
  const [asset, setAsset] = useState<Asset>({
    uri: undefined,
    type: "",
    fileName: "",
  });
  const [isValid,setValid] = useState(false);
  const { isLoading, setLoading, mounted, setError } = useScreenState();

  const clearData = () => {
    setScript(''),
      setAsset({})
  }

  const getImageFromLib = async () => {
    try {
      const res = await launchImageLibrary({
        mediaType: "mixed",
        quality: 0.5,
        maxHeight: 1024,
        maxWidth: 1024,
      });

      if (res.assets) {
        console.log('response',res.assets);
        const img = res.assets[0];
        setAsset({
          uri: img.uri,
          type: img?.type,
          fileName: img?.type === 'video/mp4' && img.fileName?.endsWith('mp4')? img?.fileName :  img?.type === 'video/mp4'? img?.fileName + '.mp4' : img?.fileName,
        });
      }
    } catch (e) {
      console.error(e);
      showToastErrorMessage("Ảnh quá dung lượng");
    }
  };

  async function checkPerMissionCamera(): Promise<boolean> {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Cool Photo App Camera Permission",
          message:
            "Cool Photo App needs access to your camera " +
            "so you can take awesome pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the camera");
        return true;
      } else {
        console.log("Camera permission denied");
        return false;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  }

  const takePicture = async () => {
    if (Platform.OS === 'android') {
      const hasPermission = await checkPerMissionCamera();
      if (!hasPermission) {
        console.log('Vui lòng cấp quyền để sử dụng tính năng này!');
        return;
      }
    }
    try {
      const option: CameraOptions = {
        mediaType: "mixed",
        cameraType: 'back',
        presentationStyle: "currentContext",
        maxWidth: dimension.width,
        maxHeight: dimension.height,
      }
      const res = await launchCamera(option, (cameraRes) => {

      });

      if (res.assets) {
        const img = res.assets[0];
        setHeightImgOrVid(img.height!)
        setAsset({
          uri: img.uri,
          type: img?.type,
          fileName: img?.fileName,
          height: img.height,
          width: img.width
        });
      }
    } catch (e) {
      console.error(e);
      showToastErrorMessage("Ảnh quá dung lượng");
    }
  };

  useEffect(()=>{
    if (script.length>0 && script.trim() !== "" && asset.uri?.length ){
      setValid(true)
    }else {
      setValid(false)
    }
  })

  const {authData} = useAuth()

  const {token} = authData

  async function createSinglePost( title: string, img: Asset ){

    try {
      setLoading(true);
      const res = await createPost(token || "",title,img);
      console.log({res});

      const resJson = await res.json()
      console.log("OK", resJson.image);
      if (resJson.status === 200) {
        showToastMsg(resJson?.message)
        NavigationRef?.current?.goBack();
      } else {
        showToastErrorMessage(resJson?.message);
      }
    } catch (e) {
      console.error(e);
     setError(e);
      showToastError(e);
    } finally {
      setLoading(false)
    }
  }

  // async function createSinglePost (asset: Asset, title: string) {
  //   if (asset.uri != null) {
  //     setLoading(true)
  //     RNFetchBlob.fetch(
  //       "POST",
  //       "https://doanxem.com/api/v1/posts/store",
  //       {
  //         Authorization: 'Bearer ' +  token || '123',
  //         "Content-Type": "multipart/form-data",
  //       },
  //       [
  //         {
  //           name:'title',
  //           data: title
  //         },
  //         {
  //           name: 'image',
  //           filename: asset.fileName,
  //           type: asset.type,
  //           data: RNFetchBlob.wrap(asset.uri),
  //         },
  //       ]
  //     )
  //       .then(async (resp) => {
  //         const resJson = await resp.json();
  //         console.log({resJson})
  //         if (resJson.status === 200) {
  //             showToastMsg(resJson?.message)
  //             NavigationRef?.current?.goBack();
  //           } else {
  //             showToastErrorMessage(resJson?.message);
  //           }
  //         setLoading(false);
  //       })
  //       .catch((err) => {
  //        showToastError(err);
  //       });
  //   }
  // }

  const renderLocalImage = () => {

    if ( asset.type?.slice(0,5) === 'video' ) {
      return <VideoPlayer
        video={{ uri: asset.uri }}
        videoWidth={1600}
        videoHeight={900}
        style={{
          marginTop: unit12,
          backgroundColor: AppColors.color_transparent_dark,
        }}
        showDuration={true}
        defaultMuted={true}
      />;
    } else {
      return (
        <FastImage
          style={{
            width: '100%',
            height: heightImgOrVid
          }}
          resizeMode={FastImage.resizeMode.contain}
          onLoad={(evt) => {
            const { width, height } = evt.nativeEvent;

            const heightScaled = (height / width) * widthWD;
            setHeightImgOrVid(heightScaled);
          }}

          source={
            {
              uri: asset.uri
            }
          }
        />
      );
    }
  };
  return (
    <SafeAreaView
      style={[AppStyles.container, {
        backgroundColor: colorPallet.color_background_1,
      }]}>
      <StatusBar
        barStyle={theme === 'light' ? "dark-content" : "light-content"}
        backgroundColor={AppColors.color_transparent}
      />
      <AppBar
        title={'Mang vui vẻ tới cho đời'}
        leftIcon={IC_CLOSE}
        leftIconOnClick={() => {
          NavigationRef.current?.goBack()
          clearData()
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
          paddingTop: unit12,
          paddingBottom: unit20,
          flex: 1,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: unit20,
          }}>
          <View
            style={{
              flexGrow:1,
              flexDirection: 'row',
            }}
          >
            <AppText
              fontType="bold"
              style={{
                fontSize: unit14,
                lineHeight: unit20,
                color: colorPallet.color_text_blue_3
              }}
            >
              {'Mô tả'}
            </AppText>

            {
              (script.length && script.trim() !== "")?
                null
                :
                <AppText
                  fontType="bold"
                  style={{
                    marginStart:unit4,color:AppColors.color_warning,
                    fontSize:unit14,
                    lineHeight:unit20,
                  }}
                >
                  *
                </AppText>
            }

          </View>

          <AppText
            style={{
              fontSize: unit14,
              lineHeight: unit20
            }}
          >
            {script.length}/320
          </AppText>
        </View>
        <TextInput
          multiline={true}
          placeholder={'Kể về niềm vui của bạn đi'}
          style={{
            marginTop: unit8,
            paddingBottom: unit12,
            paddingHorizontal: unit20,
            borderBottomWidth: unit1,
            borderBottomColor: colorPallet.color_divider_2,
            fontSize: unit16,
            lineHeight: unit22,
            color: colorPallet.color_text_gray_2,
            height: script.length > 200 ? 'auto' : unit144,
          }}
          placeholderTextColor={colorPallet.color_text_gray_2}
          maxLength={320}
          onChangeText={(text) => {
            setScript(text)
          }}
          value={script}
        />

        <View
          style={{
            marginTop: unit14,
            paddingHorizontal: unit20,
          }}>
          <View
            style={{
              flexDirection:'row'
            }}
          >
            <AppText
              fontType="bold"
              style={{
                fontSize: unit14,
                lineHeight: unit20,
                color: colorPallet.color_text_blue_3
              }}
            > {`Media`}
            </AppText>

            {
              asset.uri?
                null
                :
                <AppText
                  fontType="bold"
                  style={{
                    marginStart:unit4,color:AppColors.color_warning,
                    fontSize:unit14,
                    lineHeight:unit20,
                  }}
                >
                  *
                </AppText>
            }

          </View>

          {
            asset.uri ?
              <>
                {renderLocalImage()}
                <PressView
                  onPress={() => setOpenModal(true)}
                  style={{
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginVertical: unit8,
                  }}>
                  <Text
                    style={{
                      fontSize: fontSize12,
                      color: AppColors.color_primary,
                    }}>{`Bạn có thể tải lại phương tiện`}</Text>
                </PressView>
              </>
              :
              <PressView
                style={{
                  height: 300,
                  marginTop: unit10,
                  backgroundColor: '#C3C8D6',
                  alignItems:'center',
                  justifyContent:'center'
                }}
                onPress={() => {
                  setOpenModal(true)
                }}>
                <Image
                  resizeMode="contain"
                  style={{
                    width: unit100,
                    height: unit100,
                  }}
                  source={IMG_NO_PICTURE} />
              </PressView>
          }
          <AppButton
            buttonTitle={'Đăng luôn cho nóng'}
            style={{
              marginTop: unit30,
              marginBottom: unit25,
              backgroundColor: isValid ? AppColors.color_primary : AppColors.color_opacity
            }}
            onPress={ async ()=>{
               await createSinglePost(script,asset);
            }}
          />

        </View>
        <ModalFileSelect
          onChooseGallery={getImageFromLib}
          onChooseTakePicture={takePicture}
          isVisible={openModal}
          setIsvisible={setOpenModal}
        />
      </ScrollView>
      {
        isLoading ? <AppLoading isOverlay color={AppColors.color_transparent_dark} /> : null
      }
    </SafeAreaView>
  )
};

export default CreatePostScreen;


