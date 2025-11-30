"use client"

import { ChatMessage } from "@packages/types/chat-message"
import { useTheme } from "@packages/ui/ThemeProvider";
import '../../../styling/chat-message.css';

type Props = {
    message: ChatMessage;
}

export default function ChatMessageCard({ message }: Props) {
    const { theme } = useTheme();

    return (
        <div 
            className="chat-message-container"
            style={{
                backgroundColor: theme.card,
                borderColor: theme.highlight,
            }}
        >
            <p className="chat-message-username" style={{ color: theme.highlight }}>
                {message.user.name} Said:
            </p>
            <div>
                <p 
                    className="chat-message-text"
                    style={{
                        color: theme.text,
                        backgroundColor: theme.background,
                    }}
                >
                    {message.message}
                </p>
            </div>
            <p className="chat-message-date" style={{ color: theme.mutedText }}>
                {new Date(message.dateSent).toLocaleTimeString()}
            </p>
        </div>
    );
};
