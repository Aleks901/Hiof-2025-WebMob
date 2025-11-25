import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { BasicForm } from '@/components/basic-form';
import React from 'react';
import { useUser } from '@packages/hooks/useUser';
import { useTheme } from '@packages/ui/useTheme';

export default function RegisterScreen() {
  const theme = useTheme();

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  const { register } = useUser();
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      setError('');
      await register(username, password);
      router.replace('/(tabs)/home');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to register');
      console.log(error);
    }
  };

  return (
    <View style={{ backgroundColor: theme.background, flex: 1 }}>
      <BasicForm title="Login" onSubmit={handleSubmit} buttonStyle={{ backgroundColor: theme.buttonBackground }} buttonTextStyle= {{ color: theme.buttonText}}>
        <TextInput
          placeholder="Choose a username"
          placeholderTextColor={theme.mutedText}
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          style={[
            styles.input,
            { borderColor: theme.highlight, color: theme.text }
          ]}
        />

        <TextInput
          placeholder="Choose a password"
          placeholderTextColor={theme.mutedText}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={[
            styles.input,
            { borderColor: theme.highlight, color: theme.text } ]} /> {error ? (
          <Text style={[styles.error, { color: theme.highlight }]}>{error}</Text>) : null}
      </BasicForm>

      <Link href="/" style={[styles.link, { color: theme.highlight }]}>
        Already have an account? Log in
      </Link>
    </View>
  );
}

const styles = StyleSheet.create ({ 
    input: {
        margin: 6,
        borderWidth: 1,
        padding: 8,
        borderRadius: 6
    },
    error: {
        marginTop: 8,
        marginHorizontal: 6,
        fontSize: 14,
    },
    link: {
        textAlign: 'center',
        marginTop: 16,
        fontSize: 14,
    }
 });
