import { createNativeStackNavigator } from "@react-navigation/native-stack";

import PostsScreen from "../screens/PostsScreen";
import PostDetailScreen from "../screens/PostDetailScreen";
import PostsListScreen from "../screens/PostsListScreen";


const Stack = createNativeStackNavigator();

export default function PostsStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PostsList"
        component={PostsListScreen}
        options={{ title: "Posts" }}
      />
      <Stack.Screen
        name="PostDetail"
        component={PostDetailScreen}
        options={{ title: "Detay" }}
      />
    </Stack.Navigator>
  );
}
