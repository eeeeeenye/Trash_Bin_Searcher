import React, { useState } from 'react';
import { View, Text, TouchableOpacity,TextInput, StyleSheet, Alert } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (adminId === 'admin' && password === 'admin1234') {
      // Navigate to the administrator screen
      navigation.navigate('AdminMenuScreen');
    } else {
      Alert.alert('Invalid Credentials', 'Please enter correct admin ID and password.');
    }
  };

  return (
    <View style={styles.container}>
      <Text>관리자 로그인</Text>
      <TextInput
        style={styles.input}
        placeholder="Admin ID"
        value={adminId}
        onChangeText={setAdminId}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>로그인</Text>
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
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
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

export default LoginScreen;
