import React from "react";
import Stack from "./Navigator/stack";
import CoodData from "./component/coodData";
import * as Location from "expo-location";

const App = () => {
  React.useEffect(() => {
    async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }
    };
  }, [CoodData.latitude, CoodData.longitude]);

  React.useEffect(() => {
    (async () => {
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync(); //위치정보중 latitude와 longitude만을 받아오는 함수

      CoodData.latitude = latitude;
      CoodData.longitude = longitude;
    })();
  }, []);
  return <Stack />;
};

export default App;
