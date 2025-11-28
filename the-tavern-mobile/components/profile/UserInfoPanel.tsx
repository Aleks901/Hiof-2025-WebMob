import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "@packages/ui/useTheme";
import { User } from "@packages/types/user";

interface UserInfoPanelProps {
  user: User;
}

export function UserInfoPanel({ user }: UserInfoPanelProps) {
  const theme = useTheme();

  return (
    <View style={[styles.infoPanel, { backgroundColor: theme.card, borderColor: theme.mutedText }]}>
      <Text style={[styles.sectionTitle, { color: theme.text, borderBottomColor: theme.highlight }]}>
        User Information
      </Text>
      
      <View style={styles.infoRow}>
        <Text style={[styles.label, { color: theme.text }]}>User ID:</Text>
        <Text style={[styles.value, { color: theme.mutedText }]}>#{user.id}</Text>
      </View>
      
      <View style={styles.infoRow}>
        <Text style={[styles.label, { color: theme.text }]}>Username:</Text>
        <Text style={[styles.value, { color: theme.mutedText }]}>{user.name}</Text>
      </View>
      
      <View style={styles.infoRow}>
        <Text style={[styles.label, { color: theme.text }]}>Role:</Text>
        <Text style={[styles.value, { color: theme.mutedText }]}>{user.role}</Text>
      </View>
      
      <View style={styles.infoRow}>
        <Text style={[styles.label, { color: theme.text }]}>Member Since:</Text>
        <Text style={[styles.value, { color: theme.mutedText }]}>
          {new Date(user.joinedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  infoPanel: {
    borderRadius: 8,
    borderWidth: 1,
    padding: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 2,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
  },
  value: {
    fontSize: 16,
  },
});
