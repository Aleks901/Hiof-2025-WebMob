import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "@packages/ui/useTheme";
import { User } from "@packages/types/user";

interface AboutSectionProps {
  user: User;
}

export function AboutSection({ user }: AboutSectionProps) {
  const theme = useTheme();

  const getAboutText = (role: string) => {
    switch (role) {
      case 'admin':
        return 'Administrator with full access to all tavern features and user management capabilities.';
      case 'moderator':
        return 'Moderator with permissions to manage chats and assist users in the tavern community.';
      default:
        return 'Regular member of the tavern community. Can participate in chats and discussions.';
    }
  };

  return (
    <View style={[styles.aboutSection, { backgroundColor: theme.card, borderColor: theme.mutedText }]}>
      <Text style={[styles.aboutTitle, { color: theme.text }]}>About</Text>
      <Text style={[styles.aboutText, { color: theme.mutedText }]}>
        {getAboutText(user.role)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  aboutSection: {
    borderRadius: 8,
    borderWidth: 1,
    padding: 16,
    marginBottom: 16,
  },
  aboutTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  aboutText: {
    fontSize: 14,
    lineHeight: 21,
  },
});
