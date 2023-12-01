
import React, { useState } from 'react';
import axios from 'axios';
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Text, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation from '@react-navigation/native'
const TrashBinRegistration = () => {
  
  const formatLocationString = (location) => {
    if (!location) return '';
  
    const { region, city, street, streetNumber, postalCode, country } = location[0] || {};
  
    return `${region || ''} ${city || ''} ${street || ''} ${streetNumber || ''} ${postalCode || ''} ${country || ''}`;
  };
  const navigation = useNavigation(); 
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [selectedTrashType, setSelectedTrashType] = useState('');
  const route = useRoute();
  const capturedImage = route.params?.capturedImage;
  const location = route.params?.location;
  const now = new Date();
  const formattedDate = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
  const [date, setDate] = useState(formattedDate);
  const locationString = formatLocationString(location);

  const handleRegister = async () => {
    try {
      const payload = {
        address: locationString,
        add_address: detailAddress,
        latitude: capturedImage.latitude,
        longitude: capturedImage.longitude,
        date: date,
        options: selectedTrashType,
        type: 'create',
      };

      const response = await axios.post("http://172.16.102.59:3030/post/bin_post", payload);

      if (response.status === 200) {
        Alert.alert("Success", "쓰레기통이 성공적으로 등록되었습니다.", [
          {
            text: "OK",
            onPress: () => {
              navigation.navigate("MenuScreen");
            },
          },
        ]);
      } else {
        console.log('쓰레기통 등록에 실패하였습니다.');
      }
    } catch (error) {
      console.error('Error while registering trash bin:', error.message);
    }
  };
  

  return (

    <View style={styles.inputContainer}>
   <View style={styles.imageContainer}>
        {capturedImage && <Image source={{ uri: capturedImage.uri }} style={styles.capturedImage} />}
      </View>
        <View style={styles.inputRow}>
          <Image source={require('../assets/place.png')} style={styles.icon2} />
          <Text >주소</Text>
          <TextInput
            style={[styles.input, { borderColor: '#D9D9D9' }]}
            placeholder="주소를 입력하세요."
            value={locationString}
            onChangeText={setAddress}
          />
        </View>
        <View style={styles.inputRow}>
          <Image source={require('../assets/place.png')} style={styles.icon2} />
          <Text >세부 주소</Text>
          <TextInput
            style={[styles.input, { borderColor: '#D9D9D9' }]}
            placeholder="세부 주소를 입력하세요."
            value={detailAddress}
            onChangeText={setDetailAddress}
          />
        </View>
        <View style={styles.inputRow}>
          <Image source={require('../assets/date.png')} style={styles.icon2} />
          <Text >신청 날짜</Text>
          <TextInput
            style={[styles.input, { borderColor: '#D9D9D9' }]}
            placeholder="신청 날짜를 입력하세요."
            value={date}
            onChangeText={setDate}
          />
        </View>
        <View style={styles.inputRow}>
          <Text >쓰레기통 종류</Text>
          <Picker
            selectedValue={selectedTrashType}
            style={[styles.input, { borderColor: '#D9D9D9' }]}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedTrashType(itemValue)
            }
          >
            <Picker.Item label="Select Trash Type" value="" />
            <Picker.Item label="일반" value="일반" />
            <Picker.Item label="재활용" value="재활용" />
            {/* Add more trash types as needed */}
          </Picker>
        </View>
        <View style={styles.disclaimer}>
          <Image source={require('../assets/rightEye.png')} style={styles.disclaimerIcon} />
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
  capturedImage: {
    width: 250, // Adjust the dimensions as needed
    height: 250, // Adjust the dimensions as needed
    marginBottom: 20,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  
});

export default TrashBinRegistration;
