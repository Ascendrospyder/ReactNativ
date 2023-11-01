import React, { useState } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Pressable,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome } from "@expo/vector-icons";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { MaterialIcons } from "@expo/vector-icons";

export default function Create({ route, navigation }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState(null);
  const [date, setDate] = useState(new Date(1598051730000));

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // These items should include a title, description, image and due date
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title:</Text>
      <TextInput
        placeholder="Please enter a title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />

      <Text style={styles.label}>Description:</Text>
      <TextInput
        placeholder="Please enter the description of the task"
        value={body}
        onChangeText={setBody}
        multiline={true}
        style={[styles.input, styles.textArea]}
      />

      <Text style={styles.label}>Select an Image:</Text>
      <Pressable style={styles.selectImageButton} onPress={pickImage}>
        <View style={styles.selectImgContainer}>
          <Text style={styles.createTaskButtonText}>Select an image </Text>
          <FontAwesome
            name="file-image-o"
            size={25}
            color="white"
            style={styles.imgIcon}
          />
        </View>
      </Pressable>
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}

      <Text style={styles.label}>Select a Due Date:</Text>

      <Pressable style={styles.selectImageButton} onPress={showDatepicker}>
        <View style={styles.selectImgContainer}>
          <Text style={styles.createTaskButtonText}>Select a date</Text>
          <MaterialIcons
            name="date-range"
            size={25}
            color="white"
            style={styles.imgIcon}
          />
        </View>
      </Pressable>

      <Pressable
        style={styles.createTaskButton}
        onPress={() => {
          // get the time created
          const timestamp = new Date().toLocaleString("en-GB");
          let serialisedDate = date.toISOString()
          navigation.navigate("Todo", { title, body, timestamp, image, serialisedDate });
        }}
      >
        <Text style={styles.createTaskButtonText}>Create Task</Text>
      </Pressable>
    </View>
  );
}

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
