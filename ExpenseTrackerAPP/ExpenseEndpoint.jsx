import { Platform, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import ExpenseTrackerNavigator from './Navigations/ExpenseTrackerNavigator.jsx';
import { ExpenseProvider } from './context/ExpenseContext.jsx';
import SplashScreen from 'react-native-splash-screen';

const ExpenseEndpoint = () => {


  useEffect(()=>{
    if (Platform.OS === 'android') 
    SplashScreen.hide();
  },[])

  return (
    <ExpenseProvider>
      <NavigationContainer>
        <ExpenseTrackerNavigator />
      </NavigationContainer>
    </ExpenseProvider>
  );
};

export default ExpenseEndpoint;

const styles = StyleSheet.create({});
