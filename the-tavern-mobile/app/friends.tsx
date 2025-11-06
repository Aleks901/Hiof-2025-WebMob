import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import UserCard from '../components/user-card';
import { useTheme } from '../../packages/ui/useTheme';
import type { User } from '../../packages/types/user';

export default function FriendsScreen() {
  // stores all the users we get from the API
  const [users, setUsers] = useState<User[]>([]);
  
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  // runs when the page loads
  useEffect(() => {
    // gets users from the server
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5173/api/v2/users');
        
        // turns the response into something we can use
        const result = await response.json() as any;
        console.log('API response:', result);
        
        // figures out what format the data is in
        if (Array.isArray(result)) {
          setUsers(result as User[]);
        } else if (result.data && Array.isArray(result.data)) {
          setUsers(result.data as User[]);
        } else {
          setUsers([]);
        }
      } catch (error) {
        // something went wrong
        console.log(error);
        // make it empty so nothing breaks
        setUsers([]);
      }
    };

    fetchUsers();
  }, []);

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
      
      {/* if there are no users it shows a message */}
      {users.length === 0 ? (
        <Text style={styles.subtitle}>No users found</Text>
      ) : (
        <FlatList
          data={users}
          renderItem={({ item }) => (
            <UserCard
              user={item}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={[styles.contentContainer, { paddingBottom: insets.bottom }]}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
        />
      )}
    </View>
  );
}
