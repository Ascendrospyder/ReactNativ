import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  createNoteButton: {
    backgroundColor: "#150022",
    width: 300,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  createNoteButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 5,
    width: "100%",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 50,
    marginLeft: 16,
  },
  taskItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    marginLeft: 10,
    marginRight: 10,
  },
  taskContent: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: "bold",
    flexWrap: "wrap",
    width: "90%",
    marginLeft: 20,
  },
  removeButton: {
    backgroundColor: "red",
    width: 150,
    padding: 8,
    borderRadius: 4,
    alignItems: "center",
  },
  removeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  editButton: {
    marginRight: 20,
  },
});

export {styles}