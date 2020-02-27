import React, { useState, useContext, useEffect } from "react";
import { Text, TextInput, TouchableOpacity } from "react-native";
import AuthContext from "../features/context/AuthContext";
import AuthPage from "../features/components/Layout/AuthPage";
import { authentication as authStyles } from "../features/styles/default";

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn, loginErrors } = useContext(AuthContext);
  const { emailError, passwordError, connectionError } = loginErrors;

  const hadndleSubmit = () => {
    signIn({ email, password });
  };
  return (
    <AuthPage>
      <Text style={authStyles.textTitle}>Logowanie</Text>
      <TextInput
        style={authStyles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      {emailError ? <Text style={authStyles.error}>{emailError}</Text> : null}
      <TextInput
        style={authStyles.input}
        placeholder="Hasło"
        value={password}
        secureTextEntry
        onChangeText={text => setPassword(text)}
      />
      {passwordError ? (
        <Text style={authStyles.error}>{passwordError}</Text>
      ) : connectionError ? (
        <Text style={authStyles.error}>{connectionError}</Text>
      ) : null}
      <TouchableOpacity
        style={authStyles.button}
        onPress={() => hadndleSubmit()}
      >
        <Text style={authStyles.textButton}>Zaloguj się</Text>
      </TouchableOpacity>
      <Text
        style={[authStyles.textButton, authStyles.marginTop]}
        onPress={() => navigation.navigate("SignUp")}
      >
        Nie mam jeszcze konta
      </Text>
    </AuthPage>
  );
};

export default SignIn;
