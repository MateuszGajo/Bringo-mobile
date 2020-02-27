import React, { useState, useEffect, useContext } from "react";
import { useMutation, useLazyQuery } from "@apollo/react-hooks";
import EStyleSheet from "react-native-extended-stylesheet";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import * as SecureStore from "expo-secure-store";
import jwt_deocde from "jwt-decode";
import {
  UPDATE_SESSION,
  UPDATE_SESSION_STATISTICS
} from "../features/mutations/updateSessionMutation";
import GET_WORD from "../features/queries/wordQuery";
import GET_SESSION from "../features/queries/sessionQuery";
import Header from "../features/components/Layout/Header";
import DownBar from "../features/components/DownBar/DownBar";
import { scoreTable } from "../helper";
import Loading from "./loading";
import AuthContext from "../features/context/AuthContext";

const Learning = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState({ id: "", difficulty: "" });
  const [selectedWord, setChoosedWord] = useState("");
  const [typeWord, setTypedWord] = useState("");
  const [wordValidation, setWordValidation] = useState({ pl: "", en: "" });
  const [scoreLevel, setScoreLevel] = useState({ correct: 0, inCorrect: 0 });
  const [score, setScore] = useState(0);
  const [correctWords, setNumberOfCorrectWords] = useState(0);
  const [discorrectWords, setNumberOfDiscorrectWords] = useState(0);
  const [totalNumberOfWords, setTotalNumberOfWords] = useState(0);
  const [procentCorrectness, setProcentCorrectness] = useState(0);
  const [isCorrectWord, setStatusOfWord] = useState(false);
  const [isChecking, setStatusOfChecking] = useState(false);
  const [isLoading, setStatusOfLoading] = useState(true);
  const [isSession, setStatusOfSession] = useState(true);

  const { refreshLearning, refreshResume, setRefreshResume } = useContext(
    AuthContext
  );

  const [
    getSession,
    { loading: loadingSession, data: sessionData }
  ] = useLazyQuery(GET_SESSION, {
    fetchPolicy: "network-only"
  });

  const [getWords, { loading: LoadingWord, data: wordsData }] = useLazyQuery(
    GET_WORD,
    {
      fetchPolicy: "network-only"
    }
  );
  const [updateSessionStatistics, { isUpdatedSessionStatistics }] = useMutation(
    UPDATE_SESSION_STATISTICS
  );
  const [updateSession, { data }] = useMutation(UPDATE_SESSION);

  const handleWord = () => {
    setStatusOfChecking(true);
    setWordValidation(selectedWord);

    const wordToEqual = [
      typeWord.toLowerCase().trim(),
      selectedWord.en.toLowerCase().trim()
    ];
    let countProcentCorrectness;
    let newScore;

    if (wordToEqual[0] === wordToEqual[1]) {
      countProcentCorrectness = Math.ceil(
        ((correctWords + 1) * 100) / (totalNumberOfWords + 1)
      );
      newScore = score + scoreLevel.correct;

      setNumberOfCorrectWords(correctWords + 1);
      setStatusOfWord(true);
      setScore(newScore);
      updateSession({
        variables: {
          word: selectedWord.en,
          userId: userInfo.id,
          correctWords: correctWords + 1,
          discorrectWords,
          totalNumberOfWords: totalNumberOfWords + 1,
          procentCorrectness: countProcentCorrectness,
          score: newScore
        }
      });
    } else {
      countProcentCorrectness = Math.ceil(
        (correctWords * 100) / (totalNumberOfWords + 1)
      );

      if (score - scoreLevel.inCorrect < 0) newScore = 0;
      else newScore = score - scoreLevel.inCorrect;

      setNumberOfDiscorrectWords(discorrectWords + 1);
      setStatusOfWord(false);
      setScore(newScore);

      updateSessionStatistics({
        variables: {
          userId: userInfo.id,
          correctWords,
          discorrectWords: discorrectWords + 1,
          totalNumberOfWords: totalNumberOfWords + 1,
          procentCorrectness: countProcentCorrectness,
          score: newScore
        }
      });
    }
    setProcentCorrectness(countProcentCorrectness);
    setTotalNumberOfWords(totalNumberOfWords + 1);
  };

  const handleCheckButton = () => {
    setStatusOfChecking(false);
    if (!isSession) {
      setRefreshResume(!refreshResume);
      navigation.navigate("Resume");
    }
  };

  useEffect(() => {
    SecureStore.getItemAsync("token").then(resp => {
      const { id, difficulty } = jwt_deocde(resp);
      setUserInfo({ id, difficulty });
    });
  }, []);

  useEffect(() => {
    if (userInfo.id !== "") {
      const scoreLevel = scoreTable(userInfo.difficulty);
      setScoreLevel({ correct: scoreLevel, inCorrect: scoreLevel / 2 });
      getSession({ variables: { userId: userInfo.id } });
    }
  }, [userInfo.id, refreshLearning]);

  useEffect(() => {
    if (sessionData !== undefined) {
      const { getSession } = sessionData;
      if (getSession.sessionInfo !== null && getSession.words.length === 0) {
        navigation.navigate("Resume");
      }
      if (getSession.words.length > 0) {
        const {
          sessionInfo: { amounts }
        } = getSession;
        setNumberOfCorrectWords(amounts.correctWords);
        setNumberOfDiscorrectWords(amounts.discorrectWords);
        setScore(amounts.score);
        setTotalNumberOfWords(amounts.totalNumberOfWords);
        setProcentCorrectness(amounts.procentCorrectness);
        setChoosedWord(getSession.words[0]);
        return setStatusOfLoading(false);
      } else if (navigation.state.routeName == "Learning") {
        getWords({
          variables: {
            level: userInfo.difficulty,
            number: 20,
            userId: userInfo.id
          }
        });
      }
    }
  }, [sessionData]);

  useEffect(() => {
    if (wordsData !== undefined) {
      const { getWords } = wordsData;
      setTotalNumberOfWords(0);
      setNumberOfCorrectWords(0);
      setNumberOfDiscorrectWords(0);
      setScore(0);
      setProcentCorrectness(0);
      setStatusOfChecking(false);
      setStatusOfSession(true);
      setChoosedWord(getWords.words[0]);
      return setStatusOfLoading(false);
    }
  }, [wordsData]);

  useEffect(() => {
    if (data) {
      const newWordsArray = data.updateSession.words;
      if (newWordsArray.length === 0) {
        setStatusOfSession(false);
      } else {
        setChoosedWord(newWordsArray[0]);
      }
    }
  }, [data]);

  return (
    <>
      {isLoading ? (
        <Loading isLoading={isLoading} />
      ) : (
        <Header navigation={navigation}>
          <TouchableWithoutFeedback
            onPress={() => {
              Keyboard.dismiss();
            }}
          >
            <View style={styles.container}>
              {isChecking ? (
                <>
                  <Text
                    style={[
                      styles.textCenter,
                      isCorrectWord ? styles.correct : styles.wrong
                    ]}
                  >
                    {isCorrectWord ? "Poprawna odpowiedź" : "Błędna odpowiedź"}
                  </Text>
                  <Text
                    style={[
                      styles.textPrimary,
                      styles.mediumMarginTop,
                      styles.textCenter
                    ]}
                  >
                    {wordValidation.pl}
                  </Text>
                  <Text style={[styles.textSecondary, styles.textCenter]}>
                    {wordValidation.en}
                  </Text>
                  <TouchableOpacity
                    style={[styles.mediumMarginTop, styles.checkButton]}
                    onPress={() => handleCheckButton()}
                  >
                    <Text style={styles.textButton}>Dalej</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <Text style={[styles.word, styles.textCenter]}>
                    {selectedWord.pl}
                  </Text>
                  <TextInput
                    style={[styles.smallMarginTop, styles.inputText]}
                    placeholder="wpisz słowo"
                    onChangeText={text => setTypedWord(text)}
                  />
                  <TouchableOpacity
                    style={[styles.mediumMarginTop, styles.checkButton]}
                    onPress={() => handleWord()}
                  >
                    <Text style={styles.textButton}>Sprawdź</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </TouchableWithoutFeedback>
          <DownBar score={score} procentCorrectness={procentCorrectness} />
        </Header>
      )}
    </>
  );
};

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  inputText: {
    width: "80%",
    height: "10%",
    backgroundColor: "white",
    textAlign: "center",
    borderBottomColor: "grey",
    borderBottomWidth: 0.7,
    fontSize: "1rem"
  },
  word: {
    fontSize: "2rem",
    color: "$primaryColor"
  },
  checkButton: {
    width: "80%",
    height: "10%",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D89100"
  },
  textButton: {
    fontSize: "1.2rem",
    color: "#D89100"
  },
  smallMarginTop: {
    marginTop: "$smallMargin"
  },
  mediumMarginTop: {
    marginTop: "$mediumMargin"
  },
  wrong: {
    color: "red",
    fontSize: "2rem"
  },
  correct: {
    color: "green",
    fontSize: "2rem"
  },
  textPrimary: {
    fontSize: "1.8rem",
    fontWeight: "bold",
    color: "$subColor"
  },
  textSecondary: {
    fontSize: "1.4rem",
    color: "$subColor"
  },
  textCenter: {
    textAlign: "center"
  }
});

export default Learning;
