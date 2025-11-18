import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { BasicForm } from '@/components/basic-form';
import React from 'react';
import { useUser }  from '@packages/hooks/useUser';

export default function LoginScreen() {
    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')

    const { login } = useUser();

    const handleSubmit = async () => {
        try {
            await login(username, password)
        } catch (error) {
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
                    />
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    style={styles.input}/>
                </BasicForm>

                <Link href="/register"> Don't have an account? Register here!</Link>

            <Link href="/(drawer)/(home)"> Home </Link>
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