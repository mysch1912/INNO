import { useState } from "react";
import { Alert, Text, TextInput, View } from "react-native";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";

import { auth, rtdb } from "../database/firebase";
import ButtonComponent from "../components/ButtonComponent";
import { GlobalStyle } from "../styles/GlobalStyle";

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      Alert.alert("Udfyld alle felter.");
      return;
    }

    try {
      // Opret brugeren i Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      const user = userCredential.user;

      // Gem brugerens profil i Realtime Database
      await set(ref(rtdb, `Users/${user.uid}`), {
        name: name.trim(),
        email: email.trim(),
      });

      Alert.alert("Bruger oprettet!");
    } catch (error) {
      Alert.alert("Kunne ikke oprette bruger", error.message);
    }
  };

  return (
    <View style={GlobalStyle.container}>
      <Text style={GlobalStyle.title}>Opret bruger</Text>

      <TextInput
        style={GlobalStyle.input}
        placeholder="Navn"
        value={name}
        onChangeText={setName}
      />

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
        title="Opret bruger"
        onPress={registerUser}
      />

      <ButtonComponent
        title="Jeg har allerede en bruger"
        onPress={() => navigation.navigate("Login")}
        secondary
      />
    </View>
  );
}