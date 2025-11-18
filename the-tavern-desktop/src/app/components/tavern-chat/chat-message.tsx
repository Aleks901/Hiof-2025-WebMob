"use client"

import { ChatMessage } from "@packages/types/chat-message"
import { useTheme } from "@packages/ui/useTheme";

type Props = {
    message: ChatMessage;
}

export default function ChatMessageCard({ message }: Props) {

    return (
        <div style={styles.messageContainer}>
            <p style={styles.userName}>
                {message.user.name} Said:
            </p>

            <div>
                <p style={styles.messageText}>
                    {message.message}
                </p>
            </div>

            <p style={styles.dateSent}> {new Date(message.dateSent).toLocaleTimeString()} </p>
        </div>
    );
};

const theme = useTheme();

const styles = {
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
        textAlign: 'right' as const,
    },
};
