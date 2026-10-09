
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { ref, onValue } from "firebase/database";

import { rtdb } from "../database/firebase";
import { GlobalStyle } from "../styles/GlobalStyle";

export default function HomeScreen({ navigation }) {
  const [items, setItems] = useState(null);
  const [error, setError] = useState("");

  // Hent opslag fra Firebase
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
        setError("Kunne ikke hente opslag.");
        setItems([]);
      }
    );

    return () => unsubscribe();
  }, []);

  // Vis de nyeste Firebase-opslag
  const latestItems = items
    ? [...items]
        .sort((a, b) => b.id.localeCompare(a.id))
        .slice(0, 3)
    : [];

  return (
    <ScrollView
      style={GlobalStyle.container}
      contentContainerStyle={GlobalStyle.homeV2Content}
      showsVerticalScrollIndicator={false}
    >

      {/* TOP: LOGO OG PROFIL */}

      <View style={GlobalStyle.homeV2Header}>
        <View>
          <Text style={GlobalStyle.homeV2Brand}>
            LåneApp.
          </Text>

          <Text style={GlobalStyle.homeV2Tagline}>
            Del mere. Køb mindre.
          </Text>
        </View>

        <Pressable
          style={GlobalStyle.homeV2ProfileButton}
          onPress={() => navigation.navigate("Profil")}
          accessibilityRole="button"
          accessibilityLabel="Åbn min profil"
        >
          <Ionicons
            name="person-outline"
            size={25}
            color="#245C49"
          />
        </Pressable>
      </View>

      {/* VELKOMST */}

      <View style={GlobalStyle.homeV2Intro}>
        <Text style={GlobalStyle.homeV2Title}>
          Hvad vil du gerne?
        </Text>

        <Text style={GlobalStyle.homeV2Subtitle}>
          Lån noget af andre, eller del dine egne ting.
        </Text>
      </View>

      {/* FIND TING */}

      <Pressable
        style={GlobalStyle.homeV2BorrowCard}
        onPress={() => navigation.navigate("Søg")}
        accessibilityRole="button"
      >
        <View style={GlobalStyle.homeV2CardTop}>
          <View style={GlobalStyle.homeV2BorrowIcon}>
            <Ionicons
              name="search-outline"
              size={27}
              color="#FFFFFF"
            />
          </View>

          <Ionicons
            name="arrow-forward-outline"
            size={23}
            color="#FFFFFF"
          />
        </View>

        <Text style={GlobalStyle.homeV2BorrowTitle}>
          Find noget at låne
        </Text>

        <Text style={GlobalStyle.homeV2BorrowText}>
          Udforsk ting, som andre deler i dit område.
        </Text>
      </Pressable>

      {/* LÅN TING UD */}

      <Pressable
        style={GlobalStyle.homeV2LendCard}
        onPress={() => navigation.navigate("Opret")}
        accessibilityRole="button"
      >
        <View style={GlobalStyle.homeV2CardTop}>
          <View style={GlobalStyle.homeV2LendIcon}>
            <Ionicons
              name="add-circle-outline"
              size={27}
              color="#245C49"
            />
          </View>

          <Ionicons
            name="arrow-forward-outline"
            size={23}
            color="#245C49"
          />
        </View>

        <Text style={GlobalStyle.homeV2LendTitle}>
          Lån en ting ud
        </Text>

        <Text style={GlobalStyle.homeV2LendText}>
          Opret en ting, som andre kan få glæde af.
        </Text>
      </Pressable>

      {/* SENESTE OPSLAG */}

      <View style={GlobalStyle.homeV2SectionHeader}>
        <Text style={GlobalStyle.homeV2SectionTitle}>
          Senest tilføjet
        </Text>

        <Pressable
          onPress={() => navigation.navigate("Søg")}
          accessibilityRole="button"
        >
          <Text style={GlobalStyle.homeV2SectionLink}>
            Se alle →
          </Text>
        </Pressable>
      </View>

      {items === null && !error ? (
        <View style={GlobalStyle.homeV2Loading}>
          <ActivityIndicator
            size="large"
            color="#245C49"
          />
        </View>
      ) : error ? (
        <Text style={GlobalStyle.homeV2Message}>
          {error}
        </Text>
      ) : latestItems.length === 0 ? (
        <Text style={GlobalStyle.homeV2Message}>
          Der er endnu ingen opslag.
        </Text>
      ) : (
        latestItems.map((item) => (
          <Pressable
            key={item.id}
            style={GlobalStyle.homeV2ItemCard}
            onPress={() =>
              navigation.navigate("Ting", { item })
            }
            accessibilityRole="button"
          >
            <View style={GlobalStyle.homeV2ItemIcon}>
              <Ionicons
                name="cube-outline"
                size={26}
                color="#718478"
              />
            </View>

            <View style={GlobalStyle.homeV2ItemInfo}>
              <Text
                style={GlobalStyle.homeV2ItemName}
                numberOfLines={1}
              >
                {item.name}
              </Text>

              <View style={GlobalStyle.homeV2ItemLocationRow}>
                <Ionicons
                  name="location-outline"
                  size={14}
                  color="#718077"
                />

                <Text
                  style={GlobalStyle.homeV2ItemLocation}
                  numberOfLines={1}
                >
                  {item.location}
                </Text>
              </View>

              <Text style={GlobalStyle.homeV2ItemLink}>
                Se opslag →
              </Text>
            </View>
          </Pressable>
        ))
      )}

    </ScrollView>
  );
}
