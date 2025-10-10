import { Drawer } from 'expo-router/drawer';
import { FontAwesome } from "@expo/vector-icons";

export default function DrawerLayout() {
  return (
    <Drawer >

      <Drawer.Screen
        name="(home)"
        options={{ 
          title: "Home",
          drawerIcon: () => ( 
          <FontAwesome name="home" size={24} color={"black"}/>
          ),
        }}
      />
      
    </Drawer>
  );
}
