import { View, Text, StyleSheet } from 'react-native';
import { ChatMessage } from '../../../global/types/chat-message'


type Props = {
    message: ChatMessage
}

export default function ChatMessageCard(props: Props) {

    const { message } = props;

    return (
        <View style={styles.messageContainer}>

            <Text style={styles.userName}>
                {message.user.name} Said:
            </Text>

            <View>
                <Text style={styles.messageText}>
                    {message.message}
                </Text>
            </View>

            <Text style={styles.dateSent}> {message.dateSent.toLocaleTimeString()} </Text>

        </View>
    );
};

const styles = StyleSheet.create({
    messageContainer: {
        marginVertical: 10,
        padding: 14,
        borderRadius: 12,
        backgroundColor: '#0a0a0f', 
        borderWidth: 1,
        borderColor: '#1affff', 
        shadowColor: '#1affff',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        elevation: 10,
    },
    userName: {
        fontWeight: 'bold',
        color: '#ff00ff', 
        fontSize: 16,
        textShadowColor: '#ff33cc',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 6,
        letterSpacing: 1,
    },
    messageText: {
        marginTop: 6,
        color: '#00ffff',
        borderColor: '#ff00ff',
        borderWidth: 1,
        padding: 10,
        borderRadius: 6,
        backgroundColor: 'rgba(10, 10, 25, 0.8)',
        textShadowColor: '#00ffff',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 8,
        fontSize: 15,
        lineHeight: 20,
    },
    dateSent: {
        marginTop: 6,
        color: '#8888ff',
        fontSize: 12,
        fontStyle: 'italic',
        textAlign: 'right',
        textShadowColor: '#5500ff',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 4,
    },
});

