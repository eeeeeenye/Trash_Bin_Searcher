import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView , StyleSheet} from "react-native";
import trashData from "../testData/trashData";

const AdminCanAdd= ({ route }) => {
  const [data, setData] = useState(trashData);
  const { cityName } = route.params;//선택된 도시 이름 불러옴
  const toggleRegistration = (index) => {
    setData((prevData) =>
      prevData.map((item, i) =>
        i === index ? { ...item, registered: !item.registered } : item
      )
    );
  };

  return (
    <ScrollView>
      <Text style={styles.text}>Selected city: {cityName}</Text>
      {data.map((item, index) => (
        <TouchableOpacity onPress={() => toggleRegistration(index)} key={index}>
          <View
            style={{
              padding: 10,
              borderBottomWidth: 1,
              borderBottomColor: "#ccc",
            }}
          >
            <Text>Date: {item.date}</Text>
            <Text>Trash Type: {item.trashType}</Text>
            <Text>
              Registered: {item.registered.toString()}
            </Text>
            <Text>
              Latitude: {item.latitude}, Longitude: {item.longitude}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  text: {
    fontSize: 20
  }
});

export default AdminCanAdd;
