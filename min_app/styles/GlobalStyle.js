
import { StyleSheet } from "react-native";

// LÅNEAPP - FARVER

const COLORS = {
  background: "#F7F8F4",
  white: "#FFFFFF",

  primary: "#245C49",
  darkGreen: "#183D30",

  lightGreen: "#E4EEE7",
  softGreen: "#E7F0E9",

  text: "#33483D",
  muted: "#718077",

  border: "#E8EEE7",

  pending: "#FFF1DC",
  accepted: "#E1F1E5",
  rejected: "#FBE8E7",
};

export const GlobalStyle = StyleSheet.create({

  // 1. GENERELT DESIGN

  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
  },

  centerContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },

  // 2. GENERELLE TEKSTER

  title: {
    fontSize: 32,
    fontWeight: "800",
    color: COLORS.darkGreen,
    marginBottom: 12,
    letterSpacing: -0.5,
  },

  subtitle: {
    fontSize: 16,
    color: COLORS.muted,
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 24,
  },

  text: {
    fontSize: 16,
    color: COLORS.text,
    marginBottom: 10,
    lineHeight: 23,
  },

  // 3. KNAPPER

  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 16,
    marginBottom: 14,
    width: "100%",
    minHeight: 58,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: COLORS.darkGreen,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 3,
  },

  secondaryButton: {
    backgroundColor: COLORS.lightGreen,
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 16,
    marginBottom: 14,
    width: "100%",
    minHeight: 58,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: "700",
    textAlign: "center",
  },

  secondaryButtonText: {
    color: COLORS.primary,
    fontSize: 17,
    fontWeight: "700",
    textAlign: "center",
  },

  // 4. INPUTFELTER

  input: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: "#DFE6DF",
    paddingHorizontal: 18,
    paddingVertical: 15,
    borderRadius: 16,
    marginBottom: 16,
    width: "100%",
    minHeight: 56,
    fontSize: 16,
    color: COLORS.darkGreen,
  },

  // 5. GENERELLE KORT

  card: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#EDF0EA",
    shadowColor: COLORS.darkGreen,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.darkGreen,
    marginBottom: 8,
  },

  successText: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.primary,
    marginTop: 15,
    textAlign: "center",
  },

  // 6. GENEREL STATUSSTYLING

  statusBadge: {
    backgroundColor: COLORS.lightGreen,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 7,
    alignSelf: "flex-start",
    marginTop: 8,
  },

  statusText: {
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.primary,
  },

  statusPending: {
    backgroundColor: COLORS.pending,
  },

  statusPendingText: {
    color: "#966322",
  },

  statusRejected: {
    backgroundColor: COLORS.rejected,
  },

  statusRejectedText: {
    color: "#B34842",
  },

  // 7. HOMESCREEN - HEADER

  homeV2Content: {
    paddingBottom: 45,
  },

  homeV2Header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 6,
    marginBottom: 24,
  },

  homeV2Brand: {
    fontSize: 25,
    fontWeight: "800",
    color: COLORS.darkGreen,
    letterSpacing: -0.5,
  },

  homeV2Tagline: {
    fontSize: 13,
    color: COLORS.muted,
    marginTop: 3,
  },

  homeV2ProfileButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.lightGreen,
    justifyContent: "center",
    alignItems: "center",
  },

  // 8. HOMESCREEN - VELKOMST

  homeV2Intro: {
    marginBottom: 24,
  },

  homeV2Title: {
    fontSize: 30,
    fontWeight: "800",
    color: COLORS.darkGreen,
    letterSpacing: -0.6,
    marginBottom: 8,
  },

  homeV2Subtitle: {
    fontSize: 15,
    color: COLORS.muted,
    lineHeight: 23,
  },

  // 9. HOMESCREEN - LÅN OG UDLÅN

  homeV2BorrowCard: {
    backgroundColor: COLORS.primary,
    borderRadius: 22,
    padding: 22,
    marginBottom: 14,
  },

  homeV2LendCard: {
    backgroundColor: COLORS.softGreen,
    borderWidth: 1,
    borderColor: "#D7E5D9",
    borderRadius: 22,
    padding: 22,
    marginBottom: 28,
  },

  homeV2CardTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  homeV2BorrowIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.15)",
    justifyContent: "center",
    alignItems: "center",
  },

  homeV2LendIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
  },

  homeV2BorrowTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: COLORS.white,
    marginBottom: 8,
  },

  homeV2BorrowText: {
    fontSize: 15,
    color: "#E1EEE5",
    lineHeight: 22,
  },

  homeV2LendTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: COLORS.darkGreen,
    marginBottom: 8,
  },

  homeV2LendText: {
    fontSize: 15,
    color: "#66796C",
    lineHeight: 22,
  },

  // 10. HOMESCREEN - SENESTE OPSLAG

  homeV2SectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },

  homeV2SectionTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: COLORS.darkGreen,
  },

  homeV2SectionLink: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.primary,
  },

  homeV2ItemCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 13,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E4EBE4",
  },

  homeV2ItemIcon: {
    width: 68,
    height: 68,
    borderRadius: 13,
    backgroundColor: "#E9EFE9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  homeV2ItemInfo: {
    flex: 1,
  },

  homeV2ItemName: {
    fontSize: 17,
    fontWeight: "700",
    color: COLORS.darkGreen,
    marginBottom: 6,
  },

  homeV2ItemLocationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 7,
  },

  homeV2ItemLocation: {
    fontSize: 13,
    color: COLORS.muted,
    marginLeft: 4,
    flexShrink: 1,
  },

  homeV2ItemLink: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.primary,
  },

  homeV2Loading: {
    paddingVertical: 30,
    alignItems: "center",
  },

  homeV2Message: {
    fontSize: 14,
    color: COLORS.muted,
    lineHeight: 22,
    paddingVertical: 20,
  },

  // 11. PROFIL - HEADER

  profileContent: {
    paddingBottom: 50,
  },

  profileTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  profilePageTitle: {
    fontSize: 30,
    fontWeight: "800",
    color: COLORS.darkGreen,
    marginBottom: 5,
  },

  profilePageSubtitle: {
    fontSize: 14,
    color: COLORS.muted,
  },

  profileAvatarCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: COLORS.lightGreen,
    justifyContent: "center",
    alignItems: "center",
  },

  profileAvatarLetter: {
    fontSize: 22,
    fontWeight: "800",
    color: COLORS.primary,
  },

  // 12. PROFIL - BRUGEROPLYSNINGER

  profileUserCard: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  profileUserName: {
    fontSize: 21,
    fontWeight: "700",
    color: COLORS.darkGreen,
    marginBottom: 5,
  },

  profileUserSubtitle: {
    fontSize: 14,
    color: COLORS.muted,
  },

  // 13. PROFIL - OVERBLIK

  profileStatsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 26,
  },

  profileStatCard: {
    width: "31.5%",
    backgroundColor: "#EDF3EE",
    borderRadius: 15,
    paddingVertical: 17,
    paddingHorizontal: 5,
    alignItems: "center",
  },

  profileStatNumber: {
    fontSize: 26,
    fontWeight: "800",
    color: COLORS.primary,
    marginBottom: 6,
  },

  profileStatLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: "#52675A",
    textAlign: "center",
  },

  // 14. PROFIL - FANER

  profileTabs: {
    flexDirection: "row",
    backgroundColor: "#E9EEE9",
    borderRadius: 14,
    padding: 4,
    marginBottom: 24,
  },

  profileTab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 3,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 11,
  },

  profileTabActive: {
    backgroundColor: COLORS.white,
    shadowColor: COLORS.darkGreen,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },

  profileTabText: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.muted,
    textAlign: "center",
  },

  profileTabTextActive: {
    color: COLORS.primary,
    fontWeight: "800",
  },

  // 15. PROFIL - LÅN OG ANMODNINGER

  profileSectionTitle: {
    fontSize: 21,
    fontWeight: "700",
    color: COLORS.darkGreen,
    marginBottom: 16,
  },

  profileRequestCard: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 20,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  profileItemTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.darkGreen,
    marginBottom: 8,
  },

  profileItemDetail: {
    fontSize: 14,
    color: COLORS.muted,
    lineHeight: 22,
    marginBottom: 10,
  },

  profileRequestActions: {
    marginTop: 18,
  },

  // 16. PROFIL - STATUS

  profileStatusBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    marginTop: 4,
  },

  profileStatusPending: {
    backgroundColor: COLORS.pending,
  },

  profileStatusAccepted: {
    backgroundColor: COLORS.accepted,
  },

  profileStatusRejected: {
    backgroundColor: COLORS.rejected,
  },

  profileStatusText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#52675A",
  },

  // 17. PROFIL - TOMME LISTER

  profileEmptyCard: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 22,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  profileEmptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.darkGreen,
    marginBottom: 8,
  },

  profileEmptyText: {
    fontSize: 14,
    color: COLORS.muted,
    lineHeight: 22,
    marginBottom: 18,
  },

  // 18. PROFIL - LOADING OG FEJL

  profileLoadingText: {
    fontSize: 15,
    color: COLORS.muted,
    marginTop: 14,
  },

  profileErrorText: {
    fontSize: 15,
    color: "#B34842",
    textAlign: "center",
  },

  // 19. PROFIL - LOG UD

  profileFooter: {
    marginTop: 35,
    paddingTop: 22,
    borderTopWidth: 1,
    borderTopColor: "#E2E8E0",
    alignItems: "center",
  },

  profileLogoutButton: {
    paddingHorizontal: 24,
    paddingVertical: 14,
  },

  profileLogoutText: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.muted,
  },

});
