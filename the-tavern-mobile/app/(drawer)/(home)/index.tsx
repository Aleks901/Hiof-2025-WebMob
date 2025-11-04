import { View, Text, StyleSheet } from 'react-native';
import ChatroomList from '@/components/tavern-chat/chatroom-list';
import { useTheme } from '@packages/ui/useTheme';
import { Chatroom } from '@packages/types/chat-room';
import { useState, useEffect } from 'react';
/* const chatrooms = [
  {
    id: 1,
    name: "The Tavern",
    description: "The main chatroom for adventurers!",
    imgref: require('../../../assets/tavern.jpg'),
  },
  {
    id: 2,
    name: "Call of Duty",
    description: "For the FPS lovers",
    imgref: require('../../../assets/mw2.png'),
  },
  {
    id: 3,
    name: "Among Us",
    description: "For the social deduction fans",
    imgref: require('../../../assets/sus.jpg'),
  },
  {
    id: 4,
    name: "Minecraft",
    description: "For the building and crafting fans",
    imgref: require('../../../assets/mc.png'),
  },
  {
    id: 5,
    name: "Fortnite",
    description: "For the battle royale fans",
    imgref: require('../../../assets/trashgame.jpg'),
  },
]; */

async function fetchChatrooms(): Promise<Chatroom[]> {
  const response = await fetch('http://localhost:5173/api/v2/chats');
  const { data } = (await response.json()) as { data: Chatroom[] };
  return data;
}


export default function HomeScreen() {
  const theme = useTheme();
  const [chats, setChats] = useState<Chatroom[] | null>(null);

  useEffect(() => {
    fetchChatrooms().then(setChats).catch(() => setChats(null));
  }, [])

  if (!chats) {
    return null
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.header, { color: theme.highlight }]}>Welcome to The Tavern!</Text>
      <Text style={{ color: theme.text }}>Pick a table!</Text>

      <ChatroomList chatrooms={chats} />

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

});
