import React from "react";
import { View, Text } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import EStyleSheet from "react-native-extended-stylesheet";

const Loading = ({ isLoading }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.brand}>Bringo</Text>
      <Spinner
        visible={isLoading}
        textContent={"Ładowanie"}
        textStyle={styles.spinnerTextStyle}
      />
    </View>
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

export default Loading;
