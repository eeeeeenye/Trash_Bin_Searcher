// App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MenuScreen from './Screen/menuScreen';
import RegisterScreen from './Screen/registerScreen';
import ComplaintPage from './Screen/compaintPage';
import TrashBinRegistration from './Screen/trashBinRegistration';
const Stack = createNativeStackNavigator();

const App = () => {
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
            headerTitle: '민원',
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
          name="RegisterScreen" // 화면 이름 수정
          component={RegisterScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
