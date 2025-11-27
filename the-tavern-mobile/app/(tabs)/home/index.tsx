import { View, Text, StyleSheet } from 'react-native';
import ChatroomList from '@/components/tavern-chat/chatroom-list';
import { useTheme } from '@packages/ui/useTheme';
import { Chatroom } from '@packages/types/chat-room';
import { useState, useEffect } from 'react';

async function fetchChatrooms(): Promise<Chatroom[]> {
  const response = await fetch('http://localhost:5173/api/v2/chats');
  const { data } = (await response.json()) as { data: Chatroom[] };
  return data;
}

export default function HomeScreen() {
  const theme = useTheme();
  const [chats, setChats] = useState<Chatroom[] | null>(null);

  useEffect(() => {
    fetchChatrooms().then(setChats).catch(() => setChats([]));
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 36,
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: 5,
    },
    text: {
      color: theme.text,
      marginBottom: 10
    }
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!</Text>
      <Text style={styles.text}>Pick a table!</Text>
      {chats && <ChatroomList chatrooms={chats} />}
    </View>
  );
}
