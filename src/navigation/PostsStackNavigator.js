import { createNativeStackNavigator } from "@react-navigation/native-stack";

import PostsScreen from "../screens/PostsScreen";
import PostDetailScreen from "../screens/PostDetailScreen";

const Stack = createNativeStackNavigator();

export default function PostsStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PostsList"
        component={PostsScreen}
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
