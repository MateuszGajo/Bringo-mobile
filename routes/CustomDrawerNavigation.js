import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Entypo, FontAwesome, AntDesign } from "@expo/vector-icons";
import { NavigationActions } from "react-navigation";
import EStyleSheet from "react-native-extended-stylesheet";
import AuthContext from "../features/context/AuthContext";

const CustomDrawerNavigation = props => {
  const { setToken, logOut } = useContext(AuthContext);

  const navigateToScreen = route => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    props.navigation.dispatch(navigateAction);
  };

  return (
    <View style={styles.container}>
      <View style={styles.brandWrapper}>
        <Text style={styles.textPrimary}>Bringo</Text>
      </View>
      <View style={styles.navWrapper}>
        <View style={styles.navItems}>
          <TouchableOpacity
            style={styles.navItem}
            onPress={navigateToScreen("Home")}
          >
            <Entypo style={styles.navIcon} name="home" />
            <Text style={styles.textNavItem}>Główna</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navItem}
            onPress={navigateToScreen("Ranking")}
          >
            <FontAwesome style={styles.navIcon} name="users" />
            <Text style={styles.textNavItem}>Ranking</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => logOut()}>
            <AntDesign style={styles.navIcon} name="logout" />
            <Text style={styles.textNavItem}>Wyloguj</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.user}>
          <Text style={styles.userText}>Mateusz Gajo</Text>
        </View>
      </View>
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    marginTop: "$mediumMargin"
  },
  brandWrapper: {
    paddingBottom: "$smallMargin",
    borderBottomColor: "$subColor",
    borderBottomWidth: 0.5
  },
  textPrimary: {
    fontSize: "3rem",
    color: "$primaryColor",
    textAlign: "center"
  },
  navWrapper: {
    flexGrow: 1
  },
  navItems: {
    flexGrow: 1
  },
  navItem: {
    flexDirection: "row",
    width: "100%",
    height: "10%",
    marginTop: "$mediumMargin",
    paddingLeft: 15
  },
  textNavItem: {
    fontSize: "1rem",
    marginLeft: "$mediumMargin"
  },
  navIcon: {
    fontSize: "1.2rem",
    color: "$subColor"
  },
  user: {
    marginBottom: "$smallMargin",
    alignItems: "center"
  },
  userText: {
    fontSize: "1.2rem",
    color: "$subColor"
  }
});

export default CustomDrawerNavigation;
