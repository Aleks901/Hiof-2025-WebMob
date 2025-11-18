import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { useTheme } from "@packages/ui/useTheme";
import { Image } from "react-native";
import { UserProvider } from "@packages/contexts/UserContext";

export default function RootLayout() {
  const theme = useTheme();

  return (
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
          <Image source={require("../tmp/images/Logo2.png")}
          style={{
            width: 250,
            height: 250,
            resizeMode: "contain",
            alignSelf: "center",
          }}
          />
        ),
        headerTitleAlign: "center"
      }}

      >

      <Tabs.Screen name="(drawer)"
      options={{
        title: "Home",
        tabBarIcon: () => (
          <FontAwesome name="home" size={24} color={theme.highlight}/>
        ),
        headerShown: false
        }}/>

      <Tabs.Screen name='friends' 
      options={{ 
        title: "Direct message", 
        tabBarIcon: () => (
          <FontAwesome name="envelope" size={24} color={theme.highlight}/>
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
          <FontAwesome name="user" size={24} color={theme.highlight}/>
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


