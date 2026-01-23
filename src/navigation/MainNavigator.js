import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserListScreen from '../screens/UserListScreen';
import UserDetailScreen from '../screens/UserDetailScreen';
import MazeScreen from '../screens/MazeScreen';

const Stack = createNativeStackNavigator();

export default function MainNavigator() {
  return (
   <Stack.Navigator initialRouteName="MazeScreen">
    <Stack.Screen name="MazeScreen" component={MazeScreen} />
    <Stack.Screen name="Users" component={UserListScreen} />
    <Stack.Screen name="UserDetail" component={UserDetailScreen} />
  </Stack.Navigator>
  );
}
