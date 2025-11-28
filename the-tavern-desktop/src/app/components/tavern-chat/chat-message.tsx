"use client"

import { ChatMessage } from "@packages/types/chat-message"
import { useTheme } from "@packages/ui/ThemeProvider";

type Props = {
    message: ChatMessage;
}

export default function ChatMessageCard({ message }: Props) {
    const { theme } = useTheme();

    const styles: { [key: string]: React.CSSProperties } = {
        messageContainer: {
            padding: 16,
            borderRadius: 12,
            backgroundColor: theme.card, 
            border: `2px solid ${theme.highlight}`,
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
            transition: 'box-shadow 0.2s ease',
        },
        userName: {
            fontWeight: '600',
            color: theme.highlight, 
            fontSize: 14,
            letterSpacing: 0.5,
            margin: '0 0 8px 0',
            textTransform: 'uppercase' as const,
        },
        messageText: {
            marginTop: 8,
            color: theme.text,
            padding: 14,
            borderRadius: 8,
            backgroundColor: theme.background,
            fontSize: 15,
            lineHeight: '1.6',
            margin: 0,
            wordWrap: 'break-word' as const,
        },
        dateSent: {
            marginTop: 8,
            color: theme.mutedText,
            fontSize: 11,
            fontStyle: 'italic',
            textAlign: 'right',
            margin: 0,
        },
    };

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
