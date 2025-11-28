import { View, Text, StyleSheet, Image } from 'react-native';
import BasicButton from '../basic-button';
import { Link } from 'expo-router';
import { Chatroom } from '../../../packages/types/chat-room';
import { useTheme } from '@packages/ui/ThemeProvider';

type Props = {
    chatroom: Chatroom;
    href: string;
}

export default function BasicCard({ chatroom, href }: Props) {

    const { theme } = useTheme();

    const styles = StyleSheet.create({
    card: {
        width: 150,
        height: 200,
        borderWidth: 1,
        borderColor: theme.highlight,
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 12,
        backgroundColor: theme.card,
    },

    image: {
        width: '100%',
        height: '70%',
        borderBottomWidth: 1,
        borderBottomColor: theme.highlight,
    },

    name: {
        fontWeight: '600',
        color: theme.text,
        fontSize: 12,
        textAlign: 'center',
        marginVertical: 4,
    },

    description: {
        color: theme.highlight,
        fontSize: 10,
        textAlign: 'center',
        padding: 4,
    },

});


    return (
      <View>
        <Link href={`/${href}${chatroom.id}`} asChild>
            <BasicButton>
                <View style={styles.card}>
                    <Image source={chatroom.imgref} style={styles.image} /> 
                    <Text style={styles.name}>{chatroom.name}</Text>
                    <Text style={styles.description}>{chatroom.description}</Text>
                </View>
            </BasicButton>
        </Link>
      </View>
    );
}


