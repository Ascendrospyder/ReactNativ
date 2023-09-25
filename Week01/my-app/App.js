import { StatusBar } from 'expo-status-bar';
import { Button, Image, StyleSheet, Switch, Text, View } from 'react-native';

export default function App() {
  const toggleSwitch = () => {
    
  }
  return (
    <View style={styles.container}>
      <Text style={styles.textHeading}>Hello World</Text>
      <Text style={styles.whiteText}>It is a pleasure to be here!</Text>
      {/* <StatusBar style="auto" /> We don't need this */}
      <Image alt="Some random text" 
      style={styles.image} 
      source={{uri:'https://picsum.photos/200/200'}}
      />

      <Button style={styles.button} 
      title="Click me!" 
      onPress={() => {alert("Hello Hooman!")}}
      color={"#de218b"}
      />

      <Switch />
    </View>
  );
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textHeading: {
    color: '#de218b',
    fontSize: 50,
    fontWeight: 'bold',
    textDecorationLine: "underline",
  },
  whiteText: {
    color: 'white',
    fontSize: 30,
  }, 
  image: {
    height: 200,
    width: 200,
    borderRadius: 50,
  },
  button: {
    padding: 100,
    height: 100,
    width: 100
  }
});
