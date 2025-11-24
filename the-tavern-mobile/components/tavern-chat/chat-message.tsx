import { View, Text, StyleSheet } from 'react-native';
import { ChatMessage } from '../../../packages/types/chat-message'
import { useTheme } from '@packages/ui/useTheme';


type Props = {
    message: ChatMessage
}
// We have to clean this shit up and figure out how we're going to do styling consistently, 
// moving on for now though. I'm busy.
export default function ChatMessageCard(props: Props) {

    const theme = useTheme();

    const { message } = props;

    const styles = StyleSheet.create({
    messageContainer: {
        marginVertical: 10,
        padding: 14,
        borderRadius: 12,
        backgroundColor: theme.background, 
        borderWidth: 1,
        borderColor: theme.highlight, 
    },
    userName: {
        fontWeight: 'bold',
        color: theme.text, 
        fontSize: 16,
        textShadowColor: theme.highlight,
        letterSpacing: 1,
    },
    messageText: {
        marginTop: 6,
        color: theme.text,
        borderColor: theme.highlight,
        borderWidth: 1,
        padding: 10,
        borderRadius: 6,
        backgroundColor: theme.card,
        textShadowColor: theme.highlight,
        fontSize: 15,
        lineHeight: 20,
    },
    dateSent: {
        marginTop: 6,
        color: theme.mutedText,
        fontSize: 12,
        fontStyle: 'italic',
        textAlign: 'right',
    },
});


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

            <Text style={styles.dateSent}>{new Date(message.dateSent).toLocaleTimeString()}</Text>

        </View>
    );
};



