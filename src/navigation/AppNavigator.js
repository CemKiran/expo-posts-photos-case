import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PostsStackNavigator from "./PostsStackNavigator";

import HomeScreen from "../screens/HomeScreen";
import PostsScreen from "../screens/PostsScreen";
import PhotosScreen from "../screens/PhotosScreen";

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Posts" component={PostsStackNavigator} />
        <Tab.Screen name="Photos" component={PhotosScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
