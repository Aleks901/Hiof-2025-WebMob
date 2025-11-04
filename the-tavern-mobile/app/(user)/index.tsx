import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import UserCard from '@/components/user-card';
import { User } from '@packages/types/user';
import { useTheme } from '@packages/ui/useTheme';

async function fetchUserData(): Promise<User> {
  const response = await fetch('http://localhost:5173/api/v2/users/1');
  const { data } = (await response.json()) as { data: User };
  return data;
}

export default function UserProfile() {
  const theme = useTheme();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetchUserData().then(setUser).catch(() => setUser(null));
  }, []);

  if (!user) {
    return null;
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>User Profile</Text>
      <View style={styles.content}>
        <UserCard user={user} />
        <Text style={[styles.details, { color: theme.text }]}>This page is a WIP, but here is a user object rendered as a UserCard to show you how it will work.</Text>
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
