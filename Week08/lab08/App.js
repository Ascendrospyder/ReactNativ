import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TodoList from "./screens/TodoList";
import Settings from "./screens/Settings";
import { Ionicons } from "@expo/vector-icons";
import Create from "./screens/Create";
import Details from "./screens/Details";
import Edit from "./screens/Edit";

const RootStack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

export default function App() {
  const BottomTabs = () => {
    return (
      <Tabs.Navigator screenOptions={{headerShown: false}}>
        <Tabs.Screen
          name="Todo"
          component={TodoList}
          options={{
            tabBarIcon: ({ size }) => (
              <FontAwesome5 name="tasks" size={size} color="black" />
            ),
          }}
        ></Tabs.Screen>
        <Tabs.Screen
          name="Settings"
          component={Settings}
          options={{
            tabBarIcon: ({ size }) => (
              <Ionicons name="settings" size={size} color="black" />
            ),
          }}
        ></Tabs.Screen>
      </Tabs.Navigator>
    );
  };
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen
          name="Tabs"
          component={BottomTabs}
          options={{ headerShown: false }}
        ></RootStack.Screen>
        <RootStack.Screen name="Details" component={Details}></RootStack.Screen>
        <RootStack.Screen name="Create Todo" component={Create}></RootStack.Screen>
        <RootStack.Screen name="Edit" component={Edit}></RootStack.Screen>
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
