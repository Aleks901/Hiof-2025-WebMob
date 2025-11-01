import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { useTheme } from "@packages/ui/useTheme";
import { UserProvider } from "@packages/contexts/UserContext";

export default function RootLayout() {
  const theme = useTheme();

  return (
    <UserProvider>
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
        }}

      >

        <Tabs.Screen name="(drawer)"
        options={{
          title: "Home",
          tabBarIcon: () => (
            <FontAwesome name="home" size={24}/>
          ),
          headerShown: false
          }}/>

        <Tabs.Screen name='friends' 
        options={{ 
          title: "Direct message", 
          tabBarIcon: () => (
            <FontAwesome name="envelope" size={24}/>
        )}}/>

        <Tabs.Screen name='index'
        options={{
          tabBarItemStyle: {display: 'none'},
          headerShown: false
        }}/>

        <Tabs.Screen name='(user)/index'
        options={{
          title:"User",
          tabBarIcon: () => (
            <FontAwesome name="user" size={24}/>
          ),
        }}/>

        <Tabs.Screen name='(user)/[id]'
        options={{
          tabBarItemStyle: {display: 'none'},
          headerShown: false
        }}/>

        <Tabs.Screen name='+not-found'
        options={{
          tabBarItemStyle: {display: 'none'},
          headerShown: false
        }}/>

      </Tabs>
    </UserProvider>  
  );
}
