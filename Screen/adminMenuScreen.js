import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AdminMenuScreen = () => {
  const navigation = useNavigation();

  const handleRegisterPress = () => {
    navigation.navigate('select');

  };

  const handleDeletePress = () => {
    navigation.navigate('AdminCanDelete'); // 카메라 화면으로 이동
   
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleRegisterPress}>
        <Text style={styles.buttonText}>등록 관리</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleDeletePress}>
        <Text style={styles.buttonText}>삭제 관리</Text>
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
export default AdminMenuScreen;
