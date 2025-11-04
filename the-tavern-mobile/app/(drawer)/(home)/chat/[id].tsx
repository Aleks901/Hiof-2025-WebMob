import { useLocalSearchParams } from "expo-router";
import { View, StyleSheet, TextInput, Button } from "react-native";
import { useTheme } from "@packages/ui/useTheme";
import { ChatMessage } from "@packages/types/chat-message";
import { useEffect, useState, useCallback } from "react";
import ChatList from "@/components/tavern-chat/chat-list";

// THIS ENTIRE FILE IS WIP, ONLY EXISTS FOR PROOF OF CONCEPT.
// Test user. we'll be removing and replacing this whenever AuthContext is done.
const pretendAuthUser = {
  id: 5,
};

async function fetchChatMessages(chatId: string): Promise<ChatMessage[]> {
  const response = await fetch(`http://192.168.43.15:5173/api/v2/chats/${chatId}/messages`);
  const { data } = (await response.json()) as { data: ChatMessage[] };
  return data;
}

async function postChatMessages(chatId: string, message: string): Promise<ChatMessage | ChatMessage[]> {
  const response = await fetch(`http://192.168.43.15:5173/api/v2/chats/${chatId}/messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId: pretendAuthUser.id, message }),
  });
  const { data } = await response.json();
  return data;
}

export default function ChatRoom() {
  const { id } = useLocalSearchParams<{ id: string | string[] }>();
  const chatId = Array.isArray(id) ? id[0] : id;

  const theme = useTheme();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const refreshMessages = useCallback(async () => {
    if (!chatId) return;
    const data = await fetchChatMessages(chatId);
    setMessages(data);
  }, [chatId]);

  useEffect(() => {
    refreshMessages();
    const interval = setInterval(refreshMessages, 2000);
    return () => clearInterval(interval);
  }, [refreshMessages]);

  const handleNewMessage = (message: string) => {
    setNewMessage(message);
  };

  const sendMessage = useCallback(
    async () => {
      if (!chatId) return;
      const trimmed = newMessage.trim();
      if (!trimmed || isSending) return;

      setIsSending(true);
      try {
        await postChatMessages(chatId, trimmed);
        setNewMessage("");
        await refreshMessages();
      } finally {
        setIsSending(false);
      }
    },
    [chatId, newMessage, isSending, refreshMessages]
  );

  return (
    <View style={[styles.page, { backgroundColor: theme.background }]}>
      <View style={styles.chatLists}>
        <ChatList messages={messages} myUserId={pretendAuthUser.id} />
      </View>
      <View style={styles.chatForm}>
        <TextInput
          style={[
            styles.textInput,
            styles.chatInput,
            { color: theme.text, borderColor: theme.text, backgroundColor: theme.background },
          ]}
          placeholder="Say something!"
          placeholderTextColor={theme.mutedText}
          value={newMessage}
          onChangeText={handleNewMessage}
          onSubmitEditing={sendMessage}
          returnKeyType="send"
        />
        <View style={styles.sendButtonContainer}>
          <Button title="Send" onPress={sendMessage} disabled={isSending} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  text: {},
  textInput: {
    borderWidth: 1,
    height: 40,
    paddingHorizontal: 10,
    margin: 10,
    borderRadius: 5,
  },
  chatInput: {
    flex: 1,
  },
  chatLists: {
    flex: 1,
    flexDirection: "row",
  },
  chatForm: {
    flexDirection: "row",
    alignItems: "center",
  },
  sendButtonContainer: {
    width: "20%",
    paddingRight: 10,
  },
});

