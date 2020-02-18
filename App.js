import React from "react";
import EStyleSheet from "react-native-extended-stylesheet";
import "react-native-gesture-handler";
import SignIn from "./screeens/SignIn";
import SignUp from "./screeens/SignUp";
import "./features/styles/global";

export default function App() {
  return <SignIn />;
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center"
  }
});
