import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  PermissionsAndroid,
  Platform,
  StatusBar,
  Text,
  TextInput,
  View,
  ViewProps,
} from "react-native";
import AppStyles from "../../styles/AppStyles";
import AppColors from "../../styles/AppColors";
import { useTheme } from "../../hooks/useTheme";
import { IC_CLOSE } from "../../assets/path";
import { NavigationRef } from "../../../App";
import { unit10, unit100, unit12, unit14, unit16, unit20, unit4, unit5, unit8, unit80 } from "../../utils/appUnit";
import AppText from "../../components/AppText/AppText";
import { dimension, fontSize12, fontSize16, fontSize18 } from "../../styles/AppFonts";
import { Asset, CameraOptions, launchCamera, launchImageLibrary } from "react-native-image-picker";
import { showToastError, showToastErrorMessage, showToastMsg } from "../../utils/Toaster";
import ModalFileSelect from "./components/ModalFileSelect";
import PressView from "../../components/PressView/PressView";
import FastImage from "react-native-fast-image";
import useScreenState from "../../hooks/useScreenState";
import useAuth from "../../hooks/useAuth";
import VideoPlayer from "react-native-video-player";
import { createPost } from "../../network/AppAPI";
import AppLoading from "../../components/Loading/AppLoading";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AppBarV2 from "../../components/AppBar/AppBarV2";

const options = {
  mediaType: "mixed",
  quality: 0.3,
  storageOptions: {
    skipBackup: true,
  },
  noData: false,
};

const widthWD = Dimensions.get("window").width;

interface CreatePostScreenProps extends ViewProps {
  onApply?: () => void;
}

