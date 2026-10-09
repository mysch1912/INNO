import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";

import { ref, onValue } from "firebase/database";
import { rtdb } from "../database/firebase";
import { GlobalStyle } from "../styles/GlobalStyle";

export default function SearchScreen({ navigation }) {
  const [search, setSearch] = useState("");
  const [items, setItems] = useState(null);
  const [error, setError] = useState("");

  // Hent ting fra Firebase
useEffect(() => {
  const itemsRef = ref(rtdb, "Items");

  const unsubscribe = onValue(
    itemsRef,
    (snapshot) => {
      const data = snapshot.val();

      const itemList = data
        ? Object.entries(data).map(([id, item]) => ({
            ...item,
            id,
          }))
        : [];

      setItems(itemList);
      setError("");
    },
    (firebaseError) => {
      console.log(firebaseError);
      setError("Kunne ikke hente ting.");
      setItems([]);
    }
  );

  return () => unsubscribe();
}, []);

  // Vis loading mens Firebase henter data
  // Vis loading og fejlbeskeder
if (items === null && !error) {
  return (
    <View style={GlobalStyle.centerContainer}>
      <ActivityIndicator size="large" color="#245C49" />
      <Text style={GlobalStyle.text}>Henter ting...</Text>
    </View>
  );
}

if (error) {
  return (
    <View style={GlobalStyle.centerContainer}>
      <Text style={GlobalStyle.text}>{error}</Text>
    </View>
  );
}

  // Filtrer ting efter brugerens søgning
  const filteredItems = items.filter((item) =>
    item.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={GlobalStyle.container}>
      <Text style={GlobalStyle.title}>Søg efter ting</Text>

      <TextInput
        style={GlobalStyle.input}
        placeholder="Fx boremaskine..."
        value={search}
        onChangeText={setSearch}
      />

      {filteredItems.length === 0 ? (
        <Text>Ingen ting fundet.</Text>
      ) : (
        <FlatList
          data={filteredItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Pressable
              style={GlobalStyle.card}
              onPress={() => navigation.navigate("Ting", { item })}
            >
              <Text style={GlobalStyle.cardTitle}>{item.name}</Text>
              <Text>{item.location}</Text>
            </Pressable>
          )}
        />
      )}
    </View>
  );
}