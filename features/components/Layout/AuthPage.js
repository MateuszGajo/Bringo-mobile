import React from "react";
import { View, Text, TouchableWithoutFeedback, Keyboard } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";

const AuthPage = ({ children }) => {

  return (
    <View style={styles.wrap}>
      <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
        <View style={[styles.container, styles.centerItems, styles.containerAuth]}>
          {children}
        </View>
      </TouchableWithoutFeedback>
    </View >
  );
};
const styles = EStyleSheet.create({
  wrap: {
    flex: 1,
  },
  centerItems: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center"
  },
  container: {
    flex: 1,
    padding: 10,

  },
  containerAuth: {
    justifyContent: 'center',
    backgroundColor: '$primaryColor',
    height: 200
  },

  text: {
    fontSize: '1rem',
    textAlign: "center"
  },
  authInput: {
    backgroundColor: '#fff',
    width: '80 %',
    height: '5%',
    textAlign: 'center'
  },
  textPrimary: {
    fontSize: '2rem'
  },
  primaryColor: {
    color: '$primaryColor'
  }
});

export default AuthPage;
