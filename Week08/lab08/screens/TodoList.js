import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

export default function TodoList({ route, navigation }) {
  const TASKS_STORE_KEY = "@tasks";
  const [tasks, setTasks] = useState([]);

  const { title, body, timestamp, image } = route.params ?? {};
  console.log(
    "Title: " +
      title +
      " body: " +
      body +
      " timestamp: " +
      timestamp +
      " image: " +
      image
  );

  useEffect(() => {
    const loadTask = async () => {
      const storedTask = await AsyncStorage.getItem(TASKS_STORE_KEY);

      if (storedTask !== null) {
        setTasks(JSON.parse(storedTask));
      }
    };
    loadTask();
  }, []);

  // Deals with saving a task when the tasks array has been modified
  useEffect(() => {
    const saveTask = async () => {
      await AsyncStorage.setItem(TASKS_STORE_KEY, JSON.stringify(tasks));
    };

    saveTask();
  }, [tasks]);

  useEffect(() => {
    if (title && body && image && timestamp) {
      setTasks((prevTask) => [...prevTask, { title, body, timestamp, image }]);
    }
  }, [title, body, image]);

  const removeTask = (idx) => {
    const currentTasks = [...tasks];
    currentTasks.splice(idx, 1);
    setTasks(currentTasks);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Tasks</Text>

      <FlatList
        data={tasks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.taskItem}>
            <Pressable
              onPress={() =>
                navigation.navigate("Details", {
                  title: item.title,
                  body: item.body,
                  timestamp: item.timestamp,
                  image: item.image,
                })
              }
              style={styles.taskContent}
            >
              <Text style={styles.taskTitle}>{item.title}</Text>
            </Pressable>
            <Pressable
              style={styles.editButton}
              onPress={() => editTask(index)}
            >
              <FontAwesome name="edit" size={25} color="black" />
            </Pressable>
            <Pressable onPress={() => removeTask(index)}>
              <MaterialIcons name="delete" size={30} color="red" />
            </Pressable>
          </View>
        )}
      />

      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.createNoteButton}
          onPress={() => navigation.navigate("Create Todo")}
        >
          <Text style={styles.createNoteButtonText}>Create New Task</Text>
        </Pressable>
      </View>
    </View>
  );
}

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
    textDecorationLine: "underline",
    fontWeight: "bold",
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
