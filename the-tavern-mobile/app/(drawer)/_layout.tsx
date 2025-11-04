import { Drawer } from 'expo-router/drawer';
import { FontAwesome } from "@expo/vector-icons";
import { useTheme } from "@packages/ui/useTheme";

export default function DrawerLayout() {
  const theme = useTheme();
  return (
    <Drawer
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.card},
          headerTintColor: theme.text,
          drawerStyle: {
            backgroundColor: theme.background,
          },
          drawerActiveTintColor: theme.highlight,
          drawerInactiveTintColor: theme.mutedText,
          }}>

      <Drawer.Screen
        name="(home)"
        options={{ 
          title: "Home",
          drawerIcon: () => ( 
          <FontAwesome name="home" size={24} color={theme.highlight}/>
          ),
        }}
      />
      
    </Drawer>
  );
}
