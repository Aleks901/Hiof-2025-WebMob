import { Tabs, useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { useTheme } from "@packages/ui/ThemeProvider";
import { Image, TouchableOpacity } from "react-native";
import { ProtectedRoute } from "@/components/protected-route";
import { useUser } from "@packages/hooks/useUser";

export default function TabsLayout() {
  const { theme } = useTheme();
  const router = useRouter();
  const { logout } = useUser();

  const handleLogout = async () => {
    await logout();
    router.replace('/');
  };

  return (
    <ProtectedRoute>
      <Tabs
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.card
          },
          headerTintColor: theme.text,
          tabBarStyle: {
            backgroundColor: theme.background,
            borderTopColor: theme.hover,
          },
          tabBarActiveTintColor: theme.highlight,
          tabBarInactiveTintColor: theme.mutedText,
          headerTitle: () => (
            <Image 
              source={require("../../tmp/images/Logo2.png")}
              style={{
                width: 250,
                height: 250,
                resizeMode: "contain",
                alignSelf: "center",
              }}
            />
          ),
          headerTitleAlign: "center",
          headerRight: () => (
            <TouchableOpacity 
              onPress={handleLogout}
              style={{ marginRight: 15 }}
            >
              <FontAwesome name="sign-out" size={24} color={theme.text} />
            </TouchableOpacity>
          ),
        }}
      >
        <Tabs.Screen 
          name="home"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <FontAwesome name="home" size={24} color={color} />
            ),
          }}
        />

        <Tabs.Screen 
          name='friends' 
          options={{ 
            title: "Friends", 
            tabBarIcon: ({ color }) => (
              <FontAwesome name="users" size={24} color={color} />
            )
          }}
        />

        <Tabs.Screen 
          name='profile'
          options={{
            title: "Profile",
            tabBarIcon: ({ color }) => (
              <FontAwesome name="user" size={24} color={color} />
            ),
          }}
        />

        <Tabs.Screen 
          name='settings'
          options={{
            title: "Settings",
            tabBarIcon: ({ color }) => (
              <FontAwesome name="cog" size={24} color={color} />
            ),
          }}
        />
      </Tabs>
    </ProtectedRoute>
  );
}
