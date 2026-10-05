import { useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";

import { onValue, push, ref } from "firebase/database";
import { rtdb } from "../database/firebase";
import { currentUser } from "../data/currentUser";

import ButtonComponent from "../components/ButtonComponent";
import { GlobalStyle } from "../styles/GlobalStyle";

export default function ItemScreen({ route }) {
  const { item } = route.params;

  const [requestStatus, setRequestStatus] = useState(null);

  const isOwnItem = item.ownerId === currentUser.id;

  // Tjek om brugeren allerede har sendt en anmodning på denne ting
  useEffect(() => {
    if (isOwnItem) return;

    const requestsRef = ref(rtdb, "Requests");

    const unsubscribe = onValue(requestsRef, (snapshot) => {
      const data = snapshot.val();

      if (!data) {
        setRequestStatus(null);
        return;
      }

      const existingRequest = Object.values(data).find(
        (request) =>
          request.itemId === item.id &&
          request.borrowerId === currentUser.id
      );

      if (existingRequest) {
        setRequestStatus(existingRequest.status);
      } else {
        setRequestStatus(null);
      }
    });

    return () => unsubscribe();
  }, [item.id, isOwnItem]);

  // Gem låneanmodningen i Firebase
  const sendRequest = async () => {
    try {
      await push(ref(rtdb, "Requests"), {
        itemId: item.id,
        itemName: item.name,
        ownerId: item.ownerId,
        ownerName: item.ownerName,
        borrowerId: currentUser.id,
        borrowerName: currentUser.name,
        status: "pending",
      });

      Alert.alert("Låneanmodning sendt!");
    } catch (error) {
      Alert.alert("Fejl", error.message);
    }
  };

  const getStatusText = () => {
    if (requestStatus === "pending") {
      return "Afventer svar";
    }

    if (requestStatus === "accepted") {
      return "Accepteret ✅";
    }

    if (requestStatus === "rejected") {
      return "Afvist ❌";
    }

    return null;
  };

  return (
    <View style={GlobalStyle.container}>
      <Text style={GlobalStyle.title}>{item.name}</Text>

      <View style={GlobalStyle.card}>
        <Text style={GlobalStyle.text}>
          Ejer: {item.ownerName}
        </Text>

        <Text style={GlobalStyle.text}>
          Område: {item.location}
        </Text>
      </View>

      {isOwnItem ? (
        <View style={GlobalStyle.card}>
          <Text style={GlobalStyle.text}>
            Dette er din egen ting.
          </Text>
        </View>
      ) : requestStatus ? (
        <View style={GlobalStyle.card}>
          <Text style={GlobalStyle.cardTitle}>
            Låneanmodning
          </Text>

          <Text style={GlobalStyle.text}>
            Status: {getStatusText()}
          </Text>
        </View>
      ) : (
        <ButtonComponent
          title="Anmod om at låne"
          onPress={sendRequest}
        />
      )}
    </View>
  );
}