import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  SafeAreaView,
  Alert,
  Image,
} from "react-native";
import { Modalize } from "react-native-modalize";
import axios from 'axios';
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { GestureHandlerRootView } from "react-native-gesture-handler";
const imageMapping = {
  canAndPet: require("../assets/marker_all.png"),
  pet: require("../assets/marker_pet.png"),
  pp: require("../assets/marker_pp.png"),
};

const imageReturn = (arr) => {
  if (arr.includes("캔") && arr.includes("투명 페트")) {
    return "canAndPet";
  } else if (arr.includes("투명 페트")) {
    return "pet";
  } else if (arr.includes("무색 PP")) {
    return "pp";
  } else {
    return "";
  }
};
const API_KEY = "AIzaSyC3k7HBbhN327lvM3fyx006TZ3bHcYS9KY";
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const specialCities = [
  "서울특별시",
  "부산광역시",
  "대구광역시",
  "인천광역시",
  "광주광역시",
  "대전광역시",
  "세종특별시",
  "울산광역시",
  "강원도",
  "경기도",
  "충청남도",
  "충청북도",
  "경상북도",
  "경상남도",
  "전라북도",
  "전라남도",
  "제주도",
];

const provinces = [
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

const cities = {
  서울특별시: [
    "중구",
    "종로구",
    "용산구",
    "성동구",
    "광진구",
    "동대문구",
    "중랑구",
    "성북구",
    "강북구",
    "도봉구",
    "노원구",
    "은평구",
    "서대문구",
    "마포구",
    "양천구",
    "강서구",
    "구로구",
    "금천구",
    "영등포구",
    "동작구",
    "관악구",
    "서초구",
    "강남구",
    "송파구",
    "강동구",
  ],
  부산광역시: [
    "중구",
    "서구",
    "동구",
    "영도구",
    "부산진구",
    "동래구",
    "남구",
    "북구",
    "해운대구",
    "사하구",
    "금정구",
    "강서구",
    "연제구",
    "수영구",
    "사상구",
    "기장군",
  ],
  대구광역시: ["중구", "동구", "서구", "남구", "북구", "수성구", "달서구"],
  인천광역시: [
    "중구",
    "동구",
    "미추홀구",
    "연수구",
    "남동구",
    "부평구",
    "계양구",
    "서구",
    "강화군",
    "옹진군",
  ],
  광주광역시: ["동구", "서구", "남구", "북구", "광산구"],
  대전광역시: ["동구", "중구", "서구", "유성구", "대덕구"],
  세종특별시: ["세종특별자치시"],
  울산광역시: ["중구", "남구", "동구", "북구", "울주군"],
  강원도: [
    "춘천시",
    "원주시",
    "강릉시",
    "동해시",
    "태백시",
    "속초시",
    "삼척시",
    "홍천군",
    "횡성군",
    "영월군",
    "평창군",
    "정선군",
    "철원군",
    "화천군",
    "양구군",
    "인제군",
    "고성군",
    "양양군",
  ],
  경기도: [
    "수원시",
    "성남시",
    "용인시",
    "안양시",
    "안산시",
    "고양시",
    "용인시",
    "청주시",
    "평택시",
    "파주시",
    "광주시",
    "김포시",
    "군포시",
    "의정부시",
    "하남시",
    "오산시",
    "구리시",
    "남양주시",
    "안성시",
    "화성시",
    "광명시",
    "양주시",
    "포천시",
    "여주시",
    "이천시",
    "양평군",
    "가평군",
    "연천군",
  ],
  충청남도: [
    "천안시",
    "공주시",
    "보령시",
    "아산시",
    "서산시",
    "논산시",
    "계룡시",
    "당진시",
    "금산군",
    "부여군",
    "서천군",
    "청양군",
    "홍성군",
    "예산군",
    "태안군",
  ],
  충청북도: [
    "청주시",
    "충주시",
    "제천시",
    "보은군",
    "옥천군",
    "영동군",
    "진천군",
    "괴산군",
    "음성군",
    "단양군",
  ],
  경상북도: [
    "포항시",
    "경주시",
    "김천시",
    "안동시",
    "구미시",
    "영주시",
    "영천시",
    "상주시",
    "문경시",
    "경산시",
    "군위군",
    "의성군",
    "청송군",
    "영양군",
    "영덕군",
    "청도군",
    "고령군",
    "성주군",
    "칠곡군",
    "예천군",
    "봉화군",
    "울진군",
  ],
  경상남도: [
    "창원시",
    "진주시",
    "통영시",
    "사천시",
    "김해시",
    "밀양시",
    "거제시",
    "양산시",
    "의령군",
    "함안군",
    "창녕군",
    "고성군",
    "남해군",
    "하동군",
    "산청군",
    "함양군",
    "거창군",
    "합천군",
  ],
  전라북도: [
    "전주시",
    "군산시",
    "익산시",
    "정읍시",
    "남원시",
    "김제시",
    "완주군",
    "진안군",
    "무주군",
    "장수군",
    "임실군",
    "순창군",
    "고창군",
    "부안군",
  ],
  전라남도: [
    "담양군",
    "곡성군",
    "구례군",
    "고흥군",
    "보성군",
    "화순군",
    "장흥군",
    "강진군",
    "해남군",
    "영암군",
    "무안군",
    "함평군",
    "영광군",
    "장성군",
    "완도군",
    "진도군",
    "신안군",
  ],
  제주도: ["제주시", "서귀포시"],
};

const LocationSearch = () => {
  const navigation = useNavigation();
  const [responseData, setResponseData] = useState([]);
  const [markerInfo, setMarkerInfo] = useState(null);
  const modalRef = useRef(null);
  const modalRef2 = useRef(null);

  const [selectedLocation, setSelectedLocation] = useState(null); // 특별시,광역시,도 가 선택됬을 때 그에 맞는 시,군,구를 보여주게하기 위한  변수
  const [selectedDistrict, setSelectedDistrict] = React.useState(null);
  const [checkPushCity, setCheckPushCity] = React.useState(false); //특별시,광역시,도 가 선택됬을 때 뷰를 전환하기 위한 변수
  const [selectedSearchWay, setSelectedSerchWay] = React.useState(false); //검색방식을 컨트롤하기 위한 boolean타입 변수
  const [responseDatas, setResponseDatas] = useState([]);
  const [responseDatas2, setResponseDatas2] = useState([]);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  // React.useEffect(() => {
  //   // x 또는 y 값이 변경될 때 실행할 로직을 여기에 작성
  // }, [latitude, longitude]);

  const initialRegion = {
    latitude: latitude,
    longitude: longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  const encodeURLWithUnderscore = (url) => {
    if (url === "") {
      return "../assets/nephron_default.png";
    }
    const parts = url.split("/");
    const lastPart = parts[parts.length - 1];

    // 5자리 숫자 뒤에 _ 가 없으면 추가
    const addUnderscoreAfterNumber = lastPart.replace(
      /(\d{5})(?![\d_])/,
      "$1_"
    );

    // 문자열 끝에 _ 가 있으면 제거
    const removeTrailingUnderscore = addUnderscoreAfterNumber.replace(/_$/, "");

    parts[parts.length - 1] = removeTrailingUnderscore;

    return parts.join("/");
  };

  const handleMarker = (marker) => {
    setMarkerInfo(marker);
    modalRef.current?.open();
  };
  const handleMarker2 = (marker) => {
    setMarkerInfo(marker);
    modalRef2.current?.open();

  };

useEffect(() => {
    const fetchData = async () => {
      if (selectedLocation) {
        try {
          console.log(selectedLocation)
          console.log(selectedDistrict)
          const response = await axios.post(
            "http://10.20.102.134:3030/search/bin_read_region",
            {
              state:selectedLocation, // '특별시', '광역시', '도'를 포함한 지역 이름을 그대로 보냅니다.
              city:selectedDistrict,
            }
           
          ); 
          
          const extractedData = response.data.super_bin.map((item) => ({
              _id: item._id,
              address: item.address,
              location: item.location,
              name: item.name,
              input_wastes: item.input_wastes,
              image_url: item.image_url,
            }));

            const extractedData2 = response.data.Seoul_trashbin.map((item) => ({
              _id: item._id,
              address: item.입력주소,
              name:item.detail,
              location: item.location,
             
            }));
            setResponseDatas(extractedData);
            
            setResponseDatas2(extractedData2 ); // 응답으로 받은 데이터를 state에 저장
            console.log(response.data.Seoul_trashbin)
 
          
         
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchData();
  }, [selectedLocation,selectedDistrict]); 
 // 의존성 배열을 selectedLocation으로 변경했습니다.
  
  
  


  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setCheckPushCity(true);
  };
  const handleAddressSubmit = async (address) => {
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
  const renderMapCheck = () => (
    <View>
      <View style={styles.buttonContainer}>
        <View style={{ ...styles.locationButton, ...styles.selectedLocation }}>
          <TouchableOpacity
            onPress={() => {
              setSelectedLocation(null);
              setSelectedDistrict(null);
            }}
          >
            <Text style={styles.buttonText}>{selectedLocation}</Text>
          </TouchableOpacity>
        </View>

        <View style={{ ...styles.locationButton, ...styles.selectedLocation }}>
          <TouchableOpacity
            onPress={() => {
              setSelectedDistrict(null);
            }}
          >
            <Text style={styles.buttonText}>{selectedDistrict}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <GestureHandlerRootView style={styles.flexContainer}>
      <MapView
        style={{ flex: 1 }}
        provider={PROVIDER_GOOGLE}
        initialRegion={initialRegion}
        showsUserLocation={true}
        region={initialRegion}
      >
        {responseDatas.length > 0 &&
        responseDatas.map((realData) => (
          <Marker
          key={realData._id}
          coordinate={{
            latitude: realData.location.coordinates[1], // 위도
            longitude: realData.location.coordinates[0], // 경도
          }}
          image={imageMapping[imageReturn(realData.input_wastes)]} // 이미지 URL 사용
          title={realData.name}
          description={realData.address}
          onPress={() => handleMarker(realData)}
        />
        ))}
 
    {responseDatas2.length > 0 &&
        responseDatas2.map((realData) => (
          <Marker
            key={realData._id}
            coordinate={{
              latitude: realData.location.coordinates[1], // 위도
              longitude: realData.location.coordinates[0], // 경도
            }}
            image={require("../assets/marker_n.png")}
            title={realData.name}
            description={realData.address}
            onPress={() => handleMarker2(realData)}
          />
        ))}
    </MapView>

        <Modalize
          ref={modalRef}
          snapPoint={deviceHeight - 300}
          scrollViewProps={{ showsVerticalScrollIndicator: false }}
        >
          <ModalContent
            encodeURL={encodeURLWithUnderscore}
            marker={markerInfo}
          />
        </Modalize> 

        <Modalize
          ref={modalRef2}
          snapPoint={deviceHeight - 300}
          scrollViewProps={{ showsVerticalScrollIndicator: false }}
        >
          <ModalContent2
            marker={markerInfo}
          />
        </Modalize> 
        </GestureHandlerRootView>
    </View>
  );
  const renderSeoulDistricts = () => {
    //선택된 지역의 시,군,구를 나타내는 함수
    // 선택된 위치(selectedLocation)가 서울일 때 해당 서울 구를 나열
    if (selectedLocation === "서울특별시") {
      return (
        <ScrollView contentContainerStyle={styles.districtContainer}>
          <View
            style={{
              ...styles.locationButton,
              ...styles.selectedLocation,
              width: deviceWidth * 0.95,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setSelectedLocation(null);
              }}
            >
              <Text>서울특별시</Text>
            </TouchableOpacity>
          </View>
          {cities["서울특별시"].map((district, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.districtButton,
                selectedDistrict === district && styles.selectedLocation,
              ]}
              onPress={async () => {
                await setSelectedDistrict(district);
                const makeAddress = selectedLocation + " " + district;
                handleAddressSubmit(makeAddress);
              }}
            >
              <Text style={styles.districtButtonText}>{district}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      );
    } else if (selectedLocation === "부산광역시") {
      return (
        <ScrollView contentContainerStyle={styles.districtContainer}>
          <View
            style={{
              ...styles.locationButton,
              ...styles.selectedLocation,
              width: deviceWidth * 0.95,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setSelectedLocation(null);
              }}
            >
              <Text>부산광역시</Text>
            </TouchableOpacity>
          </View>
          {cities["부산광역시"].map((district, index) => (
            <TouchableOpacity
              key={index}
              style={styles.districtButton}
              onPress={async () => {
                await setSelectedDistrict(district);
                const makeAddress = selectedLocation + " " + district;
                handleAddressSubmit(makeAddress);
              }}
            >
              <Text style={styles.districtButtonText}>{district}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      );
    } else if (selectedLocation === "대구광역시") {
      return (
        <ScrollView contentContainerStyle={styles.districtContainer}>
          <View
            style={{
              ...styles.locationButton,
              ...styles.selectedLocation,
              width: deviceWidth * 0.95,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setSelectedLocation(null);
              }}
            >
              <Text>대구광역시</Text>
            </TouchableOpacity>
          </View>
          {cities["대구광역시"].map((district, index) => (
            <TouchableOpacity
              key={index}
              style={styles.districtButton}
              onPress={async () => {
                await setSelectedDistrict(district);
                const makeAddress = selectedLocation + " " + district;
                handleAddressSubmit(makeAddress);
              }}
            >
              <Text style={styles.districtButtonText}>{district}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      );
    } else if (selectedLocation === "인천광역시") {
      return (
        <ScrollView contentContainerStyle={styles.districtContainer}>
          <View
            style={{
              ...styles.locationButton,
              ...styles.selectedLocation,
              width: deviceWidth * 0.95,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setSelectedLocation(null);
              }}
            >
              <Text>인천광역시</Text>
            </TouchableOpacity>
          </View>
          {cities["인천광역시"].map((district, index) => (
            <TouchableOpacity
              key={index}
              style={styles.districtButton}
              onPress={async () => {
                await setSelectedDistrict(district);
                const makeAddress = selectedLocation + " " + district;
                handleAddressSubmit(makeAddress);
              }}
            >
              <Text style={styles.districtButtonText}>{district}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      );
    } else if (selectedLocation === "광주광역시") {
      return (
        <ScrollView contentContainerStyle={styles.districtContainer}>
          <View
            style={{
              ...styles.locationButton,
              ...styles.selectedLocation,
              width: deviceWidth * 0.95,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setSelectedLocation(null);
              }}
            >
              <Text>광주광역시</Text>
            </TouchableOpacity>
          </View>
          {cities["광주광역시"].map((district, index) => (
            <TouchableOpacity
              key={index}
              style={styles.districtButton}
              onPress={async () => {
                await setSelectedDistrict(district);
                const makeAddress = selectedLocation + " " + district;
                handleAddressSubmit(makeAddress);
              }}
            >
              <Text style={styles.districtButtonText}>{district}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      );
    } else if (selectedLocation === "대전광역시") {
      return (
        <ScrollView contentContainerStyle={styles.districtContainer}>
          <View
            style={{
              ...styles.locationButton,
              ...styles.selectedLocation,
              width: deviceWidth * 0.95,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setSelectedLocation(null);
              }}
            >
              <Text>대전광역시</Text>
            </TouchableOpacity>
          </View>
          {cities["대전광역시"].map((district, index) => (
            <TouchableOpacity
              key={index}
              style={styles.districtButton}
              onPress={async () => {
                await setSelectedDistrict(district);
                const makeAddress = selectedLocation + " " + district;
                handleAddressSubmit(makeAddress);
              }}
            >
              <Text style={styles.districtButtonText}>{district}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      );
    } else if (selectedLocation === "세종특별시") {
      return (
        <ScrollView contentContainerStyle={styles.districtContainer}>
          <View
            style={{
              ...styles.locationButton,
              ...styles.selectedLocation,
              width: deviceWidth * 0.95,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setSelectedLocation(null);
              }}
            >
              <Text>세종특별시</Text>
            </TouchableOpacity>
          </View>
          {cities["세종특별시"].map((district, index) => (
            <TouchableOpacity
              key={index}
              style={styles.districtButton}
              onPress={async () => {
                await setSelectedDistrict(district);
                const makeAddress = selectedLocation + " " + district;
                handleAddressSubmit(makeAddress);
              }}
            >
              <Text style={styles.districtButtonText}>{district}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      );
    } else if (selectedLocation === "울산광역시") {
      return (
        <ScrollView contentContainerStyle={styles.districtContainer}>
          <View
            style={{
              ...styles.locationButton,
              ...styles.selectedLocation,
              width: deviceWidth * 0.95,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setSelectedLocation(null);
              }}
            >
              <Text>울산광역시</Text>
            </TouchableOpacity>
          </View>
          {cities["울산광역시"].map((district, index) => (
            <TouchableOpacity
              key={index}
              style={styles.districtButton}
              onPress={async () => {
                await setSelectedDistrict(district);
                const makeAddress = selectedLocation + " " + district;
                handleAddressSubmit(makeAddress);
              }}
            >
              <Text style={styles.districtButtonText}>{district}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      );
    } else if (selectedLocation === "강원도") {
      return (
        <ScrollView contentContainerStyle={styles.districtContainer}>
          <View
            style={{
              ...styles.locationButton,
              ...styles.selectedLocation,
              width: deviceWidth * 0.95,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setSelectedLocation(null);
              }}
            >
              <Text>강원도</Text>
            </TouchableOpacity>
          </View>
          {cities["강원도"].map((district, index) => (
            <TouchableOpacity
              key={index}
              style={styles.districtButton}
              onPress={async () => {
                await setSelectedDistrict(district);
                const makeAddress = selectedLocation + " " + district;
                handleAddressSubmit(makeAddress);
              }}
            >
              <Text style={styles.districtButtonText}>{district}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      );
    } else if (selectedLocation === "경기도") {
      return (
        <ScrollView contentContainerStyle={styles.districtContainer}>
          <View
            style={{
              ...styles.locationButton,
              ...styles.selectedLocation,
              width: deviceWidth * 0.95,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setSelectedLocation(null);
              }}
            >
              <Text>경기도</Text>
            </TouchableOpacity>
          </View>
          {cities["경기도"].map((district, index) => (
            <TouchableOpacity
              key={index}
              style={styles.districtButton}
              onPress={async () => {
                await setSelectedDistrict(district);
                const makeAddress = selectedLocation + " " + district;
                handleAddressSubmit(makeAddress);
              }}
            >
              <Text style={styles.districtButtonText}>{district}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      );
    } else if (selectedLocation === "충청남도") {
      return (
        <ScrollView contentContainerStyle={styles.districtContainer}>
          <View
            style={{
              ...styles.locationButton,
              ...styles.selectedLocation,
              width: deviceWidth * 0.95,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setSelectedLocation(null);
              }}
            >
              <Text>충청남도</Text>
            </TouchableOpacity>
          </View>
          {cities["충청남도"].map((district, index) => (
            <TouchableOpacity
              key={index}
              style={styles.districtButton}
              onPress={async () => {
                await setSelectedDistrict(district);
                const makeAddress = selectedLocation + " " + district;
                handleAddressSubmit(makeAddress);
              }}
            >
              <Text style={styles.districtButtonText}>{district}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      );
    } else if (selectedLocation === "충청북도") {
      return (
        <ScrollView contentContainerStyle={styles.districtContainer}>
          <View
            style={{
              ...styles.locationButton,
              ...styles.selectedLocation,
              width: deviceWidth * 0.95,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setSelectedLocation(null);
              }}
            >
              <Text>충청북도</Text>
            </TouchableOpacity>
          </View>
          {cities["충청북도"].map((district, index) => (
            <TouchableOpacity
              key={index}
              style={styles.districtButton}
              onPress={async () => {
                await setSelectedDistrict(district);
                const makeAddress = selectedLocation + " " + district;
                handleAddressSubmit(makeAddress);
              }}
            >
              <Text style={styles.districtButtonText}>{district}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      );
    } else if (selectedLocation === "경상북도") {
      return (
        <ScrollView contentContainerStyle={styles.districtContainer}>
          <View
            style={{
              ...styles.locationButton,
              ...styles.selectedLocation,
              width: deviceWidth * 0.95,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setSelectedLocation(null);
              }}
            >
              <Text>경상북도</Text>
            </TouchableOpacity>
          </View>
          {cities["경상북도"].map((district, index) => (
            <TouchableOpacity
              key={index}
              style={styles.districtButton}
              onPress={async () => {
                await setSelectedDistrict(district);
                const makeAddress = selectedLocation + " " + district;

                handleAddressSubmit(makeAddress);
              }}
            >
              <Text style={styles.districtButtonText}>{district}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      );
    } else if (selectedLocation === "경상남도") {
      return (
        <ScrollView contentContainerStyle={styles.districtContainer}>
          <View
            style={{
              ...styles.locationButton,
              ...styles.selectedLocation,
              width: deviceWidth * 0.95,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setSelectedLocation(null);
              }}
            >
              <Text>경상남도</Text>
            </TouchableOpacity>
          </View>
          {cities["경상남도"].map((district, index) => (
            <TouchableOpacity
              key={index}
              style={styles.districtButton}
              onPress={async () => {
                await setSelectedDistrict(district);
                const makeAddress = selectedLocation + " " + district;
                handleAddressSubmit(makeAddress);
              }}
            >
              <Text style={styles.districtButtonText}>{district}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      );
    } else if (selectedLocation === "전라북도") {
      return (
        <ScrollView contentContainerStyle={styles.districtContainer}>
          <View
            style={{
              ...styles.locationButton,
              ...styles.selectedLocation,
              width: deviceWidth * 0.95,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setSelectedLocation(null);
              }}
            >
              <Text>전라북도</Text>
            </TouchableOpacity>
          </View>
          {cities["전라북도"].map((district, index) => (
            <TouchableOpacity
              key={index}
              style={styles.districtButton}
              onPress={async () => {
                await setSelectedDistrict(district);
                const makeAddress = selectedLocation + " " + district;
                handleAddressSubmit(makeAddress);
              }}
            >
              <Text style={styles.districtButtonText}>{district}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      );
    } else if (selectedLocation === "전라남도") {
      return (
        <ScrollView contentContainerStyle={styles.districtContainer}>
          <View
            style={{
              ...styles.locationButton,
              ...styles.selectedLocation,
              width: deviceWidth * 0.95,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setSelectedLocation(null);
              }}
            >
              <Text>전라남도</Text>
            </TouchableOpacity>
          </View>
          {cities["전라남도"].map((district, index) => (
            <TouchableOpacity
              key={index}
              style={styles.districtButton}
              onPress={async () => {
                await setSelectedDistrict(district);
                const makeAddress = selectedLocation + " " + district;
                handleAddressSubmit(makeAddress);
              }}
            >
              <Text style={styles.districtButtonText}>{district}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      );
    } else if (selectedLocation === "제주도") {
      return (
        <ScrollView contentContainerStyle={styles.districtContainer}>
          <View
            style={{
              ...styles.locationButton,
              ...styles.selectedLocation,
              width: deviceWidth * 0.95,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setSelectedLocation(null);
              }}
            >
              <Text>제주도</Text>
            </TouchableOpacity>
          </View>
          {cities["제주도"].map((district, index) => (
            <TouchableOpacity
              key={index}
              style={styles.districtButton}
              onPress={async () => {
                await setSelectedDistrict(district);
                const makeAddress = selectedLocation + " " + district;
                handleAddressSubmit(makeAddress);
              }}
            >
              <Text style={styles.districtButtonText}>{district}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          onPress={() => {
            setSelectedSerchWay(true);
            navigation.navigate("SearchCan");
          }}
          style={styles.tab}
        >
          <Text style={styles.tabText}>직접 입력</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSelectedSerchWay(false);
          }}
          style={[styles.tab, styles.selectedTab]}
        >
          <Text style={styles.tabText}>지역 검색</Text>
        </TouchableOpacity>
      </View>

      {selectedLocation === null && (
        <View style={styles.buttonContainer}>
          {specialCities.map((city, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.locationButton,
                selectedLocation === city && styles.selectedLocation,
              ]}
              onPress={() => handleLocationSelect(city)}
            >
              <Text style={styles.buttonText}>{provinces[index]}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {selectedDistrict === null
        ? renderSeoulDistricts()
        : renderMapCheck(selectedLocation, selectedDistrict)}
    </SafeAreaView>
  );
};

function ModalContent({ encodeURL, marker }) {
  if (marker == null) {
    return <Text>"data isn't exist"</Text>;
  }
  if (marker) {
    return (
      <ScrollView contentContainerStyle={styles.modalContent}>
        {marker.image_url === "" && (
          <Image
            source={require("../assets/nephron_default.png")}
            style={{
              width: deviceWidth - 30,
              height: (deviceWidth - 30) * 0.75,
              borderRadius: 15,
            }}
          />
        )}
        {marker.image_url.length > 0 && (
          <Image
            source={{
              uri: encodeURL(marker.image_url),
            }}
            style={{
              width: deviceWidth - 30,
              height: (deviceWidth - 30) * 0.75,
              borderRadius: 15,
            }}
          />
        )}
        <Text style={styles.title}>{marker.name}</Text>
        {/* Information Rows */}
        <InfoRow
          icon="✔️"
          title="타입가능성"
          content={marker.input_wastes.join(", ")}
        />
        <InfoRow
          icon="⏰"
          title="타입개수 제한"
          content="1일 1회 30개 (1회 30개)"
        />
        <InfoRow icon="🕰️" title="운영시간" content="08:00 ~ 20:00" />
        <InfoRow icon="📍" title="주소" content={marker.address} />
        {/* Action Button */}
      </ScrollView>
    );
  } else {
    return <text>index 데이터가 존재하지 않습니다.</text>;
  }
}
function ModalContent2({  marker }) {
  if (marker == null) {
    return <Text>"data isn't exist"</Text>;
  }
  if (marker) {
    return (
      <ScrollView contentContainerStyle={styles.modalContent}>
       
          <Image
            source={require("../assets/nephron_default.png")}
            style={{
              width: deviceWidth - 30,
              height: (deviceWidth - 30) * 0.75,
              borderRadius: 15,
            }}
          />
        
   
        <Text style={styles.title}>{marker.name}</Text>
        {/* Information Rows */}
        <InfoRow
          icon="✔️"
          title="타입가능성"
          content="일반 쓰레기"
        />

        <InfoRow icon="📍" title="주소" content={marker.address} />
        {/* Action Button */}
      </ScrollView>
    );
  } else {
    return <text>index 데이터가 존재하지 않습니다.</text>;
  }
}

function InfoRow({ icon, title, content }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoIcon}>{icon}</Text>
      <View style={{ flex: 1 }}>
        <Text style={styles.infoTitle}>{title}</Text>
        <Text style={styles.infoContent}>{content}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  flexContainer: {
    flex: 1,
  },

  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 20,
  },
  locationButton: {
    width: "45%",
    paddingVertical: 15,
    margin: 5,
    borderWidth: 2,
    borderColor: "#4EB100",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedLocation: {
    backgroundColor: "#4EB100",
  },
  buttonText: {
    fontSize: 18,
    color: "#000000",
  },
  districtContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  districtButton: {
    width: "45%",
    paddingVertical: 15,
    margin: 5,
    borderWidth: 2,
    borderColor: "#4EB100",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  districtButtonText: {
    fontSize: 18,
    color: "#000000",
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "#E0E0E0",
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
});

export default LocationSearch;