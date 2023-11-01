import React, { useState } from "react";
import {
  Text,
  TextInput,
  View,
  Pressable,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome } from "@expo/vector-icons";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "./Create.style";

export default function Edit({ route, navigation }) {
  // keep track of their timestamp and index, this will be useful when
  const { timestamp, index } = route.params;
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");
  const [newImage, setNewImage] = useState("");
  const [newDate, newSetDate] = useState(new Date(1598051730000));

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    newSetDate(currentDate);
  };

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: newDate,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode("newDate");
  };

  // modified from the react native docs for the
  // usage
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setNewImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Edit Title:</Text>
      <TextInput
        placeholder="Edit the title"
        value={newTitle}
        onChangeText={setNewTitle}
        style={styles.input}
      />

      <Text style={styles.label}>Edit Description:</Text>
      <TextInput
        placeholder="Edit the description of the task"
        value={newBody}
        onChangeText={setNewBody}
        multiline={true}
        style={[styles.input, styles.textArea]}
      />

      <Text style={styles.label}>Change Image:</Text>
      <Pressable style={styles.selectImageButton} onPress={pickImage}>
        <View style={styles.selectImgContainer}>
          <Text style={styles.createTaskButtonText}>Select an image</Text>
          <FontAwesome
            name="file-image-o"
            size={25}
            color="white"
            style={styles.imgIcon}
          />
        </View>
      </Pressable>
      {newImage && (
        <Image source={{ uri: newImage }} style={{ width: 200, height: 200 }} />
      )}

      <Text style={styles.label}>Select New Due Date:</Text>
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
          let serialisedDate = newDate.toISOString()
          const updatedData = {
            title: newTitle,
            body: newBody,
            timestamp,
            image: newImage,
            serialisedDate: serialisedDate
          };
          navigation.navigate("Todo", { updatedTask: updatedData, index });
        }}
      >
        <Text style={styles.createTaskButtonText}>Update Task</Text>
      </Pressable>
    </View>
  );
}
