"use client"

import { ChatMessage } from "@packages/types/chat-message";
import ChatMessageCard from "./chat-message";
import { useRef, useEffect, useState } from "react";
import '../../../styling/chat-list.css';

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
    const hasNewMessages = messages.length > previousMessageCountRef.current;
    if (hasNewMessages && isNearBottom) {
      scrollToBottom(true);
    }
    previousMessageCountRef.current = messages.length;
  }, [messages, isNearBottom]);

  useEffect(() => {
    scrollToBottom(false);
  }, []);

  return (
    <div ref={listRef} className="chat-list-container" onScroll={checkIfNearBottom}>
      {messages.map((item) => {
        const isMine =
          ((item as any).user?.id ?? (item as any).userId ?? (item as any).authorId) ===
          myUserId;
        return (
          <div
            key={item.id}
            className={`chat-list-message-wrapper ${isMine ? 'chat-list-message-mine' : 'chat-list-message-theirs'}`}
          >
            <div className="chat-list-message-content">
              <ChatMessageCard message={item} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
