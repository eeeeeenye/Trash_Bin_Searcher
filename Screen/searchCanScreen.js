import React from "react";
import { View, Text, StyleSheet, TextInput, Dimensions, TouchableOpacity, SafeAreaView, Image } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { useNavigation } from '@react-navigation/native';
const deviceWidth = Dimensions.get("window").width;

const SearchCan = () => {
  

  const navigation = useNavigation();

  // 초기 좌표 설정
  const initialRegion = {
    latitude: 37.575843,
    longitude: 126.97738,
    latitudeDelta: 0.09,
    longitudeDelta: 0.04,
  };

  const [selectedSearchWay, setSelectedSearchWay] = React.useState(true);
  const trashCategory = ["재활용만", "일반\n쓰레기만", "모두"];

  return (
    <SafeAreaView style={styles.container}>
      {/* 지도 */}
     
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
            setSelectedSearchWay(false);
            navigation.navigate('LocationSearch')
          }}
          style={!selectedSearchWay ? [styles.tab, styles.selectedTab] : styles.tab}
        >
          <Text style={styles.tabText}>지역 검색</Text>
        </TouchableOpacity>
      </View>

      {/* 나머지 컴포넌트들 */} 
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={initialRegion}
        showsUserLocation={true}
        showsMyLocationButton={true}
      />

      <View style={styles.otherComponents}>
     

        {/* 검색 입력란 (위에 겹쳐 표시) */}
        <TextInput placeholder="검색장소 입력" style={styles.input} />
        <TouchableOpacity
          //onPress={()=>{}}   --> 기능 추가 지오코딩 함수
          style={styles.searchIconContainer}
        >
          <Image
            source={require("../assets/search.png")}
            style={styles.searchIcon}
          />
        </TouchableOpacity>   
        <View style={{...styles.trashCategories,alignItems:"flex-start", marginLeft:10}}>
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
      </View>

    </SafeAreaView>
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
    top:50,
    
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
});

export default SearchCan;
