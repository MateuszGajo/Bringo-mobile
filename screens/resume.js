import React, { useState, useEffect, useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { useMutation, useLazyQuery } from "@apollo/react-hooks";
import * as SecureStore from "expo-secure-store";
import jwt_deocde from "jwt-decode";
import Header from "../features/components/Layout/Header";
import GET_SESSION from "../features/queries/sessionQuery";
import GET_SCORE_USER from "../features/queries/scoreUserQuery";
import REMOVE_SESSION from "../features/mutations/documentMutation";
import {
  UPDATE_SCORE_USER,
  UPDATE_LEVEL_USER
} from "../features/mutations/userMutation";
import { levelScoreTable } from "../helper";
import Loading from "./loading";
import AuthContext from "../features/context/AuthContext";

const Resume = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState({ id: "", difficulty: "" });
  const [score, setScore] = useState(0);
  const [isLoading, setStatusOfLoading] = useState(true);

  const { refreshRanking, setRefreshRanking, refreshResume } = useContext(
    AuthContext
  );

  const [procentCorrectness, setProcentCorrectness] = useState(0);
  const [
    getSession,
    { loading: loadingSession, data: sessionData, refetch: refetchSession }
  ] = useLazyQuery(GET_SESSION, {
    fetchPolicy: "network-only"
  });

  const [
    getScoreUser,
    { loading: loadingScore, data: scoreData }
  ] = useLazyQuery(GET_SCORE_USER);

  const [removeSession, { isDeleted }] = useMutation(REMOVE_SESSION);
  const [updateScoreUser, { isUpdatedScoreUser }] = useMutation(
    UPDATE_SCORE_USER
  );
  const [updateLevelUser, { isUpdatedLevelUser }] = useMutation(
    UPDATE_LEVEL_USER
  );

  useEffect(() => {
    SecureStore.getItemAsync("token").then(resp => {
      const { id, difficulty } = jwt_deocde(resp);
      setUserInfo({ id, difficulty });
    });
  }, []);

  useEffect(() => {
    if (userInfo.id !== "") {
      getSession({ variables: { userId: userInfo.id } });
      getScoreUser({ variables: { userId: userInfo.id } });
    }
  }, [userInfo.id, refreshResume]);

  useEffect(() => {
    if (sessionData !== undefined && scoreData !== undefined) {
      const { getSession } = sessionData;
      if (getSession.words.length === 0 && getSession.sessionInfo !== null) {
        const {
          sessionInfo: { amounts }
        } = getSession;
        setScore(amounts.score);
        setProcentCorrectness(amounts.procentCorrectness);

        const { level } = levelScoreTable(
          scoreData.getScoreUser.score,
          score,
          userInfo.difficulty
        );
        if (level !== null) {
          updateLevelUser({ variables: { userId, level } });
        }
        updateScoreUser({ variables: { userId: userInfo.id, score } });
        removeSession({ variables: { userId: userInfo.id } });
        setRefreshRanking(!refreshRanking);
        return setStatusOfLoading(false);
      }
    }
  }, [sessionData, scoreData]);

  return (
    <>
      {isLoading ? (
        <Loading isLoading={isLoading} />
      ) : (
        <Header navigation={navigation}>
          <View style={styles.container}>
            <Text style={styles.primaryText}>Wykonałeś sesje</Text>
            <Text style={styles.secondaryText}>Statystyki</Text>
            <Text style={[styles.text, styles.smallMarginTop]}>
              Uzyskane punkty: {score}pkt
            </Text>
            <Text style={[styles.text, styles.smallMarginTop]}>
              Poprawność sesji: {procentCorrectness}%
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("Home")}
            >
              <Text style={styles.textButton}>Strona główna</Text>
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
    marginTop: "$mediumMargin",
    alignItems: "center",
    justifyContent: "center"
  },
  smallMarginTop: {
    marginTop: "$smallMargin"
  },
  primaryText: {
    fontSize: "2.5rem",
    color: "$subColor"
  },
  secondaryText: {
    fontSize: "2rem",
    color: "$subColor",
    marginTop: "$mediumMargin",
    marginBottom: "$smallMargin"
  },
  text: {
    fontSize: "1.5rem",
    color: "grey"
  },
  button: {
    width: "80%",
    height: "10%",
    marginTop: "$mediumMargin",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D89100"
  },
  textButton: {
    fontSize: "1.2rem",
    color: "#D89100"
  }
});

export default Resume;
