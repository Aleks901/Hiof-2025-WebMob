import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

export default function RootLayout() {
  return (
    <Tabs>

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
  );
}
