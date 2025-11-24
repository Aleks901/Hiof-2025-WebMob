import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";
import { ProtectedRoute } from "@/components/protected-route";

/* 
  We'll be using this route for:
  - When you lookup a specific user through search.
  - When you press a user's icon or name.
*/
export default function UserProfile() {
  const { id } = useLocalSearchParams();

  return (
    <ProtectedRoute>
      <View>
        <Text>User Profile</Text>
        <Text>User ID: {id}</Text>
      </View>
    </ProtectedRoute>
  );
}
