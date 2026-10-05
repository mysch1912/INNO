import { useState } from "react";
import { Text, TextInput, View, Alert } from "react-native";

import { ref, push } from "firebase/database";
import { rtdb } from "../database/firebase";
import { currentUser } from "../data/currentUser";

import ButtonComponent from "../components/ButtonComponent";
import { GlobalStyle } from "../styles/GlobalStyle";

export default function CreateItemScreen({ navigation }) {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

  const createItem = async () => {
    if (!name.trim() || !location.trim()) {
      Alert.alert("Udfyld både ting og område.");
      return;
    }

    try {
      await push(ref(rtdb, "Items"), {
        name: name.trim(),
        location: location.trim(),
        ownerId: currentUser.id,
        ownerName: currentUser.name,
      });

      setName("");
      setLocation("");

      Alert.alert("Tingen er oprettet!");

      navigation.navigate("Profil");
    } catch (error) {
      Alert.alert("Fejl", error.message);
    }
  };

  return (
    <View style={GlobalStyle.container}>
      <Text style={GlobalStyle.title}>Opret en ting</Text>

      <TextInput
        style={GlobalStyle.input}
        placeholder="Hvad vil du låne ud?"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={GlobalStyle.input}
        placeholder="Område"
        value={location}
        onChangeText={setLocation}
      />

      <ButtonComponent
        title="Opret ting"
        onPress={createItem}
      />
    </View>
  );
}