// App.js
import React, { useState } from 'react';
import { View, ScrollView, Button, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const cities = [
  "서울",
  "부산",
  "대구",
  "인천",
  "광주",
  "대전",
  "세종",
  "울산",
  "강원",
  "경기",
  "충남",
  "충북",
  "경상",
  "경남",
  "전북",
  "전남",
  "제주",
];

const SelectLocation = () => {
    const navigation = useNavigation();
    const [selectedCity, setSelectedCity] = useState(null);
  
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Select a City</Text>
        {cities.map((city, index) => (
          <Button
            key={index}
            title={city}
            onPress={() => {
              setSelectedCity(city);
              navigation.navigate('ADCA', { cityName: city });
            }}
            color={selectedCity === city ? '#2196F3' : '#808080'}
          />
        ))}
      </ScrollView>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  selectedText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});

export default SelectLocation;
