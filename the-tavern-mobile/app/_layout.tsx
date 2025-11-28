import { Stack } from "expo-router";
import { UserProvider } from "@packages/contexts/UserContext";
import { ThemeProvider } from "@packages/ui/ThemeProvider";

export default function RootLayout() {
  return (
    <UserProvider>
      <ThemeProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="register" />
          <Stack.Screen name="(tabs)" />
        </Stack>
      </ThemeProvider>
    </UserProvider>  
  );
}


