import { View, Text, ScrollView, ActivityIndicator, StyleSheet, RefreshControl } from "react-native";
import { useState, useEffect, useCallback } from "react";
import { useTheme } from "@packages/ui/useTheme";
import { User } from "@packages/types/user";
import { useUser } from '@packages/hooks/useUser';
import { UserCard, UserInfoPanel, EditProfileSection, AboutSection } from '@/components/profile';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

export default function CurrentUserProfile() {
  const theme = useTheme();
  const { user: currentUser } = useUser();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [editUsername, setEditUsername] = useState('');
  const [editPassword, setEditPassword] = useState('');
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const fetchUser = useCallback(async (isRefresh = false) => {
    if (!currentUser?.id) return;
    
    const controller = new AbortController();
    
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);
      
      const response = await fetch(
        `http://localhost:5173/api/v2/users/${currentUser.id}`,
        { signal: controller.signal }
      );
      
      if (!response.ok) {
        const errorMessage = response.status === 404 
          ? 'User not found'
          : response.status >= 500
          ? 'Server error. Please try again later.'
          : `Failed to fetch user (${response.status})`;
        throw new Error(errorMessage);
      }
      
      const result = await response.json() as ApiResponse<User>;
      
      if (result.data) {
        setUser(result.data);
        setEditUsername(result.data.name);
      } else {
        throw new Error(result.message || 'Invalid response format');
      }
    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError') {
        console.error('Error fetching user:', error);
        setError(error.message);
        setUser(null);
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
    
    return () => controller.abort();
  }, [currentUser]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleUpdateUser = async () => {
    if (!user || !currentUser?.id || isUpdating) return;
    
    try {
      setIsUpdating(true);
      setUpdateError(null);
      setUpdateSuccess(false);
      
      const updateData: Partial<Pick<User, 'name'>> & { password?: string } = {
        name: editUsername,
      };
    
      if (editPassword.trim()) {
        updateData.password = editPassword;
      }
      
      const response = await fetch(`http://localhost:5173/api/v2/users/${currentUser.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });
      
      if (!response.ok) {
        const errorMessage = response.status === 404
          ? 'User not found'
          : response.status === 400
          ? 'Invalid data provided'
          : response.status >= 500
          ? 'Server error. Please try again.'
          : `Update failed (${response.status})`;
        throw new Error(errorMessage);
      }
      
      const result = await response.json() as ApiResponse<User>;
      
      if (result.data) {
        setUser(result.data);
        setUpdateSuccess(true);
        setEditPassword('');
        setIsEditing(false);
        setTimeout(() => setUpdateSuccess(false), 3000);
      } else {
        throw new Error(result.message || 'Invalid response format');
      }
    } catch (error) {
      setUpdateError(error instanceof Error ? error.message : 'Failed to update user');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancelEdit = () => {
    if (user) {
      setEditUsername(user.name);
    }
    setEditPassword('');
    setUpdateError(null);
    setIsEditing(false);
  };

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.highlight} />
        <Text style={[styles.loadingText, { color: theme.text }]}>Loading user...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.errorContainer, { backgroundColor: theme.background }]}>
        <Text style={[styles.errorTitle, { color: theme.text }]}>Error</Text>
        <Text style={[styles.errorText, { color: theme.mutedText }]}>{error}</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={[styles.errorContainer, { backgroundColor: theme.background }]}>
        <Text style={[styles.errorText, { color: theme.text }]}>User not found</Text>
      </View>
    );
  }

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.background }]}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => fetchUser(true)}
          tintColor={theme.highlight}
          colors={[theme.highlight]}
        />
      }
    >
      <UserCard user={user} />
      
      <UserInfoPanel user={user} />
      
      <EditProfileSection
        isEditing={isEditing}
        isUpdating={isUpdating}
        editUsername={editUsername}
        editPassword={editPassword}
        updateSuccess={updateSuccess}
        updateError={updateError}
        onEditStart={() => setIsEditing(true)}
        onUsernameChange={setEditUsername}
        onPasswordChange={setEditPassword}
        onSave={handleUpdateUser}
        onCancel={handleCancelEdit}
      />
      
      <AboutSection user={user} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
  },
});
