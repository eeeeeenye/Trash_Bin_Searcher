// App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MenuScreen from '../Screen/menuScreen';
import RegisterScreen from '../Screen/registerScreen';
import ComplaintPage from '../Screen/complaintPage';
import TrashBinRegistration from '../Screen/trashBinRegistration';
import CameraScreen from '../Screen/cameraScreen';
import SearchCan from '../Screen/searchCanScreen';
import LocationSearch from '../Screen/locationSearch';
import LoginScreen from '../Screen/loginScreen';
import SelectLocation from '../Screen/selectLocation';
import AdminMenuScreen from '../Screen/adminMenuScreen';
import AdminCanAdd from '../Screen/adminCanAddScreen';
import AdminCanDelete from '../Screen/adminCanDeleteScreen';
import SelectLocationD from '../Screen/selectLocationD';
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
          headerTitle: '로그인',
          headerTitleAlign: 'center', 
        }}

        name="Login" 
        component={LoginScreen}
         />
         <Stack.Screen 
         options={{
          headerTitle: '지역 선택',
          headerTitleAlign: 'center', 
        }}

        name="select" 
        component={SelectLocation}
         />

        <Stack.Screen 
         options={{
          headerTitle: '지역 선택',
          headerTitleAlign: 'center', 
        }}

        name="selectD" 
        component={SelectLocationD}
         />

        <Stack.Screen 
         options={{
          headerTitle: '등록관리',
          headerTitleAlign: 'center', 
        }}

        name="ADCA" 
        component={AdminCanAdd}
         />

        <Stack.Screen 
         options={{
          headerTitle: '삭제관리',
          headerTitleAlign: 'center', 
        }}

        name="ADCD" 
        component={AdminCanDelete}
         />
        <Stack.Screen 
         options={{
          headerTitle: '관리자 화면',
          headerTitleAlign: 'center', 
        }}

        name="AdminMenuScreen" 
        component={AdminMenuScreen} 
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
