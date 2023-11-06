import React, { useEffect } from "react";
import axios from 'axios';
import { View, Text, StyleSheet, TextInput, Dimensions, TouchableOpacity,Alert, SafeAreaView, Image } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { useNavigation } from '@react-navigation/native';
import { KeyboardAvoidingView } from 'react-native';
import CoodData from "../component/coodData";
const API_KEY = "AIzaSyC3k7HBbhN327lvM3fyx006TZ3bHcYS9KY";
const deviceWidth = Dimensions.get("window").width;

const SearchCan = () => {
  
  useEffect(() => {
    console.log(CoodData.latitude);
    console.log(CoodData.longitude);
    const fetchData = async () => {
        var response = await axios.post("http://10.20.101.231:3030/search/bin_read_myloc", {
          latitude: CoodData.latitude,
          longitude: CoodData.longitude
        });
        console.log(response.data); 
    };
    fetchData();
  }, []);
  
  

  const navigation = useNavigation();
  const [address, setAddress] = React.useState("");
  const [latitude, setLatitude] = React.useState(0);
  const [longitude, setLongitude] = React.useState(0);


  const handleAddressSubmit = async () => {
    try {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=${API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();

      const results = data.results;
      if (results.length > 0) {
        const { lat, lng } = results[0].geometry.location;
        setLatitude(lat);
        setLongitude(lng);
      } else {
        Alert.alert("Error", "No results found");
      }
    } catch (error) {
      Alert.alert("Error", "Geocoding API request failed");
    }
  };

  const handleMylocation = async () => {
    try {
      setLatitude('0');
      setLongitude('0');
      setTimeout(() => {
        setLatitude(CoodData.latitude);
        setLongitude(CoodData.longitude);
      }, 10);
    } catch (error) {
      Alert.alert("Error", "Failed to get location");
    }
  };

  const [selectedSearchWay, setSelectedSearchWay] = React.useState(true);
  const trashCategory = ["재활용만", "일반\n쓰레기만", "모두"];

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"} 
      style={styles.container}
    >
      <SafeAreaView style={styles.container}>
        {/* 지도 */}
        <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={{
          latitude: latitude || CoodData.latitude,
          longitude: longitude || CoodData.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        showsUserLocation={true}
        showsMyLocationButton={false}
      />

        {/* 상단 탭 */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            onPress={() => {
              setSelectedSearchWay(true);
            }}
            style={selectedSearchWay ? [styles.tab, styles.selectedTab] : styles.tab}
          >
            <Text style={styles.tabText}>직접 입력</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('LocationSearch');
            }}
            style={!selectedSearchWay ? [styles.tab, styles.selectedTab] : styles.tab}
          >
            <Text style={styles.tabText}>지역 검색</Text>
          </TouchableOpacity>
        </View>

        {/* 나머지 컴포넌트들 */}
        <View style={styles.otherComponents}>
          {/* 검색 입력란 (위에 겹쳐 표시) */}
          <TextInput
          placeholder="검색장소 입력"
          style={styles.input}
          value={address}
          onChangeText={setAddress}
        />
          <TouchableOpacity
             onPress={() => {
              handleAddressSubmit();
            }}
            style={styles.searchIconContainer}
          >
            <Image
              source={require("../assets/search.png")}
              style={styles.searchIcon}
            />
          </TouchableOpacity>   
          <View style={styles.trashCategories}>
            {trashCategory.map((category, index) => (
              <TouchableOpacity
                key={index}
                style={styles.trashCategory}
              >
                <Text style={styles.categoryText}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          
          {/* 하단 바 */}
          <View style={styles.bottomBar}>
            <TouchableOpacity 
              onPress={() => {
                handleMylocation();
              }}
            >
              <Image
                source={require("../assets/circleB.png")}
                style={styles.circleIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E0E0E0",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
  },
  selectedTab: {
    backgroundColor: "#4EB100",
  },
  tabText: {
    color: "black",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  otherComponents: {
    ...StyleSheet.absoluteFillObject,
    top: 50,
    bottom: 0, // 하단 공간 추가
  },
  trashCategories: {
    flexDirection: "row",
    marginBottom: 10,
    marginLeft: 10, // 왼쪽 여백 추가
  },
  trashCategory: {
    width: 36,
    height: 36,
    borderWidth: 3,
    borderRadius: 15,
    borderColor: "#438400",
    marginRight: 9,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  categoryText: {
    fontSize: 8,
    alignSelf: "center",
  },
  input: {
    width: deviceWidth - 20,
    height: 46,
    borderWidth: 2,
    borderRadius: 15,
    borderColor: "#CDFF9B",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    alignSelf: "center",
    marginBottom: 10,
  },
  searchIconContainer: {
    position: "absolute",
    top: 10,
    right: 25,
  },
  searchIcon: {
    width: 27,
    height: 27,
  },
  circleIcon: {
    width: 45,
    height: 45,
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 60, // 바의 높이
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20, // 좌우 여백
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  circularButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#4EB100",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default SearchCan;
