import { Stack } from "expo-router";

export default function HomeStack() {
  return (
    <Stack screenOptions={{ headerShown: true, 
                            headerTransparent: true, 
                            headerTintColor: "white", 
                            title: "" }}>
      <Stack.Screen name="index"/>
      <Stack.Screen name="chat/[id]" />
    </Stack>
  );
}
