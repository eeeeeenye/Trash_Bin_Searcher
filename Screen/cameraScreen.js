import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text ,Image} from 'react-native';
import { Camera } from 'expo-camera';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';

const CameraScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const cameraRef = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync(); // 수정된 부분
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleTakePicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
  
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Location permission denied');
        return null;
      }
  
      const { coords } = await Location.getCurrentPositionAsync({});
      console.log('Latitude:', coords.latitude, 'Longitude:', coords.longitude); // 좌표 로그로 출력
  
      const location = await Location.reverseGeocodeAsync({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
      console.log("좌표",location)
      const capturedImageData = { uri: data.uri, location, latitude: coords.latitude,
        longitude: coords.longitude,};
      console.log('Captured Image Data:', capturedImageData);
  
      setCapturedImage(capturedImageData);
    }
  };
  
  
  
  

  const handleProceed = () => {
    if (capturedImage) {
      navigation.navigate('trashBinRegistration', {
        capturedImage,
        location: capturedImage.location,
        
      });console.log(capturedImage.location)
    }
  };
  
  

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
       {!capturedImage && hasPermission && (
        <Camera
          ref={cameraRef}
          style={styles.preview}
          type={Camera.Constants.Type.back}
          flashMode={Camera.Constants.FlashMode.off}
        />
      )}
      {capturedImage && (
        <View style={styles.capturedImageContainer}>
          <Image
            source={{ uri: capturedImage.uri }}
            style={styles.capturedImage}
          />
        </View>
      )}
      <View>
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
  capture: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  captureText: {
    fontSize: 20,
  },
  proceedButton: {
    backgroundColor: '#4EB100',
    borderRadius: 15,
    padding: 15,
    margin: 20,
    alignSelf: 'center',
  },
  proceedText: {
    color: '#fff',
    fontSize: 20,
  },
  capturedImageContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  capturedImage: {
    width: 250,
    height: 250,
    borderRadius: 10,
  },
});

export default CameraScreen;
