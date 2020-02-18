import React from "react";
import EStyleSheet from "react-native-extended-stylesheet";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import Header from "../features/components/Layout/Header";
import DownBar from "../features/components/DownBar/DownBar";

const Learning = () => {
  const checking = true;
  return (
    <Header>
      <View style={style.container}>
        {checking ? (
          <>
            <Text style={style.wrong}>Błędna odpowiedź</Text>
            <Text style={[style.textPrimary, style.mediumMarginTop]}>
              Advice
            </Text>
            <Text style={style.textSecondary}>Rada</Text>
            <TouchableOpacity
              style={[style.mediumMarginTop, style.checkButton]}
            >
              <Text style={style.textButton}>Dalej</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={style.word}>Słowo</Text>
            <TextInput
              style={[style.smallMarginTop, style.inputText]}
              placeholder="wpisz słowo"
            />
            <TouchableOpacity
              style={[style.mediumMarginTop, style.checkButton]}
            >
              <Text style={style.textButton}>Sprawdź</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
      <DownBar />
    </Header>
  );
};

const style = EStyleSheet.create({
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
    fontSize: "2.1rem"
  },
  correct: {
    color: "green",
    fontSize: "2.1rem"
  },
  textPrimary: {
    fontSize: "1.8rem",
    fontWeight: "bold",
    color: "$subColor"
  },
  textSecondary: {
    fontSize: "1.4rem",
    color: "$subColor"
  }
});

export default Learning;
