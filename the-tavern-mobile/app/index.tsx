import { View, Text } from 'react-native';
import { Link } from 'expo-router';

export default function LoginScreen() {
    return (
        <View>
            <Text> Login screen </Text>
            <Link href="/(drawer)/(home)"> Home </Link>
        </View>
    );
}