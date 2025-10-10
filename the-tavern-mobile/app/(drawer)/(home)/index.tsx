import { View, Text, StyleSheet } from 'react-native';
import ChatMessageCard from '@/components/tavern-chat/chat-message';
import { ChatMessage } from '../../../../global/types/chat-message';
import { User } from '../../../../global/types/user';
import { Link } from 'expo-router';

// Test data
const testUser: User = {
  id: 1,
  name: "Aleks",
  role: "regular",
  dateJoined: new Date()
}

// Test data
const testMessage: ChatMessage = {
  id: 1,
  message: "Hello! Test message here!",
  user: testUser,
  dateSent: new Date()
} 

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>This will be the home page</Text>

      {/* Test components, delete at will c: */}
      <ChatMessageCard message={testMessage} />
      <Link href={'/(chat)/10'}>Test Chatroom</Link>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
