import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity } from "react-native";
import AuthPage from '../Layout/AuthPage';
import { authentication as authStyles } from '../../styles/default';


const SignIn = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const hadndleSubmit = () => {

    }
    return (
        <AuthPage>
            <Text style={authStyles.textTitle}>Logowanie</Text>
            <TextInput style={authStyles.input} placeholder="E-mail" onChangeText={(text) => setEmail(text)} />
            <TextInput style={authStyles.input} placeholder="Hasło" onChangeText={(text) => setPassword(text)} />
            <TouchableOpacity style={authStyles.button} onPress={() => hadndleSubmit()}>
                <Text style={authStyles.textButton}>Zaloguj się</Text>
            </TouchableOpacity>
            <Text style={[authStyles.textButton, authStyles.marginTop]} onPress={() => navigation.navigate('SignUp')}> Nie mam jeszcze konta</Text>
        </AuthPage >
    )
}


export default SignIn;