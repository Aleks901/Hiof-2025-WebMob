import { useEffect, useState } from 'react';
import { useRouter, useSegments } from 'expo-router';
import { useUser } from '@packages/hooks/useUser';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useUser();
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (isLoading) {
      return;
    }

    const inAuthGroup = segments[0] === '(tabs)';

    if (!user && inAuthGroup) {
      router.replace('/');
    } else if (user && segments[0] === undefined) {
      router.replace('/(tabs)/home');
    } else {
      setIsReady(true);
    }
  }, [user, segments, isLoading]);

  if (isLoading || !isReady) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#4a90e2" />
      </View>
    );
  }

  return <>{children}</>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
  },
});
