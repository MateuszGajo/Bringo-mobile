import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import AuthPage from "../Layout/AuthPage";
import { authentication as authStyles } from "../../styles/default";

const SignIn = ({ navigation }) => {
  const [numberOfPage, setNumberOfPage] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumer] = useState("");

  const hadndleSubmit = () => {};
  return (
    <AuthPage>
      <Text style={authStyles.textTitle}>Rejstracja</Text>
      {numberOfPage == 1 ? (
        <>
          <TextInput
            style={authStyles.input}
            placeholder="E-mail"
            value={email}
            onChangeText={text => setEmail(text)}
          />
          <TextInput
            style={authStyles.input}
            placeholder="Hasło"
            value={password}
            secureTextEntry
            onChangeText={text => setPassword(text)}
          />
          <TextInput
            style={authStyles.input}
            placeholder="Powtórz hasło"
            value={confirmPassword}
            secureTextEntry
            onChangeText={text => setConfirmPassword(text)}
          />
          <View style={styles.container}>
            <View style={[styles.paginationButton, styles.disabledButton]}>
              <Text style={[authStyles.textButton, styles.disabledText]}>
                Poprzednia
              </Text>
            </View>
            <TouchableOpacity
              style={styles.paginationButton}
              onPress={() => setNumberOfPage(2)}
            >
              <Text style={authStyles.textButton}>Następna</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <TextInput
            style={authStyles.input}
            placeholder="Imię"
            value={firstName}
            onChangeText={text => setFirstName(text)}
          />
          <TextInput
            style={authStyles.input}
            placeholder="Nazwisko"
            value={lastName}
            onChangeText={text => setLastName(text)}
          />
          <TextInput
            style={authStyles.input}
            placeholder="Numer Telefonu"
            value={phoneNumber}
            onChangeText={text => setPhoneNumer(text)}
          />
          <View style={styles.container}>
            <TouchableOpacity
              style={styles.paginationButton}
              onPress={() => setNumberOfPage(1)}
            >
              <Text style={authStyles.textButton}>Poprzednia</Text>
            </TouchableOpacity>
            <View
              style={[styles.paginationButton, styles.disabledButton]}
              onPress={() => setNumberOfPage(2)}
            >
              <Text style={[authStyles.textButton, styles.disabledText]}>
                Następna
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={authStyles.button}
            onPress={() => setNumberOfPage(2)}
          >
            <Text style={authStyles.textButton}>Zarejstuj się</Text>
          </TouchableOpacity>
        </>
      )}

      <Text
        style={[authStyles.textButton, authStyles.marginTop]}
        onPress={() => navigation.navigate("SignIn")}
      >
        {" "}
        Mam już konto
      </Text>
    </AuthPage>
  );
};

const styles = EStyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "stretch",
    height: "10%",
    width: "100%",
    marginTop: 20
  },
  paginationButton: {
    width: "40%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#D89100",
    borderRadius: 5
  },
  disabledButton: {
    backgroundColor: "#787676"
  },
  disabledText: {
    color: "#585656"
  }
});

export default SignIn;
