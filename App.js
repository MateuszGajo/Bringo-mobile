import React, { useState, useEffect } from "react";
import { Text, View, } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Spinner from 'react-native-loading-spinner-overlay';
import SignIn from "./features/components/Auth/SignIn";
import SignUp from './features/components/Auth/SignUp'
import './features/styles/global'


const Stack = createStackNavigator();


export default function App() {
  const [isLoading, setStatusOfLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setStatusOfLoading(false);
    }, 4000)
  }, [])
  return (
    <>
      {isLoading ?
        <View style={[styles.container]}>
          <Text style={styles.brand}>Bringo</Text>
          <Spinner
            visible={isLoading}
            textContent={'Ładowanie'}
            textStyle={styles.spinnerTextStyle}
          />
        </View>
        :
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false
            }}
          >
            <Stack.Screen
              name="SignIn"
              component={SignIn}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUp}
            />
          </Stack.Navigator>
        </NavigationContainer>
      }
    </>
  );
}


const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  brand: {
    fontSize: '6rem',
    color: '$primaryColor',
    marginTop: '30%'
  },
  spinnerTextStyle: {
    color: 'white',
  }
});
