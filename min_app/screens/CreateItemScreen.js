
import { useEffect, useState } from "react";
import { Text, TextInput, View, Alert } from "react-native";

import { ref, push, onValue } from "firebase/database";
import { auth, rtdb } from "../database/firebase";

import ButtonComponent from "../components/ButtonComponent";
import { GlobalStyle } from "../styles/GlobalStyle";

export default function CreateItemScreen({ navigation }) {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [userName, setUserName] = useState(null);
  const [saving, setSaving] = useState(false);

  const userId = auth.currentUser?.uid;

  // Hent den indloggede brugers navn fra Firebase
  useEffect(() => {
    if (!userId) return;

    const userRef = ref(rtdb, `Users/${userId}`);

    const unsubscribe = onValue(
      userRef,
      (snapshot) => {
        const userData = snapshot.val();
        setUserName(userData?.name || null);
      },
      (error) => {
        console.log("Fejl ved hentning af bruger:", error);
        setUserName(null);
        Alert.alert("Fejl", "Kunne ikke hente din brugerprofil.");
      }
    );

    return () => unsubscribe();
  }, [userId]);

  const createItem = async () => {
    if (!name.trim() || !location.trim()) {
      Alert.alert("Manglende oplysninger", "Udfyld både ting og område.");
      return;
    }
    if (!userId || !userName) {
      Alert.alert(
        "Fejl",
        "Kunne ikke hente din brugerprofil. Prøv igen."
      );
      return;
    }

    if (saving) return;

    setSaving(true);

    try {
      await push(ref(rtdb, "Items"), {
        name: name.trim(),
        location: location.trim(),
        ownerId: userId,
        ownerName: userName,
      });

      setName("");
      setLocation("");

      Alert.alert("Tingen er oprettet!");

      navigation.navigate("Profil");
    } catch (error) {
      Alert.alert("Fejl", error.message);
    } finally {
      setSaving(false);
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
        title={saving ? "Opretter..." : "Opret ting"}
        onPress={createItem}
      />
    </View>
  );
}