const CreatePostScreen: React.FC<CreatePostScreenProps> = (props) => {
  const { colorPallet, theme } = useTheme();
  const [script, setScript] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [heightImgOrVid, setHeightImgOrVid] = useState(300);
  const [asset, setAsset] = useState<Asset>({
    uri: undefined,
    type: "",
    fileName: "",
  });
  const [isValid, setValid] = useState(false);
  const { isLoading, setLoading } = useScreenState();

  const clearData = () => {
    setScript("");
    setAsset({});
  };

  const getImageFromLib = async () => {
    try {
      const res = await launchImageLibrary({
        mediaType: "mixed",
        quality: 0.5,
        maxHeight: 1024,
        maxWidth: 1024,
      });

      if (res.assets) {
        console.log("response", res.assets);
        const img = res.assets[0];
        setAsset({
          uri: img.uri,
          type: img?.type,
          fileName: img?.type === "video/mp4" && img.fileName?.endsWith("mp4") ? img?.fileName : img?.type === "video/mp4" ? img?.fileName + ".mp4" : img?.fileName,
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
          buttonPositive: "OK",
        },
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
    if (Platform.OS === "android") {
      const hasPermission = await checkPerMissionCamera();
      if (!hasPermission) {
        console.log("Vui lòng cấp quyền để sử dụng tính năng này!");
        return;
      }
    }
    try {
      const option: CameraOptions = {
        mediaType: "mixed",
        cameraType: "back",
        presentationStyle: "currentContext",
        maxWidth: dimension.width,
        maxHeight: dimension.height,
      };
      const res = await launchCamera(option);
      if (res.assets) {
        const img = res.assets[0];
        setHeightImgOrVid(img.height!);
        setAsset({
          uri: img.uri,
          type: img?.type,
          fileName: img?.fileName,
          height: img.height,
          width: img.width,
        });
      }
    } catch (e) {
      console.error(e);
      showToastErrorMessage("Ảnh quá dung lượng");
    }
  };

  useEffect(() => {
    if (script.length > 0 && script.trim() !== "" && asset.uri?.length) {
      setValid(true);
    } else {
      setValid(false);
    }
  });

  const { authData } = useAuth();

  const { token } = authData;

  async function createSinglePost(title: string, img: Asset) {
    try {
      setLoading(true);
      const res = await createPost(token || "", title, img);
      switch (res.status) {
        case 200: {
          const resJson = await res.json();
          if (resJson.status === 200) {
            showToastMsg(resJson?.message);
            NavigationRef?.current?.goBack();
          } else {
            showToastErrorMessage(resJson?.message);
          }
          break;
        }

        case 413: {
          showToastErrorMessage("File quá dung lượng, vui lòng chọn file nhỏ hơn");
          break;
        }

        default: {
          showToastErrorMessage();
        }
      }
    } catch (e) {
      showToastError(e);
    } finally {
      setLoading(false);
    }
  }

  const renderLocalImage = () => {
    if (asset.type?.slice(0, 5) === "video") {
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
            width: "100%",
            height: heightImgOrVid,
          }}
          resizeMode={FastImage.resizeMode.contain}
          onLoad={(evt) => {
            const { width, height } = evt.nativeEvent;
            const heightScaled = (height / width) * widthWD;
            setHeightImgOrVid(heightScaled);
          }}
          source={
            {
              uri: asset.uri,
            }
          }
        />
      );
    }
  };
  return (
    <>
      <StatusBar
        barStyle={theme === "light" ? "dark-content" : "light-content"}
        backgroundColor={AppColors.color_transparent}
      />
      <View
        style={[AppStyles.container, {
          backgroundColor: colorPallet.color_background_1,
        }]}>

        <AppBarV2
          title={"Tạo niềm vui"}
          left={
            <PressView
              onPress={() => {
                NavigationRef.current?.goBack();
              }}
            >
              <Image
                source={IC_CLOSE}
                style={[
                  AppStyles.icon24,
                  {
                    tintColor: colorPallet.color_text_blue_1,
                  },
                ]}
              />
            </PressView>
          }
          right={
            <PressView
              onPress={() => createSinglePost(script, asset)}
              style={[{
                backgroundColor: isValid ? AppColors.color_primary : AppColors.color_opacity,
                borderColor: AppColors.color_primary,
                borderRadius: unit8,
              }]}
              disabled={!isValid}>
              <AppText
                fontType={"bold"}
                style={[{
                  textAlign: "center",
                  fontSize: fontSize18,
                  color: "white",
                  paddingVertical: unit5,
                  paddingHorizontal: unit10,
                }]}>
                {"Đăng"}
              </AppText>
            </PressView>
          }
          titleStyle={{
            paddingVertical: 1,
            color: colorPallet.color_text_gray_1,
          }}
          containerStyle={{
            borderBottomColor: colorPallet.color_divider_3,
          }}
        />

        <KeyboardAwareScrollView
          style={{
            flex: 1,
          }}>
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: unit20,
              paddingVertical: unit10,
            }}>
            <View
              style={{
                flexGrow: 1,
                flexDirection: "row",
              }}
            >
              <AppText
                fontType="bold"
                style={{
                  fontSize: unit14,
                  lineHeight: unit20,
                  color: colorPallet.color_text_blue_3,
                }}
              >
                {"Mô tả"}
              </AppText>

              {
                (script.length && script.trim() !== "") ?
                  null
                  :
                  <AppText
                    fontType="bold"
                    style={{
                      marginStart: unit4, color: AppColors.color_warning,
                      fontSize: unit14,
                      lineHeight: unit20,
                    }}
                  >
                    *
                  </AppText>
              }

            </View>

            <AppText
              style={{
                fontSize: unit14,
                lineHeight: unit20,
                color: colorPallet.color_text_gray_1,
              }}
            >
              {script.length}/320
            </AppText>
          </View>

          <TextInput
            multiline={true}
            placeholder={"Kể về niềm vui của bạn đi"}
            style={{
              fontSize: fontSize16,
              color: colorPallet.color_text_gray_2,
              marginBottom: unit20,
              paddingHorizontal: unit16,
              height: script?.length < 100 ? unit100 : "auto",
            }}
            placeholderTextColor={colorPallet.color_text_gray_2}
            maxLength={320}
            onChangeText={setScript}
            value={script}
          />

          <View style={{
            width: widthWD,
            height: 1,
            backgroundColor: colorPallet.color_divider_1,
            marginVertical: unit16,
          }} />

          <View
            style={{
              marginTop: unit14,
            }}>
            <View
              style={{
                flexDirection: "row",
              }}>
              <AppText
                fontType="bold"
                style={{
                  fontSize: unit14,
                  lineHeight: unit20,
                  color: colorPallet.color_text_blue_3,
                  paddingLeft: unit20,
                  marginBottom: unit12,
                }}
              > {`Media`}
              </AppText>

              {
                asset.uri ?
                  null
                  :
                  <AppText
                    fontType="bold"
                    style={{
                      marginStart: unit4, 
                      color: AppColors.color_warning,
                      fontSize: unit14,
                      lineHeight: unit20,
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
                      alignItems: "center",
                      justifyContent: "center",
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
                    marginTop: unit10,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: unit8,
                    margin: unit16,
                    paddingVertical: unit80,
                    borderWidth: 1,
                    borderStyle: "dashed",
                    borderColor: colorPallet.color_divider_1,
                  }}
                  onPress={() => {
                    setOpenModal(true);
                  }}>
                  <View>

                    <AppText
                      fontType={"semiBold"}
                      style={{
                        color: colorPallet.color_text_gray_2,
                      }}>{"Thêm ảnh/video"}</AppText>

                  </View>
                </PressView>
            }
          </View>

          <View style={{
            height: 100,
          }} />


        </KeyboardAwareScrollView>


      </View>
      {
        isLoading ? <AppLoading isOverlay color={AppColors.color_transparent_dark} /> : null
      }
      <ModalFileSelect
        onChooseGallery={getImageFromLib}
        onChooseTakePicture={takePicture}
        isVisible={openModal}
        setIsvisible={setOpenModal}
      />
    </>
  );
};

export default CreatePostScreen;


