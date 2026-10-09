
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  View,
} from "react-native";

import { onValue, ref, update } from "firebase/database";
import { signOut } from "firebase/auth";
import { auth, rtdb } from "../database/firebase";

import ButtonComponent from "../components/ButtonComponent";
import { GlobalStyle } from "../styles/GlobalStyle";

export default function ProfileScreen({ navigation }) {
  const [items, setItems] = useState(null);
  const [requests, setRequests] = useState(null);
  const [userName, setUserName] = useState(null);

  const userId = auth.currentUser?.uid;

  // Hent brugerens navn fra Firebase
  useEffect(() => {
    if (!userId) return;

    const userRef = ref(rtdb, `Users/${userId}`);

    const unsubscribe = onValue(userRef, (snapshot) => {
      const userData = snapshot.val();
      setUserName(userData?.name || auth.currentUser?.email || "Bruger");
    });

    return () => unsubscribe();
  }, [userId]);

  // Hent ting fra Firebase
  useEffect(() => {
    const itemsRef = ref(rtdb, "Items");

    const unsubscribe = onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();

      const itemList = data
        ? Object.entries(data).map(([id, item]) => ({
            id,
            ...item,
          }))
        : [];

      setItems(itemList);
    });

    return () => unsubscribe();
  }, []);

  // Hent låneanmodninger fra Firebase
  useEffect(() => {
    const requestsRef = ref(rtdb, "Requests");

    const unsubscribe = onValue(requestsRef, (snapshot) => {
      const data = snapshot.val();

      const requestList = data
        ? Object.entries(data).map(([id, request]) => ({
            id,
            ...request,
          }))
        : [];

      setRequests(requestList);
    });

    return () => unsubscribe();
  }, []);

  // Accepter eller afvis en låneanmodning
  const changeRequestStatus = async (requestId, newStatus) => {
    try {
      if (!userId) {
        Alert.alert("Fejl", "Du skal være logget ind.");
        return;
      }

      const request = requests?.find((r) => r.id === requestId);

      if (!request || request.ownerId !== userId) {
        Alert.alert("Fejl", "Du ejer ikke denne låneanmodning.");
        return;
      }

      if (request.status !== "pending") {
        Alert.alert("Fejl", "Anmodningen er allerede behandlet.");
        return;
      }

      await update(ref(rtdb, `Requests/${requestId}`), {
        status: newStatus,
      });
    } catch (error) {
      Alert.alert("Fejl", error.message);
    }
  };

  // Log brugeren ud af Firebase
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      Alert.alert("Fejl", "Kunne ikke logge ud.");
    }
  };

  const statusText = (status) => {
    if (status === "pending") return "Afventer svar";
    if (status === "accepted") return "Accepteret";
    if (status === "rejected") return "Afvist";

    return status;
  };

  if (items === null || requests === null || userName === null) {
    return (
      <View style={GlobalStyle.centerContainer}>
        <ActivityIndicator size="large" />
        <Text>Henter profil...</Text>
      </View>
    );
  }

  const myItems = items.filter(
    (item) => item.ownerId === userId
  );

  const myBorrowRequests = requests.filter(
    (request) => request.borrowerId === userId
  );

  const requestsForMe = requests.filter(
    (request) => request.ownerId === userId
  );

  return (
    <ScrollView style={GlobalStyle.container}>
      <Text style={GlobalStyle.title}>Min profil</Text>

      <Text style={GlobalStyle.subtitle}>
        {userName}
      </Text>

      {/* MINE LÅN */}

      <Text style={GlobalStyle.cardTitle}>Mine lån</Text>

      {myBorrowRequests.length === 0 ? (
        <View style={GlobalStyle.card}>
          <Text style={GlobalStyle.text}>
            Du har ingen låneanmodninger.
          </Text>
        </View>
      ) : (
        myBorrowRequests.map((request) => (
          <View style={GlobalStyle.card} key={request.id}>
            <Text style={GlobalStyle.cardTitle}>
              {request.itemName}
            </Text>

            <Text style={GlobalStyle.text}>
              Ejer: {request.ownerName}
            </Text>

            <Text style={GlobalStyle.text}>
              Status: {statusText(request.status)}
            </Text>
          </View>
        ))
      )}

      {/* ANMODNINGER TIL MIG */}

      <Text style={GlobalStyle.cardTitle}>
        Anmodninger til mig
      </Text>

      {requestsForMe.length === 0 ? (
        <View style={GlobalStyle.card}>
          <Text style={GlobalStyle.text}>
            Ingen vil låne dine ting endnu.
          </Text>
        </View>
      ) : (
        requestsForMe.map((request) => (
          <View style={GlobalStyle.card} key={request.id}>
            <Text style={GlobalStyle.cardTitle}>
              {request.itemName}
            </Text>

            <Text style={GlobalStyle.text}>
              {request.borrowerName} vil gerne låne denne ting.
            </Text>

            <Text style={GlobalStyle.text}>
              Status: {statusText(request.status)}
            </Text>

            {request.status === "pending" && (
              <>
                <ButtonComponent
                  title="Accepter"
                  onPress={() =>
                    changeRequestStatus(request.id, "accepted")
                  }
                />

                <ButtonComponent
                  title="Afvis"
                  secondary
                  onPress={() =>
                    changeRequestStatus(request.id, "rejected")
                  }
                />
              </>
            )}
          </View>
        ))
      )}

      {/* MINE TING */}

      <Text style={GlobalStyle.cardTitle}>
        Mine ting ({myItems.length})
      </Text>

      {myItems.length === 0 ? (
        <View style={GlobalStyle.card}>
          <Text style={GlobalStyle.text}>
            Du har ikke oprettet nogen ting endnu.
          </Text>
        </View>
      ) : (
        myItems.map((item) => (
          <View style={GlobalStyle.card} key={item.id}>
            <Text style={GlobalStyle.cardTitle}>
              {item.name}
            </Text>

            <Text style={GlobalStyle.text}>
              Område: {item.location}
            </Text>
          </View>
        ))
      )}

      <ButtonComponent
        title="Lån en ny ting ud"
        onPress={() => navigation.navigate("Opret")}
      />

      {/* LOG UD */}

      <ButtonComponent
        title="Log ud"
        secondary
        onPress={handleLogout}
      />

      <View style={{ height: 30 }} />
    </ScrollView>
  );
}
