import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import AuthPage from "../features/components/Layout/AuthPage";
import AuthContext from "../features/context/AuthContext";
import { authentication as authStyles } from "../features/styles/default";

const SignIn = ({ navigation }) => {
  const [numberOfPage, setNumberOfPage] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumer] = useState("");

  const { signUp, registerErrors } = useContext(AuthContext);
  const {
    authError,
    confirmPasswordError,
    connectionError,
    emailError,
    firstNameError,
    lastNameError,
    isFieldsError,
    passwordError,
    phoneNumberError
  } = registerErrors;
  console.log(registerErrors);

  const hadndleSubmit = () => {
    signUp({
      email,
      password,
      confirmPassword,
      firstName,
      lastName,
      phoneNumber
    });
  };
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
          {emailError ? (
            <Text style={authStyles.error}>{emailError}</Text>
          ) : null}

          <TextInput
            style={authStyles.input}
            placeholder="Hasło"
            value={password}
            secureTextEntry
            onChangeText={text => setPassword(text)}
          />
          {passwordError ? (
            <Text style={authStyles.error}>{passwordError}</Text>
          ) : null}
          <TextInput
            style={authStyles.input}
            placeholder="Powtórz hasło"
            value={confirmPassword}
            secureTextEntry
            onChangeText={text => setConfirmPassword(text)}
          />
          {confirmPasswordError ? (
            <Text style={authStyles.error}>{confirmPasswordError}</Text>
          ) : null}
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
          {isFieldsError ? (
            <Text style={authStyles.error}>Popraw zaznaczone pola</Text>
          ) : null}
          <TextInput
            style={authStyles.input}
            placeholder="Imię"
            value={firstName}
            onChangeText={text => setFirstName(text)}
          />
          {firstNameError ? (
            <Text style={authStyles.error}>{firstNameError}</Text>
          ) : null}
          <TextInput
            style={authStyles.input}
            placeholder="Nazwisko"
            value={lastName}
            onChangeText={text => setLastName(text)}
          />
          {lastNameError ? (
            <Text style={authStyles.error}>{lastNameError}</Text>
          ) : null}
          <TextInput
            style={authStyles.input}
            placeholder="Numer Telefonu"
            value={phoneNumber}
            onChangeText={text => setPhoneNumer(text)}
          />
          {phoneNumberError ? (
            <Text style={authStyles.error}>{phoneNumberError}</Text>
          ) : connectionError ? (
            <Text style={authStyles.error}>{connectionError}</Text>
          ) : null}
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
            onPress={() => hadndleSubmit()}
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
    marginTop: "$smallMargin"
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
