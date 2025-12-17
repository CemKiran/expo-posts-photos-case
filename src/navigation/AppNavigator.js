import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../screens/HomeScreen";
import PostsStackNavigator from "./PostsStackNavigator";
import PhotoStackNavigator from "./PhotoStackNavigator";

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Posts" component={PostsStackNavigator} />
        <Tab.Screen name="Photos" component={PhotoStackNavigator} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
