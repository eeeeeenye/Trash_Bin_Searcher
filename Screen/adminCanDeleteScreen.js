import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet } from "react-native";

const trashData = [
  {
    title: "여기 쓰레기통 없어짐",
    address: "123 Main St",
    date: "2023-10-26",
    content: "The trash can at this location is damaged.",
    photo: "https://t1.daumcdn.net/thumb/R720x0/?fname=http://t1.daumcdn.net/brunch/service/user/PmR/image/kR4EO1k6FIcj__Bv1g8lcY2WQ-I.jpg",
    isOpen: false,
    isCompleted: false,
  },
  {
    title: "Trash Can 2",
    address: "123 Main St",
    date: "2023-10-26",
    content: "The trash can at this location is damaged.",
    photo: "https://mediahub.seoul.go.kr/uploads/mediahub/2021/02/b01fc7d5be224b3ba7d344b6d4b3dc6c.jpg",
    isOpen: false,
    isCompleted: false,
  },
];

const AdminCanDelete = ({ route }) => {
  const [data, setData] = useState(trashData);
  const { cityName } = route.params;

  const toggleItemOpen = (index) => {
    setData((prevData) =>
      prevData.map((item, i) =>
        i === index ? { ...item, isOpen: !item.isOpen } : item
      )
    );
  };

  const toggleItemCompleted = (index) => {
    setData((prevData) =>
      prevData.map((item, i) =>
        i === index ? { ...item, isCompleted: !item.isCompleted } : item
      )
    );
  };

  return (
    <ScrollView>
      <Text style={styles.text}>Selected city: {cityName}</Text>
      {data.map((item, index) => (
        <View key={index} style={styles.itemContainer}>
          <TouchableOpacity onPress={() => toggleItemOpen(index)}>
            <View style={styles.itemHeader}>
              <Text style={styles.title}>{item.title}</Text>
              <Text>{item.address}</Text>
              <Text>{item.date}</Text>
              <TouchableOpacity style={item.isCompleted ? styles.checkedBox : styles.checkBox} onPress={() => toggleItemCompleted(index)}>
                {item.isCompleted && <Text style={styles.checkMark}>✓</Text>}
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
          {item.isOpen && (
            <View style={styles.itemContent}>
              <Text>{item.content}</Text>
              <Image source={{ uri: item.photo }} style={styles.image} />
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    padding: 10,
  },
  itemContainer: {
    margin: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 5,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: "#f5f5f5",
    alignItems: 'center',
  },
  title: {
    fontWeight: "bold",
  },
  itemContent: {
    padding: 10,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    marginTop: 10,
  },
  checkBox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkedBox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkMark: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AdminCanDelete;
