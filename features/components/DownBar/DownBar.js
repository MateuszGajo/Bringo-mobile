import React from "react";
import { View, Text } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";

const DownBar = () => {
  return (
    <View style={style.container}>
      <Text style={style.text}>Punkty: 0</Text>
      <Text style={[style.text, style.smallMarginTop]}>Poprawność: 50%</Text>
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
