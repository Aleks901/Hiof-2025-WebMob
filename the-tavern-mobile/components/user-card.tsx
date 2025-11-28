import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import BasicButton from './basic-button';
import { useTheme } from '@packages/ui/ThemeProvider';
import type { User } from '@packages/types/user';

type UserCardProps = {
  user: User;
  href?: string;
}

export default function UserCard({ 
  user, 
  href = '(home)/chat'
}: UserCardProps) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View>
      <Link href={`/${href}/${user.id}`} asChild>
        <BasicButton>
          <View style={styles.card}>
            {/* User Avatar */}
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarText}>
                {user.name.charAt(0).toUpperCase()}
              </Text>
            </View>
            
            {/* User Info */}
            <View style={styles.contentContainer}>
              <Text style={styles.name} numberOfLines={1}>
                {user.name}
              </Text>
              
              <Text style={styles.role}>
                {user.role}
              </Text>
              
              <Text style={styles.joinedDate}>
                {new Date(user.joinedAt).toLocaleDateString()}
              </Text>
            </View>
          </View>
        </BasicButton>
      </Link>
    </View>
  );
}

const createStyles = (theme: any) => StyleSheet.create({
  card: {
    width: 150,
    height: 200,
    borderWidth: 1,
    borderColor: theme.highlight,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 12,
    backgroundColor: theme.card,
  },
  avatarContainer: {
    width: '100%',
    height: '60%',
    backgroundColor: theme.highlight,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: theme.highlight,
  },
  avatarText: {
    color: theme.background,
    fontWeight: '600',
    fontSize: 48,
  },
  contentContainer: {
    flex: 1,
    padding: 8,
    justifyContent: 'center',
  },
  name: {
    fontWeight: '600',
    color: theme.text,
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 2,
  },
  role: {
    color: theme.mutedText,
    fontSize: 10,
    textAlign: 'center',
    textTransform: 'capitalize',
    marginBottom: 2,
  },
  joinedDate: {
    color: theme.mutedText,
    fontSize: 8,
    textAlign: 'center',
  },
});