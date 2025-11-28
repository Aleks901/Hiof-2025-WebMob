import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "@packages/ui/ThemeProvider";
import { User } from "@packages/types/user";
import { ProfileAvatar } from "./ProfileAvatar";

interface UserCardProps {
  user: User;
}

export function UserCard({ user }: UserCardProps) {
  const { theme } = useTheme();

  return (
    <View style={[styles.userCard, { backgroundColor: theme.card, borderColor: theme.mutedText }]}>
      <ProfileAvatar name={user.name} />
      <Text style={[styles.userName, { color: theme.text }]}>{user.name}</Text>
      <Text style={[styles.userRole, { color: theme.mutedText }]}>{user.role}</Text>
      <Text style={[styles.joinDate, { color: theme.mutedText }]}>
        Joined {new Date(user.joinedAt).toLocaleDateString()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  userCard: {
    borderRadius: 8,
    borderWidth: 1,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
  },
  userName: {
    fontSize: 24,
    fontWeight: '500',
    marginBottom: 4,
  },
  userRole: {
    fontSize: 16,
    textTransform: 'capitalize',
    marginBottom: 4,
  },
  joinDate: {
    fontSize: 14,
  },
});
