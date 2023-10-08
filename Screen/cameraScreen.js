import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { useNavigation } from '@react-navigation/native';

const CameraScreen = () => {
  const [capturedImage, setCapturedImage] = useState(null);
  const navigation = useNavigation();

  const handleTakePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      setCapturedImage(data.uri);
    }
  };

  const handleProceed = () => {
    if (capturedImage) {
      navigation.navigate('TrashBinRegistration', { capturedImage });
    }
  };

  return (
    <View style={styles.container}>
      <RNCamera
        ref={ref => { this.camera = ref; }}
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
      />
      <View style={styles.captureContainer}>
        <TouchableOpacity onPress={handleTakePicture} style={styles.capture}>
          <Text style={styles.captureText}>사진 찍기</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handleProceed} style={styles.proceedButton}>
        <Text style={styles.proceedText}>사진 사용하기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

export default CameraScreen;
