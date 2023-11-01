// import React, { useEffect, useState } from "react";
import { Text, View, Image, ScrollView } from "react-native";
import { styles } from "./Details.style";
export default function Details({ route, navigation }) {
  const { title, body, timestamp, image, serialisedDate } = route.params;

  let newDate = serialisedDate
    ? new Date(serialisedDate).toLocaleDateString("en-GB")
    : "(user has not specified)";

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.notesTitle}>{title}</Text>
        <Text style={styles.notesTimestamp}>Created at: {timestamp}</Text>
        <Text style={styles.dueDate}>Due on {newDate}</Text>
      </View>

      {image && <Image source={{ uri: image }} style={styles.image} />}

      <Text style={styles.bodyText}>{body}</Text>
    </ScrollView>
  );
}