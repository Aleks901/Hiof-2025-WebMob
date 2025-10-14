import { View, Text, StyleSheet, Image } from 'react-native';
import BasicButton from '../basic-button';
import { Link } from 'expo-router';
import { Chatroom } from '../../../global/types/chat-room';

type Props = {
    chatroom: Chatroom;
}

export default function ChatroomCard({ chatroom }: Props) {

    return (
      <View>
        <Link href={`/(chat)/${chatroom.id}`} asChild>
            <BasicButton>
                <View style={styles.card}>
                    <Image source={chatroom.image} style={styles.image} /> 
                    <Text style={styles.name}>{chatroom.name}</Text>
                    <Text style={styles.description}>{chatroom.description}</Text>
                </View>
            </BasicButton>
        </Link>
      </View>
    );
}


const styles = StyleSheet.create({
    card: {
        width: 150,
        height: 200,
        borderWidth: 1,
        borderColor: '#ff00ff',
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 12,
        backgroundColor: '#0a0a0f',
    },

    image: {
        width: '100%',
        height: '70%',
        borderBottomWidth: 1,
        borderBottomColor: '#ff00ff',
    },

    name: {
        fontWeight: '600',
        color: '#ff33cc',
        fontSize: 12,
        textAlign: 'center',
        marginVertical: 4,
    },

    description: {
        color: '#00ffff',
        fontSize: 10,
        textAlign: 'center',
        padding: 4,
    },

});