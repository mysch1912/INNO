
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
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

  // Styrer den valgte fane
  const [activeTab, setActiveTab] = useState("loans");

  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  const userId = auth.currentUser?.uid;

  // =====================================
  // HENT BRUGER
  // =====================================

  useEffect(() => {
    if (!userId) return;

    const userRef = ref(rtdb, `Users/${userId}`);

    const unsubscribe = onValue(
      userRef,
      (snapshot) => {
        const userData = snapshot.val();

        setUserName(
          userData?.name ||
          auth.currentUser?.email ||
          "Bruger"
        );
      },
      () => setError("Kunne ikke hente brugerprofil.")
    );

    return () => unsubscribe();
  }, [userId]);

  // =====================================
  // HENT TING FRA FIREBASE
  // =====================================

  useEffect(() => {
    if (!userId) return;

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
      },
      () => setError("Kunne ikke hente dine ting.")
    );

    return () => unsubscribe();
  }, [userId]);

  // =====================================
  // HENT LÅNEANMODNINGER
  // =====================================

  useEffect(() => {
    if (!userId) return;

    const requestsRef = ref(rtdb, "Requests");

    const unsubscribe = onValue(
      requestsRef,
      (snapshot) => {
        const data = snapshot.val();

        const requestList = data
          ? Object.entries(data).map(([id, request]) => ({
              ...request,
              id,
            }))
          : [];

        setRequests(requestList);
      },
      () => setError("Kunne ikke hente låneanmodninger.")
    );

    return () => unsubscribe();
  }, [userId]);

  // =====================================
  // ÆNDRE STATUS
  // =====================================

  const changeRequestStatus = async (requestId, newStatus) => {
    if (updatingId) return;

    try {
      if (!userId) {
        Alert.alert("Fejl", "Du skal være logget ind.");
        return;
      }

      const request = requests?.find(
        (r) => r.id === requestId
      );

      if (!request || request.ownerId !== userId) {
        Alert.alert(
          "Fejl",
          "Du har ikke adgang til denne anmodning."
        );
        return;
      }

      if (request.status !== "pending") {
        Alert.alert(
          "Fejl",
          "Anmodningen er allerede behandlet."
        );
        return;
      }

      setUpdatingId(requestId);

      await update(ref(rtdb, `Requests/${requestId}`), {
        status: newStatus,
      });

    } catch (error) {
      Alert.alert("Fejl", error.message);
    } finally {
      setUpdatingId(null);
    }
  };

  // =====================================
  // LOG UD
  // =====================================

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      Alert.alert("Fejl", "Kunne ikke logge ud.");
    }
  };

  // =====================================
  // STATUS TEKSTER
  // =====================================

  const statusText = (status) => {
    if (status === "pending") return "Afventer svar";
    if (status === "accepted") return "Accepteret";
    if (status === "rejected") return "Afvist";

    return status || "Ukendt";
  };

  const statusStyle = (status) => {
    if (status === "accepted") {
      return GlobalStyle.profileStatusAccepted;
    }

    if (status === "rejected") {
      return GlobalStyle.profileStatusRejected;
    }

    return GlobalStyle.profileStatusPending;
  };

  // =====================================
  // LOADING OG FEJL
  // =====================================

  if (!userId) {
    return (
      <View style={GlobalStyle.centerContainer}>
        <Text style={GlobalStyle.text}>
          Log ind for at se din profil.
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={GlobalStyle.centerContainer}>
        <Text style={GlobalStyle.profileErrorText}>
          {error}
        </Text>
      </View>
    );
  }

  if (
    items === null ||
    requests === null ||
    userName === null
  ) {
    return (
      <View style={GlobalStyle.centerContainer}>
        <ActivityIndicator
          size="large"
          color="#245C49"
        />

        <Text style={GlobalStyle.profileLoadingText}>
          Henter profil...
        </Text>
      </View>
    );
  }

  // =====================================
  // FILTRER FIREBASE-DATA
  // =====================================

  const myItems = items.filter(
    (item) => item.ownerId === userId
  );

  const myBorrowRequests = requests.filter(
    (request) => request.borrowerId === userId
  );

  const requestsForMe = requests.filter(
    (request) => request.ownerId === userId
  );

  const pendingForMe = requestsForMe.filter(
    (request) => request.status === "pending"
  );

  // =====================================
  // PROFIL
  // =====================================

  return (
    <ScrollView
      style={GlobalStyle.container}
      contentContainerStyle={GlobalStyle.profileContent}
      showsVerticalScrollIndicator={false}
    >

      {/* HEADER */}

      <View style={GlobalStyle.profileTop}>
        <View>
          <Text style={GlobalStyle.profilePageTitle}>
            Min profil
          </Text>

          <Text style={GlobalStyle.profilePageSubtitle}>
            Dit personlige overblik
          </Text>
        </View>

        <View style={GlobalStyle.profileAvatarCircle}>
          <Text style={GlobalStyle.profileAvatarLetter}>
            {userName.charAt(0).toUpperCase()}
          </Text>
        </View>
      </View>

      {/* BRUGERKORT */}

      <View style={GlobalStyle.profileUserCard}>
        <Text style={GlobalStyle.profileUserName}>
          {userName}
        </Text>

        <Text style={GlobalStyle.profileUserSubtitle}>
          Velkommen tilbage til LåneApp
        </Text>
      </View>

      {/* OVERBLIK FRA FIREBASE */}

      <View style={GlobalStyle.profileStatsRow}>

        <View style={GlobalStyle.profileStatCard}>
          <Text style={GlobalStyle.profileStatNumber}>
            {myBorrowRequests.length}
          </Text>
          <Text style={GlobalStyle.profileStatLabel}>
            Mine lån
          </Text>
        </View>

        <View style={GlobalStyle.profileStatCard}>
          <Text style={GlobalStyle.profileStatNumber}>
            {pendingForMe.length}
          </Text>
          <Text style={GlobalStyle.profileStatLabel}>
            Afventer mig
          </Text>
        </View>

        <View style={GlobalStyle.profileStatCard}>
          <Text style={GlobalStyle.profileStatNumber}>
            {myItems.length}
          </Text>
          <Text style={GlobalStyle.profileStatLabel}>
            Mine ting
          </Text>
        </View>

      </View>

      {/* FANER */}

      <View style={GlobalStyle.profileTabs}>

        <Pressable
          style={[
            GlobalStyle.profileTab,
            activeTab === "loans" &&
              GlobalStyle.profileTabActive,
          ]}
          onPress={() => setActiveTab("loans")}
        >
          <Text
            style={[
              GlobalStyle.profileTabText,
              activeTab === "loans" &&
                GlobalStyle.profileTabTextActive,
            ]}
          >
            Mine lån
          </Text>
        </Pressable>

        <Pressable
          style={[
            GlobalStyle.profileTab,
            activeTab === "requests" &&
              GlobalStyle.profileTabActive,
          ]}
          onPress={() => setActiveTab("requests")}
        >
          <Text
            style={[
              GlobalStyle.profileTabText,
              activeTab === "requests" &&
                GlobalStyle.profileTabTextActive,
            ]}
          >
            Anmodninger
          </Text>
        </Pressable>

        <Pressable
          style={[
            GlobalStyle.profileTab,
            activeTab === "items" &&
              GlobalStyle.profileTabActive,
          ]}
          onPress={() => setActiveTab("items")}
        >
          <Text
            style={[
              GlobalStyle.profileTabText,
              activeTab === "items" &&
                GlobalStyle.profileTabTextActive,
            ]}
          >
            Mine ting
          </Text>
        </Pressable>

      </View>

      {/* =================================
          FANE 1: MINE LÅN
      ================================= */}

      {activeTab === "loans" && (
        <View>

          <Text style={GlobalStyle.profileSectionTitle}>
            Mine låneanmodninger
          </Text>

          {myBorrowRequests.length === 0 ? (
            <View style={GlobalStyle.profileEmptyCard}>
              <Text style={GlobalStyle.profileEmptyTitle}>
                Ingen lån endnu
              </Text>

              <Text style={GlobalStyle.profileEmptyText}>
                Du har ikke sendt nogen låneanmodninger.
              </Text>

              <ButtonComponent
                title="Find noget at låne"
                onPress={() => navigation.navigate("Søg")}
              />
            </View>
          ) : (
            myBorrowRequests.map((request) => (
              <View
                style={GlobalStyle.profileRequestCard}
                key={request.id}
              >
                <Text style={GlobalStyle.profileItemTitle}>
                  {request.itemName}
                </Text>

                <Text style={GlobalStyle.profileItemDetail}>
                  Udlåner: {request.ownerName}
                </Text>

                <View
                  style={[
                    GlobalStyle.profileStatusBadge,
                    statusStyle(request.status),
                  ]}
                >
                  <Text style={GlobalStyle.profileStatusText}>
                    {statusText(request.status)}
                  </Text>
                </View>
              </View>
            ))
          )}
        </View>
      )}

      {/* =================================
          FANE 2: ANMODNINGER TIL MIG
      ================================= */}

      {activeTab === "requests" && (
        <View>

          <Text style={GlobalStyle.profileSectionTitle}>
            Anmodninger til mig
          </Text>

          {requestsForMe.length === 0 ? (
            <View style={GlobalStyle.profileEmptyCard}>
              <Text style={GlobalStyle.profileEmptyTitle}>
                Ingen anmodninger
              </Text>

              <Text style={GlobalStyle.profileEmptyText}>
                Ingen har anmodet om at låne dine ting endnu.
              </Text>
            </View>
          ) : (
            requestsForMe.map((request) => (
              <View
                style={GlobalStyle.profileRequestCard}
                key={request.id}
              >
                <Text style={GlobalStyle.profileItemTitle}>
                  {request.itemName}
                </Text>

                <Text style={GlobalStyle.profileItemDetail}>
                  {request.borrowerName} vil gerne låne
                  denne ting.
                </Text>

                <View
                  style={[
                    GlobalStyle.profileStatusBadge,
                    statusStyle(request.status),
                  ]}
                >
                  <Text style={GlobalStyle.profileStatusText}>
                    {statusText(request.status)}
                  </Text>
                </View>

                {request.status === "pending" && (
                  <View
                    style={GlobalStyle.profileRequestActions}
                  >
                    <ButtonComponent
                      title={
                        updatingId === request.id
                          ? "Behandler..."
                          : "Accepter"
                      }
                      onPress={() =>
                        changeRequestStatus(
                          request.id,
                          "accepted"
                        )
                      }
                    />

                    <ButtonComponent
                      title="Afvis"
                      secondary
                      onPress={() =>
                        changeRequestStatus(
                          request.id,
                          "rejected"
                        )
                      }
                    />
                  </View>
                )}

              </View>
            ))
          )}
        </View>
      )}

      {/* =================================
          FANE 3: MINE TING
      ================================= */}

      {activeTab === "items" && (
        <View>

          <Text style={GlobalStyle.profileSectionTitle}>
            Mine opslag
          </Text>

          {myItems.length === 0 ? (
            <View style={GlobalStyle.profileEmptyCard}>
              <Text style={GlobalStyle.profileEmptyTitle}>
                Ingen ting endnu
              </Text>

              <Text style={GlobalStyle.profileEmptyText}>
                Du har ikke oprettet nogen ting endnu.
              </Text>
            </View>
          ) : (
            myItems.map((item) => (
              <View
                style={GlobalStyle.profileRequestCard}
                key={item.id}
              >
                <Text style={GlobalStyle.profileItemTitle}>
                  {item.name}
                </Text>

                <Text style={GlobalStyle.profileItemDetail}>
                  Område: {item.location}
                </Text>
              </View>
            ))
          )}

          <ButtonComponent
            title="Lån en ny ting ud"
            onPress={() => navigation.navigate("Opret")}
          />

        </View>
      )}

      {/* LOG UD */}

      <View style={GlobalStyle.profileFooter}>
        <Pressable
          style={GlobalStyle.profileLogoutButton}
          onPress={handleLogout}
        >
          <Text style={GlobalStyle.profileLogoutText}>
            Log ud
          </Text>
        </Pressable>
      </View>

    </ScrollView>
  );
}
