import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
const ComplaintPage = () => {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const now = new Date();
  const formattedDate = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
  const [date, setDate] = useState(formattedDate);
  const [content, setContent] = useState('');
  const [photos, setPhotos] = useState([]);
  

  const handleAddPhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('카메라 권한이 필요합니다.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      if (result.assets && result.assets.length > 0) {
        setPhotos(prevPhotos => [...prevPhotos, result.assets[0].uri]);
      } else {
        setPhotos(prevPhotos => [...prevPhotos, result.uri]);
      }
    }
  };

  const handleSubmit = async () => {
      try {
        const payload = {
          title:title,
          address: location,
          text: content,
          date: date,
          photos: photos, // Assuming options is equivalent to binType
        };
        console.log(payload)
        
    
        const response = await axios.post("http://10.20.102.193:3030/post/bin_del_post ", payload);
    
        if (response.status === 200) {
          console.log('쓰레기통이 민원이 성공적으로 등록되었습니다.');
          // You can add any other logic here, like redirecting to another screen or showing a success message.
        } else {
          console.log('쓰레기통 민원 등록에 실패하였습니다.');
        }
      } catch (error) {
        console.error('Error while registering trash bin:', error.message);
      }
  
    
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputContainer}>
        <View style={styles.inputRow}>
          <Image source={require('../assets/earth.png')} style={styles.icon} />
          <TextInput
            style={[styles.input, { borderColor: '#D9D9D9' }]}
            placeholder="제목"
            value={title}
            onChangeText={setTitle}
          />
        </View>
        <View style={styles.inputRow}>
          <Image source={require('../assets/place.png')} style={styles.icon2} />
          <Text >주소</Text>
          <TextInput
            style={[styles.input, { borderColor: '#D9D9D9' }]}
            placeholder="장소 (세부적으로 적어주세요)"
            value={location}
            onChangeText={setLocation}
          />
        </View>
        <View style={styles.inputRow}>
          <Image source={require('../assets/date.png')} style={styles.icon2} />
          <Text >날짜</Text>
          <TextInput
            style={[styles.input, { borderColor: '#D9D9D9' }]}
            placeholder="민원 날짜"
            value={date}
            onChangeText={setDate}
          />
        </View>
        <TextInput
          style={[styles.contentInput, { borderColor: '#D9D9D9' }]}
          placeholder="내용을 설명해주세요."
          value={content}
          onChangeText={setContent}
          multiline
        />
        <View style={styles.photoContainer}>
          {photos.slice(0, 4).map((photo, index) => (
            <Image
              key={index}
              source={{ uri: photo }}
              style={styles.photo}
            />
          ))}
        </View>
        {photos.length < 4 && <TouchableOpacity style={styles.button} onPress={handleAddPhoto}>
        <Text style={styles.buttonText}>사진 추가</Text>
        </TouchableOpacity>} 
        <View style={styles.disclaimer}>
          <Image source={require('../assets/rightEye.png')} style={styles.disclaimerIcon} />
          <Text style={styles.disclaimerText}>
            확인 후 허위 사실일 경우 형사처벌이 있을 수 있습니다.
          </Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>민원 등록</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 20,
  },
  inputContainer: {
    marginBottom: 20,
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
  contentInput: {
    height: 220,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    textAlignVertical: 'top',
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
  },
  photoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  photo: {
    width: 70,
    height: 70,
    marginBottom: 10,
  },
  icon: {
    width: 33,
    height: 32,
    marginLeft:20
  },
  icon2: {
    width: 16,
    height: 16,
    marginRight: 10,
  },
  disclaimer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding:5,
  },
  disclaimerIcon: {
    width: 34,
    height: 26,
  },
  disclaimerText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 13,
  },
  button: {
   
    height: 44,
    backgroundColor: '#66E700',
    padding: 10,
    margin: 10,
    borderRadius: 15, // 버튼의 모서리를 둥글게 만듭니다.
    justifyContent: 'center', // 내부 요소를 가운데 정렬합니다.
    alignItems: 'center', // 내부 요소를 가운데 정렬합니다.
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 20,
    textAlign: 'center',
  },
  
});

export default ComplaintPage;
