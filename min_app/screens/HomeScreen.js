import { Text, View } from "react-native";

import ButtonComponent from "../components/ButtonComponent";
import { GlobalStyle } from "../styles/GlobalStyle";

export default function HomeScreen({ navigation }) {
  return (
    <View style={GlobalStyle.centerContainer}>
      <Text style={GlobalStyle.title}>LåneApp</Text>

      <Text style={GlobalStyle.subtitle}>
        Lån ting af andre eller lån dine egne ting ud.
      </Text>

      <ButtonComponent
        title="Find noget at låne"
        onPress={() => navigation.navigate("Søg")}
      />

      <ButtonComponent
        title="Lån en ting ud"
        onPress={() => navigation.navigate("Opret")}
        secondary
      />

      <ButtonComponent
        title="Min profil"
        onPress={() => navigation.navigate("Profil")}
        secondary
      />
    </View>
  );
}