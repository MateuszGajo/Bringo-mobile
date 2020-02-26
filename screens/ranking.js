import React, { useState, useEffect, useContext } from "react";
import { View, Text, ScrollView } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { FontAwesome } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import { useQuery } from "@apollo/react-hooks";
import jwt_deocde from "jwt-decode";
import Loading from "../screens/loading";
import Header from "../features/components/Layout/Header";
import GET_RANKINGS from "../features/queries/getRankingQuery";
import AuthContext from "../features/context/AuthContext";

const Ranking = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState({ id: "" });
  const [usersRanking, setUserRankings] = useState([]);
  const [isLoading, setStatusOfLoading] = useState(true);

  const { refreshRanking } = useContext(AuthContext);

  const {
    loading: loadingRankings,
    errors: dataErros,
    data: rankingsData,
    refetch: refechRanking
  } = useQuery(GET_RANKINGS);

  useEffect(() => {
    SecureStore.getItemAsync("token").then(resp => {
      const { id } = jwt_deocde(resp);
      setUserInfo({ id });
    });
  }, []);

  useEffect(() => {
    refechRanking();
  }, [refreshRanking]);

  useEffect(() => {
    if (rankingsData !== undefined) {
      const { getRankings } = rankingsData;
      setUserRankings(getRankings);
      setStatusOfLoading(false);
    }
  }, [rankingsData]);

  return (
    <>
      {isLoading ? (
        <Loading isLoading={isLoading} />
      ) : (
        <Header navigation={navigation}>
          <View style={[styles.table, styles.marginTop]}>
            <ScrollView>
              {usersRanking.map((user, index) => {
                return (
                  <View
                    style={[
                      styles.row,
                      userInfo.id === user.id ? styles.orangeBackground : {}
                    ]}
                    key={index}
                  >
                    <View style={[styles.cell, styles.wrapPhoto]}>
                      <Text style={styles.textPrimary}>{index + 1}.</Text>
                      <FontAwesome style={styles.photo} name="user-circle-o" />
                    </View>
                    <View style={styles.cell}>
                      <Text>
                        {(user.firstName + " " + user.lastName).length > 14
                          ? (user.firstName + " " + user.lastName).slice(
                              0,
                              14
                            ) + "..."
                          : user.firstName + " " + user.lastName}
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
      )}
    </>
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
    marginTop: "$smallMargin",
    paddingTop: 10,
    paddingBottom: 10
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
  },
  orangeBackground: {
    backgroundColor: "orange"
  }
});

export default Ranking;
