import { View, Text, StyleSheet } from 'react-native';
import ChatList from '@/components/tavern-chat/chat-list';
import { ChatMessage } from '../../../../global/types/chat-message';
import { User } from '../../../../global/types/user';
import { Link } from 'expo-router';
import ChatMessageCard from '@/components/tavern-chat/chat-message';
import ChatroomCard from '@/components/chatroomCard';
// Test user data
const testUser: User = {
  id: 1,
  name: "Aleks",
  role: "regular",
  dateJoined: new Date(),
};

// Test chat messages (AI generated with Copilot)
const testMessages: ChatMessage[] = [
  {
    id: 1,
    message: "Hello! Test message here!",
    user: testUser,
    dateSent: new Date(),
  },
  {
    id: 2,
    message: "This is another test message.",
    user: { ...testUser, name: "Bob" },
    dateSent: new Date(),
  },
  {
    id: 3,
    message: "Yet another message for testing.",
    user: { ...testUser, name: "Charlie" },
    dateSent: new Date(),
  },
];

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>This will be the home page</Text>

           <View style={styles.grid}>
  <ChatroomCard
    id="1"
    name="The Tavern"
    description="The main chatroom for adventurers!"
    image={{ uri: 'https://via.placeholder.com/120' }}  //These ones does not contain placeholder images, its just to show the idea and use of "image".
  />
  <ChatroomCard
    id="2"
    name="The Tavern2"
    description="Secondary chatroom for adventurers!"
    image={{ uri: 'https://via.placeholder.com/120' }}  //These ones does not contain placeholder images, its just to show the idea and use of "image".
  />
  <ChatroomCard
    id="3"                                                            /* Test ChatroomCards*/
    name="League of Legends"
    description="For players who feel like tilting together after ranked"
    image={{ uri: 'https://via.placeholder.com/120' }}  //These ones does not contain placeholder images, its just to show the idea and use of "image".
  />
  <ChatroomCard
    id="4"
    name="Team Fortress 2"
    description="A place where chaos meets charm"
    image={{ uri: 'https://via.placeholder.com/120' }}  //These ones does not contain placeholder images, its just to show the idea and use of "image".
  />
</View>

      {/* ChatList Component */}
      <ChatList messages={testMessages} />


      {/* Link to a chatroom */}
      <Link href={'/(chat)/10'}>
        Go to Test Chatroom
      </Link>
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

grid: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'center',
},
});
