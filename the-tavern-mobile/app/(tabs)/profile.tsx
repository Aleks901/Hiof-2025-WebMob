import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import UserCard from '@/components/user-card';
import { User } from '@packages/types/user';
import { useTheme } from '@packages/ui/useTheme';
import { useUser } from '@packages/hooks/useUser';

export default function UserProfile() {
  const theme = useTheme();
  const { user: currentUser } = useUser();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchUserData() {
      if (!currentUser?.id) return;
      try {
        const response = await fetch(`http://localhost:5173/api/v2/users/${currentUser.id}`);
        const { data } = (await response.json()) as { data: User };
        setUser(data);
      } catch (error) {
        console.error('Error fetching user:', error);
        setUser(null);
      }
    }
    fetchUserData();
  }, [currentUser]);

  if (!user) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background, justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: theme.text }}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Your Profile</Text>
      <View style={styles.content}>
        <UserCard user={user} />
        <Text style={[styles.details, { color: theme.text }]}>This page is a WIP, but here is your user profile rendered as a UserCard.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  content: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'flex-start',
  },
  details: {
    flex: 1,
  },
});
