import React from "react";
import { View, Text } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";

const DownBar = ({ score, procentCorrectness }) => {
  return (
    <View style={style.container}>
      <Text style={style.text}>Punkty: {score}</Text>
      <Text style={[style.text, style.smallMarginTop]}>
        Poprawność: {procentCorrectness}%
      </Text>
    </View>
  );
};

const style = EStyleSheet.create({
  container: {
    width: "100%",
    minHeight: "15%",
    backgroundColor: "$primaryColor",
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    color: "white",
    fontSize: "1.5rem"
  },
  smallMarginTop: {
    marginTop: "$smallMargin"
  }
});
export default DownBar;
