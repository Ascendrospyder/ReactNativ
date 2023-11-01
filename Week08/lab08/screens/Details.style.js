import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  notesTitle: {
    fontSize: 35,
    fontWeight: "bold",
  },
  notesTimestamp: {
    color: "#888",
    fontStyle: "italic",
  },
  image: {
    height: 200,
    resizeMode: "cover",
    marginBottom: 16,
  },
  bodyText: {
    fontSize: 18,
  },
  dueDate: {
    color: "red",
    fontWeight: "bold",
    fontStyle: "italic",
  },
});

export { styles }