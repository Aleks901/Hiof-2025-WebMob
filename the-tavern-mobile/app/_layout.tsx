import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

/* 
We have to figure out whether or not it's possible to hide elements from tabs in a different way.
This just feels clunky and honestly stupid. But the docs didn't say anything about it and this "works"
for now anyways.. It's the same for hiding drawer elements, just feels unintuitive.
*/

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

      <Tabs.Screen name='(chat)/index'
      options={{
        tabBarItemStyle: {display: 'none'},
        headerShown: false
      }}/>

      <Tabs.Screen name='(chat)/[id]'
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
