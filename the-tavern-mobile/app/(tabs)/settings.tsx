import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@packages/ui/useTheme';
import { useUser } from '@packages/hooks/useUser';
import { useRouter } from 'expo-router';

export default function Settings() {
  const theme = useTheme();
  const { user, logout } = useUser();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.replace('/');
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      padding: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: 20,
    },
    section: {
      marginBottom: 20,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.text,
      marginBottom: 10,
    },
    option: {
      padding: 15,
      backgroundColor: theme.card,
      borderRadius: 8,
      marginBottom: 10,
    },
    optionText: {
      fontSize: 16,
      color: theme.text,
    },
    logoutButton: {
      padding: 15,
      backgroundColor: '#ff4444',
      borderRadius: 8,
      marginTop: 20,
      alignItems: 'center',
    },
    logoutText: {
      fontSize: 16,
      color: '#ffffff',
      fontWeight: '600',
    },
    userInfo: {
      padding: 15,
      backgroundColor: theme.card,
      borderRadius: 8,
      marginBottom: 20,
    },
    userName: {
      fontSize: 18,
      color: theme.text,
      fontWeight: '600',
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      
      {user && (
        <View style={styles.userInfo}>
          <Text style={styles.userName}>Logged in as: {user.name}</Text>
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Appearance</Text>
        <View style={styles.option}>
          <Text style={styles.optionText}>Theme Settings</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <View style={styles.option}>
          <Text style={styles.optionText}>Profile Settings</Text>
        </View>
        <View style={styles.option}>
          <Text style={styles.optionText}>Privacy</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <View style={styles.option}>
          <Text style={styles.optionText}>Version Info</Text>
        </View>
        <View style={styles.option}>
          <Text style={styles.optionText}>Help & Support</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
