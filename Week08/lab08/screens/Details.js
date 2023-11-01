// import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";

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
