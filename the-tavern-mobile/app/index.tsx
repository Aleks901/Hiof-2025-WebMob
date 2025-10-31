import { View, Text, TextInput } from 'react-native';
import { Link } from 'expo-router';
import { BasicForm } from '@/components/basic-form';
import React from 'react';
import { useUser }  from '@packages/hooks/useUser';

export default function LoginScreen() {
    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')

    const { user } = useUser();

    const handleSubmit = () => {
        console.log('Current user:',user)
        console.log('Logging in with', username, password)
    }

    return (
        <View>
            <BasicForm title="Login" onSubmit={handleSubmit}>
                <TextInput
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                    style={{ 
                        margin: 6,
                        borderWidth: 1,
                        padding: 8,
                        borderRadius: 6
                     }}
                    />
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    style={{ 
                        margin: 6,
                        borderWidth: 1,
                        padding: 8,
                        borderRadius: 6
                     }}/>
                </BasicForm>
            <Link href="/(drawer)/(home)"> Home </Link>
        </View>
    );
}