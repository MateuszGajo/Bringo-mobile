import React from "react";
import { StyleSheet } from "react-native";
import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";
import "./features/styles/global";
export default function App() {
  return <SignIn />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center"
  }
});
