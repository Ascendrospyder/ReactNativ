import React, { useState } from "react";
import { Text, TextInput, View, Pressable, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome } from "@expo/vector-icons";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "./Create.style";

export default function Create({ route, navigation }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState(null);
  const [date, setDate] = useState(new Date(1598051730000));

  // The following code has been modified using the 
  // react nativ usage for the date picker and image picker
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
          let serialisedDate = date.toISOString();
          navigation.navigate("Todo", {
            title,
            body,
            timestamp,
            image,
            serialisedDate,
          });
        }}
      >
        <Text style={styles.createTaskButtonText}>Create Task</Text>
      </Pressable>
    </View>
  );
}
