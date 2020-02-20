import React from "react";
import { View, Text } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { FontAwesome5 } from "@expo/vector-icons";

const HomeNav = ({ children, navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        <Text
          style={[styles.centerItem, styles.brand]}
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          Bringo
        </Text>
        <FontAwesome5
          style={styles.centerItem}
          name="bars"
          size={40}
          color="#333"
          onPress={() => {
            navigation.openDrawer();
          }}
        />
      </View>
      {children}
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    height: "100%"
  },
  navBar: {
    backgroundColor: "white",
    height: "15%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    padding: 5,
    paddingTop: 20
  },
  centerItem: {
    justifyContent: "center",
    alignItems: "center"
  },
  brand: {
    fontSize: "3rem",
    color: "$primaryColor"
  }
});

export default HomeNav;
