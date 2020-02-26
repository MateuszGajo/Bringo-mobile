
import React, { useState, useEffect, useReducer } from "react";
import "react-native-gesture-handler";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
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
import Loading from "./screens/loading";
import { SERVER_URL } from "./config";

const App = ({ apolloClient }) => {
  const [isToken, setToken] = useState(false);
  const [isLoading, setStatusOfLoading] = useState(true);
  const [refreshLearning, setRefreshLearning] = useState(false);
  const [refreshResume, setRefreshResume] = useState(false);
  const [refreshRanking, setRefreshRanking] = useState(false);

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
    setStatusOfLoading(true);
    SecureStore.deleteItemAsync("token")
      .then(resp => {
        setToken(false);
        setStatusOfLoading(false);
      })
      .catch(err => {
        setStatusOfLoading(false);
      });
  };

  const resetStore = () => {
    apolloClient.resetStore();
  };

  useEffect(() => {
    SecureStore.getItemAsync("token").then(token => {
      if (token !== null) {
        return axios
          .get(SERVER_URL + "/auth/me", {
            headers: {
              Authorization: token || "",
              "Content-Type": "application/x-www-form-urlencoded"
            }
          })
          .then(resp => {
            if (resp.data.success) {
              setToken(true);
            }
            setStatusOfLoading(false);
          })
          .catch(err => {
            setStatusOfLoading(false);
          });
      }
      setStatusOfLoading(false);
    });
  }, [isToken]);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        signUp,
        setToken,
        logOut,
        resetStore,
        refreshLearning,
        refreshResume,
        refreshRanking,
        setRefreshLearning,
        setRefreshResume,
        setRefreshRanking
      }}
    >
      {isLoading ? (
        <Loading isLoading={isLoading} />
      ) : isToken ? (
        <NavigatorAuth />
      ) : (
        <NavigatorUnAuth />
      )}
    </AuthContext.Provider>
  );
};

export default withApollo(App);
>>>>>>> features/application-logic
