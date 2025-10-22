import {Text} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';


export default function ChatRoom() {

  return (
    <SafeAreaProvider>
      <Text>Chatroom</Text>
    </SafeAreaProvider>
  );
}