// TrashBinRegistration.js
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';

const TrashBinRegistration = () => {
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [applicationDate, setApplicationDate] = useState('');
  const [binType, setBinType] = useState('');
  const route = useRoute();
  const capturedImage = route.params?.capturedImage;
  const handleRegister = () => {
    // 쓰레기통 등록 로직 추가
    console.log('쓰레기통을 등록합니다.');
  };

  return (

    <View style={styles.inputContainer}>
    {capturedImage && <Image source={{ uri: capturedImage.uri }} style={styles.capturedImage} />}
        <View style={styles.inputRow}>
          <Image source={require('./png/place.png')} style={styles.icon2} />
          <Text >주소</Text>
          <TextInput
            style={[styles.input, { borderColor: '#D9D9D9' }]}
            placeholder="주소를 입력하세요."
            value={address}
            onChangeText={setAddress}
          />
        </View>
        <View style={styles.inputRow}>
          <Image source={require('./png/place.png')} style={styles.icon2} />
          <Text >세부 주소</Text>
          <TextInput
            style={[styles.input, { borderColor: '#D9D9D9' }]}
            placeholder="세부 주소를 입력하세요."
            value={detailAddress}
            onChangeText={setDetailAddress}
          />
        </View>
        <View style={styles.inputRow}>
          <Image source={require('./png/date.png')} style={styles.icon2} />
          <Text >신청 날짜</Text>
          <TextInput
            style={[styles.input, { borderColor: '#D9D9D9' }]}
            placeholder="신청 날짜를 입력하세요."
            value={applicationDate}
            onChangeText={setApplicationDate}
          />
        </View>
        <View style={styles.inputRow}>
          <Text >쓰레기통 종류</Text>
          <TextInput
            style={[styles.input, { borderColor: '#D9D9D9' }]}
            placeholder="쓰레기통 종류를 입력하세요."
            value={binType}
            onChangeText={setBinType}
          />
        </View>
        <View style={styles.disclaimer}>
          <Image source={require('./png/rightEye.png')} style={styles.disclaimerIcon} />
          <Text style={styles.disclaimerText}>
            확인 후 허위 사실일 경우 형사처벌이 있을 수 있습니다.
          </Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>등록하기</Text>
      </TouchableOpacity>
    </View>

  );
};

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: 'white',
    flex: 1,
    padding: 20,
    marginBottom: 20,
    justifyContent: 'center',
   
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    height: 35,
    borderWidth: 1,
    marginLeft:20,
    marginTop:5,
    marginBottom: 10,
    paddingHorizontal: 10,
    flex: 1,
    backgroundColor: '#D9D9D9',
    borderRadius: 15,
  },
  icon2: {
    width: 16,
    height: 16,
    marginRight: 10,
  },
  button: {
    height: 44,
    backgroundColor: '#66E700',
    padding: 10,
    margin: 10,
    borderRadius: 15, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 20,
    textAlign: 'center',
  },
  disclaimer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  disclaimerIcon: {
    width: 34,
    height: 26,
    marginRight: 10,
  },
  disclaimerText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 13,
  },
});

export default TrashBinRegistration;
