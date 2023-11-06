import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Modal,
  Button,
  ScrollView,
} from "react-native";
import CoodData from "../component/coodData";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { Modalize } from "react-native-modalize";
import { GestureHandlerRootView } from "react-native-gesture-handler";
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;
const API_KEY = "AIzaSyC3k7HBbhN327lvM3fyx006TZ3bHcYS9KY";

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
const SearchCan = () => {

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
  
  const navigation = useNavigation();

  // 초기 좌표 설정
  const initialRegion = {
    latitude: 37.575843,
    longitude: 126.97738,
    latitudeDelta: 0.09,
    longitudeDelta: 0.04,
  };
  const [address, setAddress] = React.useState("");
  const [latitude, setLatitude] = React.useState(0);
  const [longitude, setLongitude] = React.useState(0);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [placeDetailsResult, setPlaceDetailsResult] = React.useState({});
  const [markerInfo, setMarkerInfo] = React.useState({});

  async function getPlaceDetails(placeId) {
    try {
      const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${API_KEY}`;

      const response = await axios.get(url);
      console.log("실행은 됌?");
      console.log(response);
      if (response.data.result) {
        console.log("디테일:", response);
        setPlaceDetailsResult(response.data.result);
        setModalVisible(true); // 성공적으로 결과 받으면 모달 보이게 설정
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleAddressSubmit = async () => {
    try {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=${API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();

      const results = data.results;
      if (results.length > 0) {
        console.log(results);
        setModalVisible(true);
        const { lat, lng } = results[0].geometry.location;
        setLatitude(lat);
        setLongitude(lng);
        //장소의 세부정보 가져오기
        const placeId = results[0].place_id;
        getPlaceDetails(placeId);
      } else {
        alert.alert("Error", "No results found");
      }
    } catch (error) {
      alert.alert("Error", "Geocoding API request failed");
    }
  };
  const [selectedSearchWay, setSelectedSearchWay] = React.useState(true);
  const trashCategory = ["재활용만", "일반\n쓰레기만", "모두"];
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
    } else if (arr.includes("pp")) {
      return "pp";
    } else {
      return "";
    }
  };
  const modalRef = React.useRef(null);
  const selectedIndex = React.useRef(null);
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
    onOpen();
  };
  const onOpen = () => {
    modalRef.current?.open();
  };
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* 지도 */}

      {/* 상단 탭 */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          onPress={() => {
            setSelectedSearchWay(true);
          }}
          style={[styles.tab, styles.selectedTab]}
        >
          <Text style={styles.tabText}>직접 입력</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSelectedSearchWay(false);
            navigation.navigate("LocationSearch");
          }}
          style={styles.tab}
        >
          <Text style={styles.tabText}>지역 검색</Text>
        </TouchableOpacity>
      </View>

      {/* 나머지 컴포넌트들 */}

      <View style={{ marginTop: 50, position: "relative", zIndex: 1 }}>
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
        <View
          style={{
            ...styles.trashCategories,
            alignItems: "flex-start",
            marginLeft: 10,
          }}
        >
          {trashCategory.map((category, index) => (
            <TouchableOpacity key={index} style={styles.trashCategory}>
              <Text style={styles.categoryText}>{category}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <Modalize
        ref={modalRef}
        snapPoint={deviceHeight * 0.8}
        scrollViewProps={{ showsVerticalScrollIndicator: false }}
      >
        <ModalContent encodeURL={encodeURLWithUnderscore} marker={markerInfo} />
      </Modalize>

      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={initialRegion}
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        {latitude !== 0 && longitude !== 0 && (
          <Marker
            title={placeDetailsResult.name}
            coordinate={{ latitude: latitude, longitude: longitude }}
          ></Marker>
        )}
        {dummydatas.map((dummydata, index) => (
          <TouchableOpacity key={index}>
            <Marker
              key={dummydata.idx}
              coordinate={{
                latitude: dummydata.latitude,
                longitude: dummydata.longitude,
              }}
              image={imageMapping[imageReturn(dummydata.input_wastes)]}
              title={dummydata.name}
              description={dummydata.address}
              onPress={() => {
                handleMarker(dummydata);
              }}
            ></Marker>
          </TouchableOpacity>
        ))}
      </MapView>
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
    </GestureHandlerRootView>
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
  },
  trashCategories: {
    flexDirection: "row",
    marginBottom: 10,
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
  modalContent: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  infoIcon: {
    fontSize: 18,
    marginRight: 10,
    width: 28,
    textAlign: "center",
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  infoContent: {
    fontSize: 16,
  },
  actionButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  actionText: {
    color: "#FFF",
    fontSize: 16,
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

  circleIcon: {
    width: 45,
    height: 45,
  },
});
function ModalContent({ encodeURL, marker }) {
  if (marker == null) {
    return <Text>"data isn't exist"</Text>;
  }
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
        {marker.imageurl.length > 0 && (
          <Image
            source={{
              uri: encodeURL(marker.imageurl),
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
        <InfoRow icon="📍" title="주소" content={dummydatas[1].address} />
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