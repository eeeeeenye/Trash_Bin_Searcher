import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import trashData from "../testData/trashData";

const AdminCanAdd = () => {
  const [data, setData] = useState(trashData);

  const toggleRegistration = (index) => {
    setData((prevData) =>
      prevData.map((item, i) =>
        i === index ? { ...item, registered: !item.registered } : item
      )
    );
  };

  return (
    <ScrollView>
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

export default AdminCanAdd;
