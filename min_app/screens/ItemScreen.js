
import { useEffect, useRef, useState } from "react";
import { Alert, Text, View } from "react-native";

import { onValue, push, ref } from "firebase/database";
import { auth, rtdb } from "../database/firebase";

import ButtonComponent from "../components/ButtonComponent";
import { GlobalStyle } from "../styles/GlobalStyle";

export default function ItemScreen({ route }) {
  const { item } = route.params;

  const [requestStatus, setRequestStatus] = useState(null);
  const [userName, setUserName] = useState(null);
  const [sending, setSending] = useState(false);
  const [checkingRequests, setCheckingRequests] = useState(true);
  const [requestError, setRequestError] = useState(false);

  const sendingRef = useRef(false);

  // Den bruger, der er logget ind
  const userId = auth.currentUser?.uid;
  const isOwnItem = item.ownerId === userId;

  // Hent brugerens navn fra Firebase
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

  // Tjek om brugeren allerede har sendt en låneanmodning
  useEffect(() => {
    if (!userId || isOwnItem) {
      setCheckingRequests(false);
      return;
    }

    setCheckingRequests(true);
    setRequestError(false);

    const requestsRef = ref(rtdb, "Requests");

    const unsubscribe = onValue(
      requestsRef,
      (snapshot) => {
        const data = snapshot.val();

        const existingRequest = data
          ? Object.values(data).find(
              (request) =>
                request.itemId === item.id &&
                request.borrowerId === userId
            )
          : null;

        setRequestStatus(existingRequest?.status || null);
        setRequestError(false);
        setCheckingRequests(false);
      },
      (error) => {
        console.log("Fejl ved hentning af låneanmodninger:", error);
        setRequestError(true);
        setCheckingRequests(false);
        Alert.alert(
          "Fejl",
          "Kunne ikke kontrollere dine låneanmodninger."
        );
      }
    );

    return () => unsubscribe();
  }, [item.id, isOwnItem, userId]);

  // Gem låneanmodningen i Firebase
  const sendRequest = async () => {
    if (sendingRef.current || sending) return;

    if (!userId || !userName) {
      Alert.alert(
        "Fejl",
        "Kunne ikke hente din brugerprofil. Prøv igen."
      );
      return;
    }

    if (isOwnItem) {
      Alert.alert("Du kan ikke låne din egen ting.");
      return;
    }

    if (!item.ownerId) {
      Alert.alert("Fejl", "Denne ting mangler en ejer.");
      return;
    }

    if (checkingRequests || requestError) {
      Alert.alert(
        "Fejl",
        "Låneanmodningerne kunne ikke kontrolleres. Prøv igen."
      );
      return;
    }

    if (requestStatus) {
      Alert.alert("Du har allerede sendt en låneanmodning.");
      return;
    }

    sendingRef.current = true;
    setSending(true);

    try {
      await push(ref(rtdb, "Requests"), {
        itemId: item.id,
        itemName: item.name,
        ownerId: item.ownerId,
        ownerName: item.ownerName || "Ukendt",
        borrowerId: userId,
        borrowerName: userName,
        status: "pending",
      });

      setRequestStatus("pending");
      Alert.alert("Låneanmodning sendt!");
    } catch (error) {
      Alert.alert("Fejl", error.message);
    } finally {
      sendingRef.current = false;
      setSending(false);
    }
  };

  // Oversæt status til dansk
  const getStatusText = () => {
    if (requestStatus === "pending") return "Afventer svar";
    if (requestStatus === "accepted") return "Accepteret ✅";
    if (requestStatus === "rejected") return "Afvist ❌";
    return null;
  };

  return (
    <View style={GlobalStyle.container}>
      <Text style={GlobalStyle.title}>{item.name}</Text>

      <View style={GlobalStyle.card}>
        <Text style={GlobalStyle.text}>
          Ejer: {item.ownerName || "Ukendt"}
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
      ) : requestError ? (
        <Text style={GlobalStyle.text}>
          Kunne ikke hente låneanmodninger.
        </Text>
      ) : (
        <ButtonComponent
          title={
            sending
              ? "Sender..."
              : checkingRequests
              ? "Kontrollerer..."
              : "Anmod om at låne"
          }
          onPress={sendRequest}
        />
      )}
    </View>
  );
}
