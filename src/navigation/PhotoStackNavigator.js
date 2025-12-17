import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PhotosListScreen from "../screens/PhotosListScreen";
import PhotoScreen from "../screens/PhotoScreen";

const Stack = createNativeStackNavigator();

export default function PhotoStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PhotosList"
        component={PhotosListScreen}
        options={{ title: "Photos" }}
      />
      <Stack.Screen
        name="PhotoDetail"
        component={PhotoScreen}
        options={{ title: "Detay" }}
      />
    </Stack.Navigator>
  );
}
