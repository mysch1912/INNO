import { useState } from "react";
import { Alert, Text, TextInput, View } from "react-native";

import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "../database/firebase";
import ButtonComponent from "../components/ButtonComponent";
import { GlobalStyle } from "../styles/GlobalStyle";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Udfyld e-mail og adgangskode.");
      return;
    }

    try {
      await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );
    } catch (error) {
      Alert.alert(
        "Kunne ikke logge ind",
        "Kontrollér e-mail og adgangskode."
      );
    }
  };

  return (
    <View style={GlobalStyle.centerContainer}>
      <Text style={GlobalStyle.title}>LåneApp</Text>

      <Text style={GlobalStyle.subtitle}>
        Log ind for at låne og udlåne ting
      </Text>

      <TextInput
        style={GlobalStyle.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={GlobalStyle.input}
        placeholder="Adgangskode"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <ButtonComponent
        title="Log ind"
        onPress={loginUser}
      />

      <ButtonComponent
        title="Opret bruger"
        onPress={() => navigation.navigate("Opret bruger")}
        secondary
      />
    </View>
  );
}