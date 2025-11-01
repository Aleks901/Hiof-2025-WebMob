import { View, TextInput, StyleSheet } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { BasicForm } from '@/components/basic-form';
import React from 'react';
import { useUser } from '@packages/hooks/useUser';

export default function RegisterScreen() {

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const { register } = useUser();
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      await register(username, password);

      router.push('/(drawer)/(home)');
    } catch (error) {

    }
  };

  return (
    <View>
      <BasicForm title="Register" onSubmit={handleSubmit}>
        <TextInput
          placeholder="Choose a username"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
        />
        <TextInput
          placeholder="Choose a password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
      </BasicForm>


      <Link href="/login">
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
    }
 });
