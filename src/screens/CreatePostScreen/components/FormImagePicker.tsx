import React, {Component} from 'react';
import {Platform, StyleSheet, View, Image, TouchableOpacity, Alert} from 'react-native';
import Permission from 'react-native-permissions';
import {ImageLibraryOptions, launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ModalFileSelect from '../ModalFileSelect';
import FONTS from 'app/theme/fonts';
import FastImage from 'react-native-fast-image';
import {deviceWidth} from 'app/constants/size';
import {Text} from 'react-native-paper';
import VideoPlayer1 from '../status/videocomponent/VideoPlayer1';
import {margin20, margin8} from 'app/theme/layout';
import {fontSize12} from 'app/theme/fonts/theme';
import {AppColors} from 'app/theme';

const options = {
  mediaType: 'mixed',
  quality: 0.3,
  storageOptions: {
    skipBackup: true,
  },
  noData: false,
};
type Props = {
  form?: {
    setFieldValue?: any;
    errors?: any;
  };
  containerStyle?: any;
  imageStyle?: any;
  field?: {
    value?: string;
    name?: string;
  };
};
export default class FormImagePicker extends Component<Props> {
  state = {
    heightViewImageOrVideo: 300,
  };
  modalSelect = React.createRef();
  checkPerMissionReadStorage = () => {
    return new Promise((resolve) => {
      Permission.request(Permission.PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)
        .then((res) => {
          if (res !== 'granted') {
            resolve(false);
          }
          return resolve(true);
        })
        .catch((e) => resolve(false));
    });
  };

  checkPerMissionCamera = () => {
    return new Promise((resolve) => {
      Permission.request(Permission.PERMISSIONS.ANDROID.CAMERA)
        .then((res) => {
          if (res !== 'granted') {
            resolve(false);
          }
          return resolve(true);
        })
        .catch((e) => resolve(false));
    });
  };

  chooseImage = async () => {
    if (Platform.OS === 'android') {
      const hasPermission = await this.checkPerMissionReadStorage();
      if (!hasPermission) {
        Alert.alert('Vui lòng cấp quyền để sử dụng tính năng này!');
      }
    }

    launchImageLibrary(options, (res) => {
      if (!res?.didCancel) {
        const response = res?.assets[0];

        const uri = response?.uri;

        // const uriFile = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
        const data = {
          name: 'image.jpg',
          type: response.type,
          uri: uri,
        };
        this.handleImage(data);
      }
    });
  };

  takePicture = async () => {
    if (Platform.OS === 'android') {
      const hasPermission = await this.checkPerMissionCamera();
      if (!hasPermission) {
        Alert.alert('Vui lòng cấp quyền để sử dụng tính năng này!');
      }
    }

    launchCamera(options, (res) => {
      if (!res?.didCancel && !res.errorCode) {
        const response = res?.assets[0];
        const uri = response.uri;
        // const uriFile = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
        const data = {
          name: 'image.jpg',
          type: response.type,
          uri: uri,
        };
        this.handleImage(data);
      }
    });
  };

  handleImage = (data) => {
    const {
      form: {setFieldValue},
      field: {name},
    } = this.props;
    setFieldValue(name, data);
  };

  select = () => {
    this.modalSelect?.current?.onOpen();
  };

  renderLocalImage = () => {
    const {
      field: {value, name},
    } = this.props;

    if (value.uri.endsWith('mp4')) {
      return <VideoPlayer1 uri={value.uri} content={'Video'} />;
    } else {
      return (
        <FastImage
          style={[styles.imageWithOutFeedback, {height: this.state.heightViewImageOrVideo}]}
          source={{
            uri: value.uri,
          }}
          resizeMode={FastImage.resizeMode.contain}
          onLoad={(evt) => {
            const {height, width} = evt.nativeEvent;
            const heightScaled = (height / width) * deviceWidth;
            this.setState({
              heightViewImageOrVideo: heightScaled,
            });
          }}
        />
      );
    }
  };

  render() {
    const {
      containerStyle,
      imageStyle,
      field: {value, name},
      form: {errors},
    } = this.props;

    return (
      <View>
        <View style={[styles.cameraWrapper, containerStyle]}>
          {value && value.uri ? (
            this.renderLocalImage()
          ) : (
            <TouchableOpacity
              onPress={this.select}
              style={[
                styles.cameraWrapper,
                containerStyle,
                {
                  height: 300,
                  backgroundColor: '#C3C8D6',
                  width: '100%',
                },
              ]}>
              <Image
                source={require('app/assets/Images/HomeAddStatus/Picture.png')}
                resizeMode="contain"
                style={[{width: 50, height: 50}, imageStyle]}
              />
            </TouchableOpacity>
          )}
          {value && value.uri !== null && (
            <TouchableOpacity
              onPress={this.select}
              style={{
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                marginVertical: margin8,
              }}>
              <Text
                style={{
                  fontFamily: FONTS.regular,
                  fontSize: fontSize12,
                  color: AppColors.primary,
                }}>{`Bạn có thể tải lại phương tiện`}</Text>
            </TouchableOpacity>
          )}
        </View>
        {errors[name] ? <Text style={styles.error}>{errors[name]}</Text> : null}
        <ModalFileSelect
          ref={this.modalSelect}
          onChooseGallery={this.chooseImage}
          onChooseTakePicture={this.takePicture}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cameraWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: margin20,
  },
  error: {
    fontSize: 12,
    color: 'red',
    fontFamily: FONTS.regular,
    paddingHorizontal: 16,
    textAlign: 'center',
  },
  imageWithOutFeedback: {
    width: '100%',
  },
});
