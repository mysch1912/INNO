import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "./database/firebase";
import { GlobalStyle } from "./styles/GlobalStyle";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";

import HomeScreen from "./screens/HomeScreen";
import SearchScreen from "./screens/SearchScreen";
import CreateItemScreen from "./screens/CreateItemScreen";
import ItemScreen from "./screens/ItemScreen";
import ProfileScreen from "./screens/ProfileScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);
  if (loading) {
    return (
      <View style={GlobalStyle.centerContainer}>
        <ActivityIndicator size="large" color="#245C49" />
      </View>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen name="Forside" component={HomeScreen} />
            <Stack.Screen name="Søg" component={SearchScreen} />
            <Stack.Screen name="Opret" component={CreateItemScreen} />
            <Stack.Screen name="Ting" component={ItemScreen} />
            <Stack.Screen name="Profil" component={ProfileScreen} />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="Opret bruger"
              component={RegisterScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}