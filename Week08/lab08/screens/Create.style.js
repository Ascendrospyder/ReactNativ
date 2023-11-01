import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  input: {
    height: 50,
    backgroundColor: "white",
    width: "100%",
    marginBottom: 16,
    padding: 10,
    borderRadius: 8,
  },
  textArea: {
    height: 100,
  },
  createTaskButton: {
    position: "absolute",
    backgroundColor: "#150022",
    width: 300,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    alignSelf: "center",
    bottom: 30,
  },
  createTaskButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  selectImageButton: {
    backgroundColor: "#150022",
    width: 250,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  selectImgContainer: {
    flexDirection: "row",
  },
  imgIcon: {
    marginLeft: 8,
  },
});

export { styles }