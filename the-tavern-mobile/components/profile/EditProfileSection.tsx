import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import { useTheme } from "@packages/ui/useTheme";

interface EditProfileSectionProps {
  isEditing: boolean;
  isUpdating: boolean;
  editUsername: string;
  editPassword: string;
  updateSuccess: boolean;
  updateError: string | null;
  onEditStart: () => void;
  onUsernameChange: (text: string) => void;
  onPasswordChange: (text: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

export function EditProfileSection({
  isEditing,
  isUpdating,
  editUsername,
  editPassword,
  updateSuccess,
  updateError,
  onEditStart,
  onUsernameChange,
  onPasswordChange,
  onSave,
  onCancel,
}: EditProfileSectionProps) {
  const theme = useTheme();

  return (
    <View style={[styles.editSection, { backgroundColor: theme.card, borderColor: theme.mutedText }]}>
      <View style={styles.editHeader}>
        <Text style={[styles.editTitle, { color: theme.text }]}>Edit Profile</Text>
        {!isEditing && (
          <TouchableOpacity
            onPress={onEditStart}
            style={[styles.editButton, { backgroundColor: theme.highlight }]}
          >
            <Text style={[styles.editButtonText, { color: theme.background }]}>Edit</Text>
          </TouchableOpacity>
        )}
      </View>
      
      {updateSuccess && (
        <View style={[styles.successMessage, { backgroundColor: theme.highlight, opacity: 0.9 }]}>
          <Text style={[styles.messageText, { color: theme.background }]}>User updated successfully!</Text>
        </View>
      )}
      
      {updateError && (
        <View style={[styles.errorMessage, { backgroundColor: '#ef4444' }]}>
          <Text style={[styles.messageText, { color: '#ffffff' }]}>{updateError}</Text>
        </View>
      )}
      
      {isEditing ? (
        <View style={styles.editForm}>
          <View style={styles.formGroup}>
            <Text style={[styles.formLabel, { color: theme.text }]}>Username</Text>
            <TextInput
              value={editUsername}
              onChangeText={onUsernameChange}
              style={[styles.formInput, { 
                backgroundColor: theme.background, 
                color: theme.text,
                borderColor: theme.mutedText 
              }]}
            />
          </View>
          
          <View style={styles.formGroup}>
            <Text style={[styles.formLabel, { color: theme.text }]}>Password</Text>
            <TextInput
              value={editPassword}
              onChangeText={onPasswordChange}
              placeholder="Leave blank to keep current password"
              placeholderTextColor={theme.mutedText}
              secureTextEntry
              style={[styles.formInput, { 
                backgroundColor: theme.background, 
                color: theme.text,
                borderColor: theme.mutedText 
              }]}
            />
          </View>
          
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              onPress={onSave}
              disabled={isUpdating}
              style={[styles.saveButton, { 
                backgroundColor: theme.highlight,
                opacity: isUpdating ? 0.6 : 1
              }]}
            >
              {isUpdating ? (
                <ActivityIndicator size="small" color={theme.background} />
              ) : (
                <Text style={[styles.buttonText, { color: theme.background }]}>Save Changes</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onCancel}
              disabled={isUpdating}
              style={[styles.cancelButton, { 
                backgroundColor: theme.background,
                borderColor: theme.mutedText,
                opacity: isUpdating ? 0.6 : 1
              }]}
            >
              <Text style={[styles.buttonText, { color: theme.text }]}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.editPlaceholder}>
          <Text style={[styles.placeholderText, { color: theme.mutedText }]}>
            Click "Edit" to update your username or password
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  editSection: {
    borderRadius: 8,
    borderWidth: 1,
    padding: 20,
    marginBottom: 16,
  },
  editHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  editTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  editButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  successMessage: {
    padding: 12,
    borderRadius: 4,
    marginBottom: 16,
  },
  errorMessage: {
    padding: 12,
    borderRadius: 4,
    marginBottom: 16,
  },
  messageText: {
    fontSize: 14,
    fontWeight: '500',
  },
  editForm: {
    gap: 16,
  },
  formGroup: {
    gap: 8,
  },
  formLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  formInput: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 4,
    fontSize: 14,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  saveButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 4,
    borderWidth: 1,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  editPlaceholder: {
    padding: 20,
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 14,
  },
});
