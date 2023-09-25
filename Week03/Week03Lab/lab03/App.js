import React, { useState } from "react";
import { Button, StyleSheet, Text, View, Image } from "react-native";

export default function App() {
  const [isImageVisible, setIsImageVisible] = useState(false);

  const triggerImage = () => {
    setIsImageVisible(!isImageVisible);
  };

  return (
    <View style={styles.masterContainer}>
      <Text style={styles.heading}>Hello, I'm Arindam!</Text>
      <Text style={styles.normalText}>Here are five facts about me:</Text>
      <Text style={styles.listElement}>
        1. I am currently in my second year, almost reaching my third :(
      </Text>
      <Text style={styles.listElement}>2. I am a level 100 procrastinator</Text>
      <Text style={styles.listElement}>3. I am 19 years old</Text>
      <Text style={styles.listElement}>
        4. I love video games, I think I have played all AAA games
      </Text>
      <Text style={styles.listElement}>
        5. I need to touch grass more often
      </Text>
      <Text style={styles.normalText}>Here is a cool image!</Text>
      {isImageVisible && (
        <Image
          source={{ uri: "https://picsum.photos/200/200" }}
          style={styles.image}
        />
      )}
      <View style={styles.buttonContainer}>
        <Button
          title={
            isImageVisible
              ? "Click me to close me!"
              : "Click me for a surprise :)"
          }
          color={"#de218b"}
          onPress={triggerImage}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  masterContainer: {
    flex: 1,
    backgroundColor: "#121212",
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    color: "#de218b",
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 30,
  },
  normalText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginBottom: 10,
    marginTop: 20,
  },
  listElement: {
    color: "white",
    fontSize: 15,
    marginBottom: 12,
    alignSelf: "flex-start",
  },
  image: {
    height: 200,
    width: 200,
    borderRadius: 50,
    marginBottom: 20,
  },
  buttonContainer: {
    borderRadius: 150,
    overflow: "hidden",
  },
});
