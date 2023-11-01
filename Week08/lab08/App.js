import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import TodoList from "./screens/TodoList";
import Create from "./screens/Create";
import Details from "./screens/Details";
import Edit from "./screens/Edit";

const RootStack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen
          name="Todo"
          component={TodoList}
          options={{ headerShown: false }}
        ></RootStack.Screen>
        <RootStack.Screen name="Details" component={Details}></RootStack.Screen>
        <RootStack.Screen
          name="Create Todo"
          component={Create}
        ></RootStack.Screen>
        <RootStack.Screen name="Edit" component={Edit}></RootStack.Screen>
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

