import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Modalize } from "react-native-modalize";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import CoodData from "../component/coodData";

const API_KEY = "AIzaSyC3k7HBbhN327lvM3fyx006TZ3bHcYS9KY"; // Use your actual API key
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const SearchCan = () => {
<<<<<<< HEAD
=======
  
>>>>>>> fcdb019 (bottomB)
  const navigation = useNavigation();
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [selectedSearchWay, setSelectedSearchWay] = useState(true);
  const [markerInfo, setMarkerInfo] = useState({});
  const [responseDatas, setResponseDatas] = useState([]);
  const modalRef = useRef(null);
  const trashCategory = ["재활용만", "일반\n쓰레기만", "모두"];

  const dummydatas = [
    {
      idx: 3,
      name: "업사이클에코센터",
      address: "인천광역시 미추홀구 매소홀로290번길 7",
      region_1: "인천광역시",
      region_2: "",
      imageurl: "",
      latitude: 37.4432153,
      longitude: 126.6553661,
      is_shown_user: "true",
      input_wastes: ["캔", "투명 페트"],
      devices: ["NCAB1711007"],
      display_devices: ["NCAB1711007"],
      reg_at: 1517876661000,
    },
    {
      idx: 4,
      name: "임오동주민센터",
      address: "경상북도 구미시 임은길 61 임오동사무소",
      region_1: "경상북도",
      region_2: "",
      imageurl:
        "https://superbin-web.s3.ap-northeast-2.amazonaws.com/location/1672885036586경북 구미시_임오동주민센터.jpg",
      latitude: 36.0892718,
      longitude: 128.3692414,
      is_shown_user: "true",
      input_wastes: ["캔", "투명 페트"],
      devices: ["NCAB1711006"],
      display_devices: ["NCAB1711006"],
      reg_at: 1517887008000,
    },
    {
      idx: 5,
      name: "상모사곡동주민센터",
      address: "경상북도 구미시 상사서로 199 상모사곡동사무소",
      region_1: "경상북도",
      region_2: "",
      imageurl:
        "https://superbin-web.s3.ap-northeast-2.amazonaws.com/location/1672885049511경북 구미시_상모사곡동주민센터.jpg",
      latitude: 36.099713,
      longitude: 128.3578956,
      is_shown_user: "true",
      input_wastes: ["캔", "투명 페트"],
      devices: ["NCAB1711005"],
      display_devices: ["NCAB1711005"],
      reg_at: 1517887658000,
    },
  ];
  const fetchData = async (lat, lng) => {
    try {
      const response = await axios.post(
        "http://192.168.1.18:8080/search/bin_read_myloc",
        {
          latitude: lat,
          longitude: lng,
        }
      );
      console.log(response.data);

      // Check if superBinData is an array and then process it
      if (Array.isArray(response.data.superBinData)) {
        const extractedData = response.data.superBinData.map((item) => ({
          _id: item._id,
          address: item.address,
          location: item.location,
          name: item.name,
          input_wastes: item.input_wastes,
          image_url: item.image_url,
        }));

        setResponseDatas(extractedData);
      } else {
        console.log("superBinData is not an array or is undefined");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (latitude == 0 || longitude == 0) {
      fetchData(CoodData.latitude, CoodData.longitude);
    } else {
      fetchData(latitude, longitude);
    }
  }, [latitude, longitude]);

  const encodeURLWithUnderscore = (url) => {
    if (!url) {
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
    console.log("url ", parts.join("/"));
    return parts.join("/");
  };

  const handleAddressSubmit = async () => {
    try {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=${API_KEY}`;
      const response = await axios.get(url);
      const data = response.data;

      if (data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
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
      setLatitude("0");
      setLongitude("0");
      setTimeout(() => {
        setLatitude(CoodData.latitude);
        setLongitude(CoodData.longitude);
      }, 10);
    } catch (error) {
      Alert.alert("Error", "Failed to get location");
    }
  };

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

  const handleMarker = (marker) => {
    setMarkerInfo(marker);
    modalRef.current?.open();
  };

  return (
<<<<<<< HEAD
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <GestureHandlerRootView style={styles.flexContainer}>
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
        >
          {dummydatas.map((dummydata, index) => (
            <Marker
              key={dummydata.idx}
              coordinate={{
                latitude: dummydata.latitude,
                longitude: dummydata.longitude,
              }}
              image={imageMapping[imageReturn(dummydata.input_wastes)]}
              title={dummydata.name}
              description={dummydata.address}
              onPress={() => handleMarker(dummydata)}
            />
          ))}
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
        </MapView>

        <View style={styles.tabContainer}>
          <TouchableOpacity
            onPress={() => setSelectedSearchWay(true)}
            style={
              selectedSearchWay ? [styles.tab, styles.selectedTab] : styles.tab
            }
          >
            <Text style={styles.tabText}>직접 입력</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("LocationSearch")}
            style={
              !selectedSearchWay ? [styles.tab, styles.selectedTab] : styles.tab
            }
          >
            <Text style={styles.tabText}>지역 검색</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          placeholder="검색장소 입력"
          style={styles.input}
          value={address}
          onChangeText={setAddress}
        />
        <TouchableOpacity
          onPress={() => {
            handleAddressSubmit();
            fetchData(latitude, longitude);
          }}
=======
    <SafeAreaView style={styles.container}>
      {/* 지도 */}
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={initialRegion}
        showsUserLocation={true}
        showsMyLocationButton={true}
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
        <TextInput placeholder="검색장소 입력" style={styles.input} />
        <TouchableOpacity
          // onPress={()=>{}}   --> 기능 추가 지오코딩 함수
>>>>>>> fcdb019 (bottomB)
          style={styles.searchIconContainer}
        >
          <Image
            source={require("../assets/search.png")}
            style={styles.searchIcon}
          />
<<<<<<< HEAD
        </TouchableOpacity>

=======
        </TouchableOpacity>   
>>>>>>> fcdb019 (bottomB)
        <View style={styles.trashCategories}>
          {trashCategory.map((category, index) => (
            <TouchableOpacity key={index} style={styles.trashCategory}>
              <Text style={styles.categoryText}>{category}</Text>
            </TouchableOpacity>
          ))}
        </View>
<<<<<<< HEAD

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

        <View style={styles.bottomBar}>
          <TouchableOpacity onPress={handleMylocation}>
=======
        
        {/* 하단 바 */}
        <View style={styles.bottomBar}>
          <TouchableOpacity >
>>>>>>> fcdb019 (bottomB)
            <Image
              source={require("../assets/circleB.png")}
              style={styles.circleIcon}
            />
          </TouchableOpacity>
        </View>
<<<<<<< HEAD
      </GestureHandlerRootView>
    </KeyboardAvoidingView>
=======
      </View>
    </SafeAreaView>
>>>>>>> fcdb019 (bottomB)
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flexContainer: {
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
<<<<<<< HEAD
  input: {
    position: "absolute",
    top: 60, // Adjusted for the tab bar
    left: 10,
    right: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "white",
    zIndex: 1,
  },
  searchIconContainer: {
    position: "absolute",
    top: 70, // Adjusted for the tab bar
    right: 20,
    zIndex: 2,
  },
  searchIcon: {
    width: 27,
    height: 27,
=======
  otherComponents: {
    ...StyleSheet.absoluteFillObject,
    top: 50,
    bottom: 0, // 하단 공간 추가
>>>>>>> fcdb019 (bottomB)
  },
  trashCategories: {
    position: "absolute",
    top: 110, // Adjusted for the input field
    left: 10,
    zIndex: 1,
    flexDirection: "row",
<<<<<<< HEAD
=======
    marginBottom: 10,
    marginLeft: 10, // 왼쪽 여백 추가
>>>>>>> fcdb019 (bottomB)
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
  bottomBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 50,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  circleIcon: {
    width: 45,
    height: 45,
  },
  modalContent: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  infoContent: {
    fontSize: 16,
  },
<<<<<<< HEAD
  // ... any additional styles you may have ...
=======
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
>>>>>>> fcdb019 (bottomB)
});

function ModalContent({ encodeURL, marker }) {
  if (!marker) {
    return <Text>"data isn't exist"</Text>;
  }
  const inputWastes = marker.input_wastes || [];
  if (marker) {
    return (
      <ScrollView contentContainerStyle={styles.modalContent}>
        {marker.imageurl === "" && (
          <Image
            source={require("../assets/nephron_default.png")}
            style={{
              width: deviceWidth - 30,
              height: (deviceWidth - 30) * 0.75,
              borderRadius: 15,
            }}
          />
        )}
        {marker.imageurl != "" && (
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
          content={inputWastes.length > 0 ? inputWastes.join(", ") : ""}
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

export default SearchCan;
