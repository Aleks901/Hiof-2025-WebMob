import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";
import ChatList from '@/components/tavern-chat/chat-list';
import { ChatMessage } from '../../../../../packages/types/chat-message';
import { User } from '../../../../../packages/types/user';
/* 
  We'll be using this route for:
  - When you lookup a specific user through search.
  - When you press a user's icon or name.
*/

// Test data
const testUser: User = {
  id: 1,
  name: "Aleks",
  role: "regular",
  dateJoined: new Date(),
};

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
  {
    id: 4,
    message: "Hello! Test message here!",
    user: testUser,
    dateSent: new Date(),
  },
  {
    id: 5,
    message: "This is another test message.",
    user: { ...testUser, name: "Bob" },
    dateSent: new Date(),
  },
  {
    id: 6,
    message: "Yet another message for testing.",
    user: { ...testUser, name: "Charlie" },
    dateSent: new Date(),
  },
];

export default function ChatRoom() {
  const { id } = useLocalSearchParams();

  return (
    <View>
      <Text>A Chatroom</Text>
      <Text>Chat ID: {id}</Text>
      <ChatList messages={testMessages} />
      
    </View>
  );
}