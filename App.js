import React, { useState, useEffect, useReducer } from "react";
import { Text, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Spinner from "react-native-loading-spinner-overlay";
import * as SecureStore from "expo-secure-store";
import SignIn from "./features/components/Auth/SignIn";
import SignUp from "./features/components/Auth/SignUp";
import Home from "./features/components/Home/Home";
import AuthContext from "./features/context/AuthContext";
import authReducer from "./features/context/authReducer";
import LOGIN_QUERY from "./features/queries/loginQuery";
import { ADD_USER } from "./features/mutations/userMutation";
import { initState } from "./features/context/initState";
import withApollo from "./features/apollo/withApollo";
import { registerFormValidation } from "./features/validation/validation";
import "./features/styles/global";

const Stack = createStackNavigator();

const App = ({ apolloClient }) => {
  const [isLoading, setStatusOfLoading] = useState(true);
  const [islogged, setStatusOfLogged] = useState(false);

  const [state, dispatch] = useReducer(authReducer, initState);

  const signIn = creds => {
    const { email, password } = creds;
    apolloClient
      .query({ query: LOGIN_QUERY, variables: { email, password } })
      .then(({ data }) => {
        const {
          login: { token }
        } = data;
        if (token !== null) {
          SecureStore.setItemAsync("token", token);
          setStatusOfLogged(true);
        }
      })
      .catch(err => {
        dispatch({
          type: "LOGIN_CONNECTION_ERROR",
          msg: "Błąd łączenia z baza danych"
        });
      });
  };

  const signUp = creds => {
    const { email, password, firstName, lastName, phoneNumber } = creds;
    if (registerFormValidation({ ...creds, dispatch })) {
      apolloClient
        .mutate({
          mutation: ADD_USER,
          variables: {
            email,
            password,
            firstName,
            lastName,
            phoneNumber: Number(phoneNumber)
          }
        })
        .then(({ data }) => {
          const {
            createUser: { token }
          } = data;
          if (token !== null) {
            SecureStore.setItemAsync("token", token);
            setStatusOfLogged(true);
          }
        })
        .catch(err => {
          dispatch({
            type: "REGISTER_CONNECTION_ERROR",
            msg: "Błąd łączenia z baza danych"
          });
        });
    }
  };

  useEffect(() => {
    SecureStore.getItemAsync("token").then(resp => {
      if (resp !== null) setStatusOfLogged(true);
      setStatusOfLoading(false);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        signUp
      }}
    >
      {isLoading ? (
        <View style={[styles.container]}>
          <Text style={styles.brand}>Bringo</Text>
          <Spinner
            visible={isLoading}
            textContent={"Ładowanie"}
            textStyle={styles.spinnerTextStyle}
          />
        </View>
      ) : (
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false
            }}
          >
            {islogged ? (
              <Stack.Screen name="Home" component={Home} />
            ) : (
              <>
                <Stack.Screen name="SignIn" component={SignIn} />
                <Stack.Screen name="SignUp" component={SignUp} />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </AuthContext.Provider>
  );
};

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center"
  },
  brand: {
    fontSize: "6rem",
    color: "$primaryColor",
    marginTop: "30%"
  },
  spinnerTextStyle: {
    color: "white"
  }
});

export default withApollo(App);
