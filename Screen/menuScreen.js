import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';

const MenuScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/Group 28.png')} style={styles.titleImage} />
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>쓰레기통 검색</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>내 주변 쓰레기통</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>쓰레기통 위치 등록 및 삭제</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>쓰레기통 주변이 더러워요!</Text>
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
  header: {
    marginBottom: 20,
  },
  titleImage: {
    width: 189,
    height: 89,
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
