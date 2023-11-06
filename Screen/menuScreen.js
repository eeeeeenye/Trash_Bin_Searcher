import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';



const MenuScreen = () => {
    const navigation = useNavigation();

    const handleRegisterPress = () => {
      navigation.navigate('RegisterScreen');
    };
 
    const SearchPress = () => {
      navigation.navigate('SearchCan');
    };
    const locationSearchPress = () => {
      navigation.navigate('LocationSearch');
    };
    const handleLoginPress = () => {
      navigation.navigate('Login');
    };
  return (
    <View style={styles.container}>
     
        <Image source={require('../assets/Group28.png')} style={styles.titleImage} />
     
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText} onPress={locationSearchPress}>쓰레기통 검색</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}onPress={SearchPress}>내 주변 쓰레기통</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleRegisterPress}>
        <Text style={styles.buttonText}>쓰레기통 위치 등록, 삭제</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
        <Text style={styles.buttonText}>관리자 접속</Text>
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

  titleImage: {
    width: 190,
    height: 90,
    marginBottom: 20,
  },
  button: {
    width: 281,
    height: 55,
    backgroundColor: '#4EB100',
    padding: 10,
    margin: 10,
    borderRadius: 15,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 20, // 글씨를 조금 더 크게
    textAlign: 'center',
    fontWeight: 'bold', // 굵은 폰트로 변경
  },
});

export default MenuScreen;