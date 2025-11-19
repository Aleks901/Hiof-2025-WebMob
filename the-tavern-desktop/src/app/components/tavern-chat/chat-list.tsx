"use client"

import { ChatMessage } from "@packages/types/chat-message";
import ChatMessageCard from "./chat-message";
import { useRef, useEffect, useState } from "react";

type ChatListProps = {
  messages: ChatMessage[];
  myUserId: number;
};

export default function ChatList({ messages, myUserId }: ChatListProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const [isNearBottom, setIsNearBottom] = useState(true);
  const previousMessageCountRef = useRef(messages.length);

  const scrollToBottom = (smooth = true) => {
    if (listRef.current) {
      listRef.current.scrollTo({
        top: listRef.current.scrollHeight,
        behavior: smooth ? "smooth" : "auto",
      });
    }
  };

  const checkIfNearBottom = () => {
    if (listRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listRef.current;
      const isNear = scrollHeight - scrollTop - clientHeight < 100;
      setIsNearBottom(isNear);
    }
  };

  useEffect(() => {
    // Only auto-scroll if user is near bottom AND there are new messages
    const hasNewMessages = messages.length > previousMessageCountRef.current;
    if (hasNewMessages && isNearBottom) {
      scrollToBottom(true);
    }
    previousMessageCountRef.current = messages.length;
  }, [messages, isNearBottom]);

  useEffect(() => {
    scrollToBottom(false);
  }, []);

  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      flex: 1,
      overflowY: "auto",
      padding: "24px 0",
      display: "flex",
      flexDirection: "column",
      gap: "16px",
    },
    messageWrapper: {
      width: "100%",
      display: "flex",
      padding: "0 8px",
    },
    messageContent: {
      maxWidth: "65%",
      minWidth: "300px",
    },
  };

  return (
    <div ref={listRef} style={styles.container} onScroll={checkIfNearBottom}>
      {messages.map((item) => {
        const isMine =
          ((item as any).user?.id ?? (item as any).userId ?? (item as any).authorId) ===
          myUserId;
        return (
          <div
            key={item.id}
            style={{
              ...styles.messageWrapper,
              justifyContent: isMine ? "flex-end" : "flex-start",
            }}
          >
            <div style={styles.messageContent}>
              <ChatMessageCard message={item} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
