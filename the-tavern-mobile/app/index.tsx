import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { BasicForm } from '@/components/basic-form';
import React from 'react';
import { useUser }  from '@packages/hooks/useUser';

export default function LoginScreen() {
    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [error, setError] = React.useState('')

    const { login } = useUser();
    const router = useRouter();

    const handleSubmit = async () => {
        try {
            setError('')
            await login(username, password)
            router.replace('/(tabs)/home')
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Failed to login')
            console.log(error)
        }
    }

    return (
        <View>
            <BasicForm title="Login" onSubmit={handleSubmit}>
                <TextInput
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                    style={styles.input}
                    autoCapitalize="none"
                    />
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    style={styles.input}/>
                
                {error ? <Text style={styles.error}>{error}</Text> : null}
            </BasicForm>

            <Link href="/register" style={styles.link}>Don't have an account? Register here!</Link>
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
        color: '#ff4444',
        marginTop: 8,
        marginHorizontal: 6,
        fontSize: 14,
    },
    link: {
        color: '#4a90e2',
        textAlign: 'center',
        marginTop: 16,
        fontSize: 14,
    }
 });