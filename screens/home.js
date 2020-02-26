import React, { useState, useEffect, useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Header from "../features/components/Layout/Header";
import EStyleSheet from "react-native-extended-stylesheet";
import * as SecureStore from "expo-secure-store";
import { useLazyQuery } from "@apollo/react-hooks";
import jwt_deocde from "jwt-decode";
import GET_SESSION from "../features/queries/sessionQuery";
import Loading from "../screens/loading";
import AuthContext from "../features/context/AuthContext";

const Home = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState({ id: "" });
  const [isSession, setStatusOfSession] = useState(false);
  const [isLoading, setStatusOfLoading] = useState(true);

  const { refreshLearning, setRefreshLearning } = useContext(AuthContext);

  const [
    getSession,
    { loading: loadingSession, data: sessionData }
  ] = useLazyQuery(GET_SESSION);

  useEffect(() => {
    SecureStore.getItemAsync("token").then(resp => {
      const { id } = jwt_deocde(resp);
      setUserInfo({ id });
    });
  }, []);

  useEffect(() => {
    if (userInfo.id !== "") {
      getSession({ variables: { userId: userInfo.id } });
    }
  }, [userInfo.id]);

  useEffect(() => {
    if (sessionData !== undefined) {
      const { getSession } = sessionData;
      const { sessionInfo, words } = getSession;
      if (sessionInfo !== null && words.length > 0) {
        setStatusOfSession(true);
      }
      setStatusOfLoading(false);
    }
  }, [sessionData]);

  const handleClickButton = () => {
    navigation.navigate("Learning");
    setRefreshLearning(!refreshLearning);
  };

  return (
    <>
      {isLoading ? (
        <Loading isLoading={isLoading} />
      ) : (
        <Header navigation={navigation}>
          <View style={styles.container}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleClickButton()}
            >
              <Text style={styles.textButton}>
                {isSession ? "Kontynuuj Sesje" : "Rozpocznij sesje"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("Ranking")}
            >
              <Text style={styles.textButton}>Ranking</Text>
            </TouchableOpacity>
          </View>
        </Header>
      )}
    </>
  );
};

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "space-around",
    alignItems: "center"
  },
  button: {
    height: "20%",
    width: "95%",
    backgroundColor: "$primaryColor",
    justifyContent: "center",
    alignItems: "center"
  },
  textButton: {
    color: "white",
    fontSize: "1.5rem",
    fontWeight: "bold"
  }
});

export default Home;
