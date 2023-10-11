import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const RegisterScreen = () => {
  const navigation = useNavigation();

  const handleRegisterPress = () => {
    navigation.navigate('CameraScreen');
    console.log('등록하기 버튼을 눌렀습니다.');
  };

  const handleDeletePress = () => {
    navigation.navigate('ComplaintPage'); // 카메라 화면으로 이동
    console.log('삭제하기 버튼을 눌렀습니다.');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleRegisterPress}>
        <Text style={styles.buttonText}>등록하기</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleDeletePress}>
        <Text style={styles.buttonText}>삭제하기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 200,
    height: 50,
    backgroundColor: '#4EB100',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    margin: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default RegisterScreen;
