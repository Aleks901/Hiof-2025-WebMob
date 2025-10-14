import { FlatList, View } from "react-native";
import { ChatMessage } from "../../../packages/types/chat-message";
import ChatMessageCard from "./chat-message";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type ChatListProps = {
  messages: ChatMessage[];
}

export default function ChatList({ messages }: ChatListProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingHorizontal: insets.left,
      }}
    >
      <FlatList
        data={messages}
        style={{ marginVertical: 20 }}
        contentContainerStyle={{ gap: 15 }}
        renderItem={({ item }) => <ChatMessageCard message={item} />}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      />
    </View>
  );
}