"use client";

type ChatMessage = {
    user: { name:string },
    message: string,
    dateSent: string | Date
};

type Props = {
    message: ChatMessage;
}

export default function ChatMessageCard({ message }: Props) {

    const date = 
    message.dateSent instanceof Date 
    ? message.dateSent : new Date(message.dateSent);

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

            <p style={styles.dateSent}> {date.toLocaleTimeString()} </p>

        </div>
    );
};


const styles = {
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
        marginTop: "6px",
        color: "#8888ff",
        fontSize: "12px",
        fontStyle: "italic",
        textAlign: "right" as const,
        textShadow: "0 0 4px #5500ff",
},

};