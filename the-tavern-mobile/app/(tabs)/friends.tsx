import { View, Text, StyleSheet, FlatList, TextInput, Button } from 'react-native';
import { useState, useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import UserCard from '@/components/user-card';
import { useTheme } from '@packages/ui/ThemeProvider';
import type { User } from '@packages/types/user';
import { useUser } from '@packages/hooks/useUser';

export default function FriendsScreen() {
  const [friends, setFriends] = useState<User[]>([]);
  const [search, setSearch] = useState<string>("");
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const { user } = useUser(); 
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  const fetchFriends = async () => {
    try {
      const response = await fetch(`http://localhost:5173/api/v2/users/${user.id}/friends`);
      const data = await response.json();
      setFriends(Array.isArray(data) ? data : data.data || []);
    } catch (error) {
      console.log('Error fetching friends:', error);
      setFriends([]);
    }
  };

  const addFriend = async (friendId: number) => {
    try {
      const response = await fetch(`http://localhost:5173/api/v2/users/${user.id}/friends`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ friendId }),
      });

      if (response.ok) {
        await fetchFriends();
      }
    } catch (error) {
      console.log('Error adding friend:', error);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5173/api/v2/users');
        const data = await response.json();
        setAllUsers(Array.isArray(data) ? data : data.data || []);
      } catch (error) {
        console.log('Error fetching users:', error);
      }
    };

    fetchUsers();
    fetchFriends();
  }, []);

  useEffect(() => {
    if (!search.trim()) {
      setFilteredUsers([]);
      return;
    }

    const searchLower = search.toLowerCase();
    const friendIds = new Set(friends.map(f => f.id));
    
    const filtered = allUsers.filter(u => 
      u.id !== user.id &&
      !friendIds.has(u.id) && 
      u.name.toLowerCase().includes(searchLower)
    );
    
    setFilteredUsers(filtered);
  }, [search, allUsers, friends, user.id]);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.friends, { backgroundColor: theme.background }]}>
        <Text style={[styles.header, { color: theme.highlight }]}>Friends</Text>
        <Text style={[styles.subtitle, { color: theme.text }]}>Connect with other tavern patrons</Text>
        
        {friends.length === 0 ? (
          <Text style={[styles.subtitle, { color: theme.text }]}>No users found</Text>
        ) : (
          <FlatList
            data={friends}
            renderItem={({ item }) => (
              <UserCard user={item} />
            )}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={[styles.contentContainer, { paddingBottom: insets.bottom }]}
            numColumns={2}
            columnWrapperStyle={styles.columnWrapper}
          />
        )}
      </View>
      <View style={styles.inputContainer}>
        <TextInput 
          style={[styles.input, { 
            backgroundColor: theme.card,
            borderColor: theme.buttonBackground,
            color: theme.text,
          }]} 
          placeholder="Search for a user.."
          placeholderTextColor={theme.text + '80'}
          value={search}
          onChangeText={setSearch}
        />
        
        {filteredUsers.length > 0 && (
          <View style={[styles.searchResults, { backgroundColor: theme.card }]}>
            <FlatList 
              data={filteredUsers}
              renderItem={({ item }) => (
                <View style={styles.searchResultItem}>
                  <UserCard user={item} />
                  <Button 
                    title='Add Friend' 
                    color={theme.buttonBackground} 
                    onPress={() => addFriend(item.id)}
                  />
                </View>
              )}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={styles.searchResultsContent}
              numColumns={2}
              columnWrapperStyle={styles.columnWrapper}
            />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  friends: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    marginBottom: 20,
  },
  contentContainer: {},
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 12,
    gap: 12,
  },
  inputContainer: {
    justifyContent: 'center',
    padding: 10,
  },
  input: {
    borderWidth: 2,
    marginBottom: 5,
    padding: 5,
    borderRadius: 3,
    alignItems: 'center',
    width: '100%'
  },
  searchResults: {
    maxHeight: 300,
    borderRadius: 5,
    marginTop: 5,
  },
  searchResultsContent: {
    padding: 10,
  },
  searchResultItem: {
    marginBottom: 10,
    gap: 8,
  },
  button: {
    borderRadius: 5,
    padding: 8,
    width: '100%'
  }
});
