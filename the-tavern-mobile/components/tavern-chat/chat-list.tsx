import { FlatList, View } from "react-native";
import { ChatMessage } from "../../../packages/types/chat-message";
import ChatMessageCard from "./chat-message";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRef } from "react";

type ChatListProps = {
  messages: ChatMessage[];
  myUserId: number;
};

export default function ChatList({ messages, myUserId }: ChatListProps) {
  const insets = useSafeAreaInsets();
  const listRef = useRef<FlatList<ChatMessage>>(null);

  const scrollToBottom = (animated = true) => {
    const ref = listRef.current as any;
    if (!ref) return;
    if (typeof ref.scrollToEnd === "function") {
      ref.scrollToEnd({ animated });
    } else if (typeof ref.scrollToIndex === "function") {
      ref.scrollToIndex({ index: Math.max(0, messages.length - 1), animated });
    }
  };

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
        ref={listRef}
        data={messages}
        style={{ marginVertical: 20 }}
        contentContainerStyle={{ gap: 15 }}
        onContentSizeChange={() => scrollToBottom(true)}
        onLayout={() => scrollToBottom(false)}
        renderItem={({ item }) => {
          const isMine =
            ((item as any).user?.id ?? (item as any).userId ?? (item as any).authorId) ===
            myUserId;
          return (
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: isMine ? "flex-end" : "flex-start",
              }}
            >
              <View style={{ maxWidth: "85%" }}>
                <ChatMessageCard message={item} />
              </View>
            </View>
          );
        }}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      />
    </View>
  );
}