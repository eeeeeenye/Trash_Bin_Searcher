// App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MenuScreen from '../../Screen/menuScreen';
import RegisterScreen from '../../Screen/registerScreen';
import ComplaintPage from '../../Screen/compaintPage';
import TrashBinRegistration from '../../Screen/trashBinRegistration';
import CameraScreen from '../../Screen/cameraScreen';
import SearchCan from '../../Screen/searchCanScreen';
import LocationSearch from '../../Screen/locationSearch';
const Stack = createNativeStackNavigator();

const Stacknav = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="MenuScreen"
          component={MenuScreen}
        />
        <Stack.Screen
          options={{
            headerShown: true,
          }}
          name="SearchCan"
          component={SearchCan}
        />
        <Stack.Screen
          options={{
            headerShown: true,
          }}
          name="LocationSearch"
          component={LocationSearch}
        />
        <Stack.Screen
          options={{
            headerTitle: '삭제민원',
            headerTitleAlign: 'center', 
          }}
          name="ComplaintPage"
          component={ComplaintPage}
        />
         <Stack.Screen
          options={{
            headerTitle: '쓰레기통 등록',
            headerTitleAlign: 'center', 
          }}
          name="trashBinRegistration"
          component={TrashBinRegistration}
        />
        <Stack.Screen
          options={{
            headerTitle: '?Wbin',
            headerTitleStyle: {
              color: '#BDFF00', // 타이틀 색상 변경
              fontSize: 30
            },
          }}
          name="CameraScreen"
          component={CameraScreen}
        />
        <Stack.Screen
          options={{
            headerTitle: '?Wbin',
            headerTitleStyle: {
              color: '#BDFF00', // 타이틀 색상 변경
              fontSize: 30
            },
          }}
          name="RegisterScreen" // 화면 이름 수정
          component={RegisterScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Stacknav;
