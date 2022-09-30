import React, { Component, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import PressView from '../../../components/PressView/PressView';

type Props = {
  isVisible : boolean;
  setIsvisible: (value: React.SetStateAction<boolean>) => void;
  onChooseGallery?: any;
  onChooseTakePicture?: any;
};

const ModalFileSelect: React.FC<Props> = (props) => {

  const {
    isVisible,onChooseGallery, onChooseTakePicture,setIsvisible
  } = props
  const onOpen = () => {
    setIsvisible(true)
  };

  const onClose = () => {
    setIsvisible(false)
  };

  const goChooseImage = () => {
    onClose();
    setTimeout(() => {
      onChooseGallery && onChooseGallery();
    }, 500);
  };

  const goChooseCamera = () => {
    onClose();
    setTimeout(() => {
      onChooseTakePicture && onChooseTakePicture();
    }, 500);
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      useNativeDriver={true}
      style={styles.container}>
      <View style={styles.wrapper}>
        {/* <View style={{padding: 10, alignSelf: 'center'}}>
            <Text style={{fontSize: 18, fontFamily: FONTS.GoogleSans.Regular, fontWeight: '500'}}>
              Select
            </Text>
          </View> */}
        <PressView style={{ padding: 15 }} onPress={goChooseImage}>
          <Text style={styles.options}>Chọn ảnh/video từ thư viện</Text>
        </PressView>
        <View style={{ height: 1, width: '100%', backgroundColor: '#C3C8D6' }} />
        <PressView style={{ padding: 15 }} onPress={goChooseCamera}>
          <Text style={styles.options}>Chụp ảnh</Text>
        </PressView>
      </View>
    </Modal>
  )
}
export default ModalFileSelect;


const styles = StyleSheet.create({
  container: { justifyContent: 'flex-end', margin: 0 },
  wrapper: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: 'white',
    paddingBottom: 20,
    paddingVertical: 10,
  },
  options: {
    fontSize: 16,
    color: 'black',
    alignSelf: 'center',
  },
})
