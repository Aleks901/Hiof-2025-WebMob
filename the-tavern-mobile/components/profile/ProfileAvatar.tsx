import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "@packages/ui/useTheme";

interface ProfileAvatarProps {
  name: string;
}

export function ProfileAvatar({ name }: ProfileAvatarProps) {
  const theme = useTheme();

  return (
    <View style={[styles.avatar, { backgroundColor: theme.highlight }]}>
      <Text style={[styles.avatarText, { color: theme.background }]}>
        {name.charAt(0).toUpperCase()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: '600',
  },
});
