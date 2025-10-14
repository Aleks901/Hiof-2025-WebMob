import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";
/* 
  We'll be using this route for:
  - When you lookup a specific user through search.
  - When you press a user's icon or name.
*/
export default function UserProfile() {
  const { id } = useLocalSearchParams();

  return (
    <View>
      <Text>User Profile</Text>
      <Text>User ID: {id}</Text>
    </View>
  );
}
