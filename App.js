import React, { useState, useEffect, useReducer } from "react";
import { Text, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import "react-native-gesture-handler";
import Spinner from "react-native-loading-spinner-overlay";
import * as SecureStore from "expo-secure-store";
import AuthContext from "./features/context/AuthContext";
import authReducer from "./features/context/authReducer";
import LOGIN_QUERY from "./features/queries/loginQuery";
import { ADD_USER } from "./features/mutations/userMutation";
import { initState } from "./features/context/initState";
import withApollo from "./features/apollo/withApollo";
import { registerFormValidation } from "./features/validation/validation";
import "./features/styles/global";
import NavigatorAuth from "./routes/drawerAuth";
import NavigatorUnAuth from "./routes/draweUnAuth";

const App = ({ apolloClient }) => {
  const [isToken, setToken] = useState(false);
  const [isLoading, setStatusOfLoading] = useState(true);

  const [state, dispatch] = useReducer(authReducer, initState);

  const signIn = creds => {
    setStatusOfLoading(true);
    const { email, password } = creds;
    apolloClient
      .query({ query: LOGIN_QUERY, variables: { email, password } })
      .then(({ data }) => {
        setStatusOfLoading(false);
        const {
          login: { token }
        } = data;
        if (token !== null) {
          SecureStore.setItemAsync("token", token);
          setToken(true);
        }
      })
      .catch(err => {
        dispatch({
          type: "LOGIN_CONNECTION_ERROR",
          msg: "Błąd łączenia z baza danych"
        });
        setStatusOfLoading(false);
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
            setToken(true);
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

  const logOut = () => {
    console.log("we are here");
    setStatusOfLoading(true);
    SecureStore.deleteItemAsync("token")
      .then(resp => {
        setStatusOfLoading(false);
        setToken(false);
      })
      .catch(err => {
        setStatusOfLoading(false);
      });
  };

  useEffect(() => {
    SecureStore.getItemAsync("token").then(resp => {
      if (resp !== null) setToken(true);
      setStatusOfLoading(false);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        signUp,
        setToken,
        logOut
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
      ) : isToken ? (
        <NavigatorAuth />
      ) : (
        <NavigatorUnAuth />
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
    color: "$primaryColor",
    fontSize: "4.5rem",
    marginTop: "$largeMargin"
  },
  spinnerTextStyle: {
    color: "white",
    fontSize: "1.2rem"
  }
});

export default withApollo(App);
