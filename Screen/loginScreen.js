import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (adminId === 'admin' && password === 'admin1234') {
      // Navigate to the administrator screen
      navigation.navigate('AdminScreen');
    } else {
      Alert.alert('Invalid Credentials', 'Please enter correct admin ID and password.');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Admin Login</Text>
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
      <Button style={styles.button} title="Login" onPress={handleLogin} />
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
});

export default LoginScreen;
