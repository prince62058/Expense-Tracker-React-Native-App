import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../Screens/Home.jsx';
import Create from '../Screens/Create.jsx';
import Insights from '../Screens/Insights.jsx';
import Profile from '../Screens/Profile.jsx';
import Icon from 'react-native-vector-icons/Ionicons';
import Category from '../Screens/Category.jsx';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MyTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Create') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          } else if (route.name === 'Insights') {
            iconName = focused ? 'bar-chart' : 'bar-chart-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Create" component={Create} />
      <Tab.Screen name="Insights" component={Insights} />
    </Tab.Navigator>
  );
};

const ExpenseTrackerNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BottomTabs" component={MyTabs} />
      <Stack.Screen
        name="Category"
        component={Category}
        options={{
          presentation: 'modal',
          animation: 'slide_from_bottom',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
export default ExpenseTrackerNavigator;

const styles = StyleSheet.create({});

// There are Two Screens
//StackScreen
//BottomTabsScreen - inside the stack- we will call out bottom tabs as one of the screens
