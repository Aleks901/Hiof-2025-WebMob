"use client"

import { useState, useEffect, useCallback } from "react";
import { useTheme } from "@packages/ui/ThemeProvider";
import { ChatMessage } from "@packages/types/chat-message";
import ChatList from "../components/tavern-chat/chat-list";
import { useUser } from "@packages/hooks/useUser";
import { User } from "@packages/types/user";
import { ProtectedRoute } from "../components/protected-route";

async function fetchChatMessages(chatId: string): Promise<ChatMessage[]> {
  const response = await fetch(`/api/v2/chats/${chatId}/messages`);
  const { data } = (await response.json()) as { data: ChatMessage[] };
  return data;
}

async function postChatMessages(chatId: string, message: string, user: User): Promise<ChatMessage | ChatMessage[]> {
  const response = await fetch(`/api/v2/chats/${chatId}/messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId: user.id, message }),
  });
  const result = await response.json() as any;
  return result.data;
}

export function ChatPage() {
  const { id } = useParams();
  const chatId = id;
  const { user } = useUser();

  const { theme } = useTheme();

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

  const handleNewMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  const sendMessage = useCallback(
    async (e?: React.FormEvent) => {
      e?.preventDefault();
      if (!chatId || !user) return;
      const trimmed = newMessage.trim();
      if (!trimmed || isSending) return;

      setIsSending(true);
      try {
        await postChatMessages(chatId, trimmed, user);
        setNewMessage("");
        await refreshMessages();
      } finally {
        setIsSending(false);
      }
    },
    [chatId, newMessage, isSending, refreshMessages, user]
  );

  if (!user) {
    return <ProtectedRoute><div style={{ padding: "20px", color: theme.text }}>Loading...</div></ProtectedRoute>;
  }

  const styles: { [key: string]: React.CSSProperties } = {
    page: {
      display: "flex",
      flexDirection: "column",
      height: "calc(100vh - 120px)",
      maxHeight: "850px",
      backgroundColor: theme.background,
      maxWidth: "1100px",
      margin: "40px auto",
      width: "calc(100% - 40px)",
      boxSizing: "border-box",
      border: `2px solid ${theme.highlight}`,
      borderRadius: "16px",
      overflow: "hidden",
      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)",
    },
    chatLists: {
      flex: 1,
      display: "flex",
      flexDirection: "row",
      overflow: "auto",
      padding: "16px",
      backgroundColor: theme.card,
      scrollbarWidth: "thin",
      scrollbarColor: `${theme.highlight} ${theme.card}`,
    },
    chatForm: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      padding: "16px",
      borderTop: `2px solid ${theme.highlight}`,
      backgroundColor: theme.card,
      gap: "12px",
    },
    textInput: {
      flex: 1,
      border: `2px solid ${theme.mutedText}`,
      height: 46,
      paddingLeft: 16,
      paddingRight: 16,
      borderRadius: 8,
      color: theme.text,
      backgroundColor: theme.background,
      fontSize: 15,
      outline: "none",
      transition: "all 0.2s ease",
    },
    sendButton: {
      minWidth: "110px",
      height: 46,
      backgroundColor: theme.highlight,
      color: theme.background,
      border: "none",
      borderRadius: 8,
      cursor: "pointer",
      fontWeight: "700",
      fontSize: 15,
      transition: "all 0.2s ease",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
    },
    sendButtonDisabled: {
      opacity: 0.5,
      cursor: "not-allowed",
    },
  };

  return (
      <div style={styles.page}>
        <div style={styles.chatLists}>
          <ChatList messages={messages} myUserId={user.id} />
        </div>
        <form style={styles.chatForm} onSubmit={sendMessage}>
          <input
            style={styles.textInput}
            placeholder="Say something!"
            value={newMessage}
            onChange={handleNewMessage}
            disabled={isSending}
            onFocus={(e) => e.currentTarget.style.borderColor = theme.highlight}
            onBlur={(e) => e.currentTarget.style.borderColor = theme.mutedText}
          />
          <button
            type="submit"
            style={{
              ...styles.sendButton,
              ...(isSending ? styles.sendButtonDisabled : {}),
            }}
            disabled={isSending}
            onMouseEnter={(e) => {
              if (!isSending) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.2)';
            }}
          >
            Send
          </button>
        </form>
      </div>
  );
}

function useParams(): { id: string | null } {
  if (typeof window !== 'undefined') {
    const path = window.location.pathname;
    const segments = path.split('/');
    const chatIndex = segments.indexOf('chat');
    
    if (chatIndex !== -1 && chatIndex + 1 < segments.length) {
      const id = segments[chatIndex + 1];
      return { id: id };
    }
  }
  
  return { id: null };
}
