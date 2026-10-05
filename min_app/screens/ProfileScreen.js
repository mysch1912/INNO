import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  View,
} from "react-native";

import { onValue, ref, update } from "firebase/database";
import { rtdb } from "../database/firebase";
import { currentUser } from "../data/currentUser";

import ButtonComponent from "../components/ButtonComponent";
import { GlobalStyle } from "../styles/GlobalStyle";

export default function ProfileScreen({ navigation }) {
  const [items, setItems] = useState(null);
  const [requests, setRequests] = useState(null);

  // Hent ting fra Firebase
  useEffect(() => {
    const itemsRef = ref(rtdb, "Items");

    const unsubscribe = onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const itemList = Object.entries(data).map(([id, item]) => ({
          id,
          ...item,
        }));

        setItems(itemList);
      } else {
        setItems([]);
      }
    });

    return () => unsubscribe();
  }, []);

  // Hent låneanmodninger fra Firebase
  useEffect(() => {
    const requestsRef = ref(rtdb, "Requests");

    const unsubscribe = onValue(requestsRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const requestList = Object.entries(data).map(
          ([id, request]) => ({
            id,
            ...request,
          })
        );

        setRequests(requestList);
      } else {
        setRequests([]);
      }
    });

    return () => unsubscribe();
  }, []);

  if (items === null || requests === null) {
    return (
      <View style={GlobalStyle.centerContainer}>
        <ActivityIndicator size="large" />
        <Text>Henter profil...</Text>
      </View>
    );
  }

  // Ting som den aktuelle bruger ejer
  const myItems = items.filter(
    (item) => item.ownerId === currentUser.id
  );

  // Anmodninger jeg selv har sendt
  const myBorrowRequests = requests.filter(
    (request) => request.borrowerId === currentUser.id
  );

  // Anmodninger andre har sendt på mine ting
  const requestsForMe = requests.filter(
    (request) => request.ownerId === currentUser.id
  );

  const changeRequestStatus = async (requestId, newStatus) => {
    try {
      await update(ref(rtdb, `Requests/${requestId}`), {
        status: newStatus,
      });
    } catch (error) {
      Alert.alert("Fejl", error.message);
    }
  };

  const statusText = (status) => {
    if (status === "pending") return "Afventer svar";
    if (status === "accepted") return "Accepteret";
    if (status === "rejected") return "Afvist";

    return status;
  };

  return (
    <ScrollView style={GlobalStyle.container}>
      <Text style={GlobalStyle.title}>Min profil</Text>

      <Text style={GlobalStyle.subtitle}>
        {currentUser.name}
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

      <View style={{ height: 30 }} />
    </ScrollView>
  );
}