import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import UserCard from '../components/user-card';
import { useTheme } from '../../packages/ui/useTheme';
import type { User } from '../../packages/types/user';

// Mock data for demonstration, made with copilot
const mockUsers: User[] = [
  {
    id: 1,
    name: "Eirik the Bold",
    password: "hashed_password_1",
    role: "regular",
    joinedAt: new Date("2024-01-15")
  },
  {
    id: 2,
    name: "Astrid Moonwhisper",
    password: "hashed_password_2",
    role: "moderator",
    joinedAt: new Date("2024-02-20")
  },
  {
    id: 3,
    name: "Bjorn Ironforge",
    password: "hashed_password_3",
    role: "regular",
    joinedAt: new Date("2024-03-10")
  },
  {
    id: 4,
    name: "Freya Stormcaller",
    password: "hashed_password_4",
    role: "admin",
    joinedAt: new Date("2024-04-05")
  },
  {
    id: 5,
    name: "Ragnar Bloodaxe",
    password: "hashed_password_5",
    role: "regular",
    joinedAt: new Date("2024-05-12")
  },
  {
    id: 6,
    name: "Ingrid Frostborn",
    password: "hashed_password_6",
    role: "moderator",
    joinedAt: new Date("2024-06-08")
  },
  {
    id: 7,
    name: "Olaf Stormbeard",
    password: "hashed_password_7",
    role: "regular",
    joinedAt: new Date("2024-07-20")
  },
  {
    id: 8,
    name: "Sigrid Moonblade",
    password: "hashed_password_8",
    role: "admin",
    joinedAt: new Date("2024-08-15")
  }
];

export default function FriendsScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    header: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme.highlight,
      marginBottom: 20,
    },
    subtitle: {
      color: theme.text,
      marginBottom: 20,
    },
    contentContainer: {},
    columnWrapper: {
      justifyContent: "space-between",
      marginBottom: 12,
      gap: 12,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Friends</Text>
      <Text style={styles.subtitle}>Connect with other tavern patrons</Text>
      
      <FlatList
        data={mockUsers}
        renderItem={({ item }) => (
          <UserCard
            user={item}
            showRole={true}
            showJoinedDate={true}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={[styles.contentContainer, { paddingBottom: insets.bottom }]}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
      />
    </View>
  );
}
