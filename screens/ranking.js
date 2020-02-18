import React from "react";
import { View, Text, ScrollView } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { FontAwesome } from "@expo/vector-icons";
import Header from "../features/components/Layout/Header";

const Ranking = () => {
  const tab = [
    { rank: 1, firstname: "sdafsdfdsfsdfsdf", lastName: "das", score: 12 },
    { rank: 2, firstname: "sddasa", lastName: "bvc", score: 9 },
    { rank: 3, firstname: "bcv", lastName: "das", score: 8 },
    { rank: 4, firstname: "bcv", lastName: "das", score: 7 },
    { rank: 5, firstname: "bcdfg", lastName: "ddasdas", score: 6 },
    { rank: 6, firstname: "wrwe", lastName: "da31s", score: 5 },
    { rank: 7, firstname: "wrwe", lastName: "da31s", score: 4 },
    { rank: 8, firstname: "wrwe", lastName: "da31s", score: 3 },
    { rank: 9, firstname: "wrwe", lastName: "da31s", score: 2 }
  ];
  return (
    <Header>
      <View style={[styles.table, styles.marginTop]}>
        <ScrollView>
          {tab.map(user => {
            return (
              <View style={styles.row} key={user.rank}>
                <View style={[styles.cell, styles.wrapPhoto]}>
                  <Text style={styles.textPrimary}>{user.rank}.</Text>
                  <FontAwesome style={styles.photo} name="user-circle-o" />
                </View>
                <View style={styles.cell}>
                  <Text>
                    {(user.firstname + " " + user.lastName).length > 14
                      ? (user.firstname + " " + user.lastName).slice(0, 14) +
                        "..."
                      : user.firstname + " " + user.lastName}
                  </Text>
                </View>
                <View style={styles.cell}>
                  <Text>{user.score} pkt</Text>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </Header>
  );
};

const styles = EStyleSheet.create({
  table: {
    flex: 1,
    margin: 5
  },
  marginTop: {
    marginTop: "$smallMargin"
  },
  row: {
    flexDirection: "row",
    alignSelf: "stretch",
    marginTop: "$smallMargin"
  },
  cell: {
    flex: 1,
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center"
  },
  textPrimary: {
    fontSize: "1rem"
  },
  wrapPhoto: {
    flexDirection: "row",
    alignItems: "center"
  },
  photo: {
    marginLeft: "$smallMargin",
    fontSize: "2.5rem",
    color: "$primaryColor"
  }
});

export default Ranking;
