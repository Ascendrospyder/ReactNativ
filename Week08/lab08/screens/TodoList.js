import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import { SearchBar, withTheme } from "react-native-elements";

export default function TodoList({ route, navigation }) {
  const TASKS_STORE_KEY = "@tasks";

  const { updatedTask, index } = route.params ?? {};
  const { title, body, timestamp, image, serialisedDate } = route.params ?? {};

  const [tasks, setTasks] = useState([]);
  const [isChecked, setIsChecked] = useState([]);
  const [find, setFind] = useState("");

  useEffect(() => {
    const loadTask = async () => {
      const storedTask = await AsyncStorage.getItem(TASKS_STORE_KEY);

      if (storedTask !== null) {
        let tasks = JSON.parse(storedTask);
        setTasks(tasks);

        setIsChecked(Array(tasks.length).fill(false));
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
    if (updatedTask && index) {
      const currentTasks = [...tasks];
      currentTasks[index] = updatedTask;
      setTasks(currentTasks);
    }
  }, [updatedTask, index]);

  useEffect(() => {
    if (title && body && image && timestamp && serialisedDate) {
      setTasks((prevTask) => [
        ...prevTask,
        { title, body, timestamp, image, serialisedDate },
      ]);
    }
  }, [title, body, image, serialisedDate]);

  const removeTask = (idx) => {
    const currentTasks = [...tasks];
    currentTasks.splice(idx, 1);
    setTasks(currentTasks);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Tasks</Text>

      <SearchBar
        placeholder="Search a created task"
        onChangeText={(query) => setFind(query)}
        value={find}
        inputStyle={{ color: "grey", backgroundColor: "white" }}
        inputContainerStyle={{
          backgroundColor: "white",
          borderRadius: 25,
        }}
        containerStyle={{
          backgroundColor: "#f5f5f5",
          borderBottomColor: "transparent",
          borderTopColor: "transparent",
        }}
      />

      <FlatList
        data={tasks.filter((item) =>
          item.title.toLowerCase().includes(find.toLowerCase())
        )}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.taskItem}>
            <Checkbox
              value={isChecked[index]}
              onValueChange={(newValue) => {
                const newIsChecked = [...isChecked];
                newIsChecked[index] = newValue;
                setIsChecked(newIsChecked);
              }}
              color={"black"}
            />
            <Pressable
              onPress={() =>
                navigation.navigate("Details", {
                  title: item.title,
                  body: item.body,
                  timestamp: item.timestamp,
                  image: item.image,
                  serialisedDate: item.serialisedDate,
                })
              }
              style={styles.taskContent}
            >
              <Text style={styles.taskTitle}>{item.title}</Text>
            </Pressable>
            <Pressable
              style={styles.editButton}
              onPress={() => {
                navigation.navigate("Edit", {
                  title: item.title,
                  body: item.body,
                  timestamp: item.timestamp,
                  image: item.image,
                  index: index,
                });
              }}
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
    // textDecorationLine: "underline",
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
