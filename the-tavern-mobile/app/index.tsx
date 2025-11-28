import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { BasicForm } from '@/components/basic-form';
import React from 'react';
import { useUser } from '@packages/hooks/useUser';
import { useTheme } from '@packages/ui/ThemeProvider';

export default function LoginScreen() {
    const { theme } = useTheme();
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');

    const { login } = useUser();
    const router = useRouter();

    const handleSubmit = async () => {
        try {
            setError('');
            await login(username, password);
            router.replace('/(tabs)/home');
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Failed to login');
            console.log(error);
        }
    };

    return (
        <View style={{ backgroundColor: theme.background, flex: 1 }}>
            <BasicForm title="Login" onSubmit={handleSubmit} buttonStyle={{ backgroundColor: theme.buttonBackground }} buttonTextStyle= {{ color: theme.buttonText}}>
                <TextInput
                    placeholder="Username"
                    placeholderTextColor={theme.mutedText}
                    value={username}
                    onChangeText={setUsername}
                    style={[styles.input, { borderColor: theme.highlight, color: theme.text }]}
                    autoCapitalize="none"
                />
                <TextInput
                    placeholder="Password"
                    placeholderTextColor={theme.mutedText}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    style={[styles.input, { borderColor: theme.highlight, color: theme.text }]}
                />
                {error ? (
                    <Text style={[styles.error, { color: theme.highlight }]}>{error}</Text>
                ) : null}
            </BasicForm>
            <Link href="/register" style={[styles.link, { color: theme.highlight }]}> Don't have an account? Register here!
            </Link>
        </View>
    );
}

const styles = StyleSheet.create ({
    input: {
        margin: 6,
        borderWidth: 1,
        padding: 8,
        borderRadius: 6,
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
    },
});
