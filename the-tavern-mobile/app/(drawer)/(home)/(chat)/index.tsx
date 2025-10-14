import {Text} from 'react-native';
import ChatList from '@/components/tavern-chat/chat-list';
import { ChatMessage } from '../../../../../global/types/chat-message';
import { User } from '../../../../../global/types/user';
import { SafeAreaProvider } from 'react-native-safe-area-context';


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

  return (
    <SafeAreaProvider>
      <Text>Chatroom</Text>
      <ChatList messages={testMessages} />
    </SafeAreaProvider>
  );
}