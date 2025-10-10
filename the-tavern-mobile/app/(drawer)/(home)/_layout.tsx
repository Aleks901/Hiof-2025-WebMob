import { Stack } from 'expo-router';

export default function HomeLayout() {
    return (
        <Stack
            screenOptions={{
                presentation: 'card',
                headerShown: false,
                animation: 'flip',
            }}
        >
            <Stack.Screen name="/(home)/(chat)" />
        </Stack>
    );
}