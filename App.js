import React from "react";
import { StyleSheet } from "react-native";
import Home from "./screens/home";
import Learning from "./screens/learning";
import Ranking from "./screens/ranking";
import "./features/styles/global";
export default function App() {
  return <Home />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center"
  }
});
