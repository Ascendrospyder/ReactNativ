// import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";

export default function Details({ route, navigation }) {
  const { title, body, timestamp, image } = route.params;
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.notesTitle}>{title}</Text>
        <Text style={styles.notesTimestamp}>Created at: {timestamp}</Text>
      </View>

      {image && (
        <Image source={{ uri: image }} style={styles.image} />
      )}

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
    fontStyle: "italic"
  },
  image: {
    height: 200,
    resizeMode: "cover",
    marginBottom: 16,
  },
  bodyText: {
    fontSize: 18,
  },
});
