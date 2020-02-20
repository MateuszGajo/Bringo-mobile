import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Header from "../features/components/Layout/Header";
import EStyleSheet from "react-native-extended-stylesheet";

const Home = ({ navigation }) => {
  return (
    <Header navigation={navigation}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("Learning");
          }}
        >
          <Text style={styles.textButton}>Rozpocznij sesje</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("Ranking");
          }}
        >
          <Text style={styles.textButton}>Ranking</Text>
        </TouchableOpacity>
      </View>
    </Header>
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
