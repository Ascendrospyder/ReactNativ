import React, { useEffect, useState } from "react";
import { Text, View, FlatList, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import { SearchBar } from "react-native-elements";
import { styles } from "./TodoList.style";

export default function TodoList({ route, navigation }) {
  const TASKS_STORE_KEY = "@tasks";

  const { updatedTask, index } = route.params ?? {};
  const { title, body, timestamp, image, serialisedDate } = route.params ?? {};

  const [tasks, setTasks] = useState([]);
  const [isChecked, setIsChecked] = useState([]);
  const [find, setFind] = useState("");

  // The effect is handled during the loading of a page as
  // per the [] dependacy list
  useEffect(() => {
    const loadTask = async () => {
      const storedTask = await AsyncStorage.getItem(TASKS_STORE_KEY);

      // If there exists a task stored in AsyncStorage go ahead and pase the json
      // and set the tasks
      if (storedTask !== null) {
        let tasks = JSON.parse(storedTask);
        setTasks(tasks);

        // initially set all the check boxes as false
        setIsChecked(Array(tasks.length).fill(false));
      }
    };
    loadTask();
  }, []);

  // Deals with saving a task when the tasks array has been modified
  // to save the task
  useEffect(() => {
    const saveTask = async () => {
      await AsyncStorage.setItem(TASKS_STORE_KEY, JSON.stringify(tasks));
    };

    saveTask();
  }, [tasks]);

  // The following effect checks if a task has
  // been updated. We get its index and set the task
  // with the updated info!
  useEffect(() => {
    if (updatedTask && index) {
      const currentTasks = [...tasks];
      currentTasks[index] = updatedTask;
      setTasks(currentTasks);
    }
  }, [updatedTask, index]);

  // The following effect will check if either details
  // havew been modified and set it accordingly
  useEffect(() => {
    if (title && body && image && timestamp && serialisedDate) {
      setTasks((prevTask) => [
        ...prevTask,
        { title, body, timestamp, image, serialisedDate },
      ]);
    }
  }, [title, body, image, serialisedDate]);

  /**
   * The following helper function helps remove a task given a particular
   * index where it is located
   * @param {*} idx - location of the task we want to remove
   */
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
        // data attribute here displays the task, else if
        // we entered any search item in the search bar we filter
        // the resulting todo titles based on that
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
